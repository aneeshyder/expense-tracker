import Home from "../pages/Home";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';

import { useState } from "react";
import {db} from '../firebase.js';

function SignUpForm(props) {
    const auth = getAuth();


  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

  const login = async () => {
    const user = await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;

      const usersCollectionRef = collection(db, user.uid)

        
      const document = await addDoc(usersCollectionRef,  {name: 'name'} );
  
      const newCollectionRef = collection(db, user.uid, document.id, 'name of new subcollection')
  
      await addDoc(newCollectionRef, {
          data: 'Hello World!',
      })

      console.log(user.uid);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`${errorCode} ${errorMessage}`);
    });
  }

    return (
        <div className="login-form">
           
            <input type="text"  autoComplete="on" placeholder='email' onChange={(event) => {
                setEmail(event.target.value)
            }} />
            <input type="number" placeholder='password'onChange={(event) => {
                setPassword(event.target.value)
            }} />

            <button onClick={login}>Log In</button>
        </div>
    )
}

export default SignUpForm;