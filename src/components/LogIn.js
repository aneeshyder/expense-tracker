import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Cookies from "universal-cookie";
function LogIn(props) {
  const auth = getAuth();
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const cookies = new Cookies();

  const login = async () => {
    const user = await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        props.userState(true);
        cookies.set("userID", user.uid);
        cookies.set("userEmail", user.email);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="login-form form">
      <input
        type="text"
        autoComplete="on"
        placeholder="email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}>Log In</button>
    </div>
  );
}

export default LogIn;
