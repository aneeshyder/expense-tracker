import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

function LogIn(props) {
  const auth = getAuth();
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

  const login = async () => {
    const user = await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in 
	  props.userState(true);
    })
    .catch((error) => {      
      const errorMessage = error.message;      
	  alert(errorMessage);
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

export default LogIn;