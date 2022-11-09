import React from 'react';
import './../App.css';
import ExpenseMain from './ExpenseMain';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut  } from "firebase/auth";
import SignUpForm from '../components/SignUpForm';
import { useState, useEffect } from 'react'; 
import LogIn from '../components/LogIn';

function Home() {
  const auth = getAuth();

    
    const logout = () => {
      signOut(auth);
    };

  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState({});

 
onAuthStateChanged(auth, (currentUser) => {
 setUser(currentUser) 
});

const register = async () => {
  const user = await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

const logOut = async () => {
  await signOut(auth)
}


  
  return (
    <div className="App">


      { user ? (
        <>
          <h4>{user.email }</h4>
         <button onClick={logOut}>signOut</button>
         
          <ExpenseMain userId={user.uid} /> 
        </>
      ) : (
        <>
          <LogIn />
          <SignUpForm createUser={register} email={setEmail} password={setPassword} />  
        </>
      )
        
      }
    
       
      
         
    </div> //  <div className="App">
  );
}

export default Home;
