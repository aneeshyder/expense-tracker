import React from "react";
import "./../App.css";
import ExpenseMain from "./ExpenseMain";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import SignUpForm from "../components/SignUpForm";
import { useState, useEffect } from "react";
import LogIn from "../components/LogIn";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase.js";
import Cookies from "universal-cookie";
import ResetPassword from "../components/ResetPass";

function Home() {
  const auth = getAuth();
  const cookies = new Cookies();
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [tabs, setTabs] = useState(true);

  const updateTabsState = (event) => {
    if (event.target.id === "login") {
      setTabs(true);
    } else {
      setTabs(false);
    }
  };

  useEffect(() => {
    const userIDCookies = cookies.get("userID");
    const userEmailCookies = cookies.get("userEmail");
    if (userIDCookies) {
      user.uid = userIDCookies;
      user.email = userEmailCookies;
      setUser(user);
      setUserLoggedIn(true);
    }
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const register = async () => {
    const user = await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUserLoggedIn(true);
        cookies.set("userID", user.uid);
        cookies.set("userEmail", user.email);
        await setDoc(doc(db, "users", user.uid, "expenses", "testEpx"), {
          first: "something",
        });
        await setDoc(doc(db, "users", user.uid, "category", "testCat"), {
          cat_name: "misc",
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const logOut = async () => {
    cookies.remove("userID");
    cookies.remove("userEmail");
    setUserLoggedIn(false);
    setUser([]);
    await signOut(auth);    
  };

  return (
    <div className="App">
      {userLoggedIn && user ? (
        <div className="mainActivity">
          <header>
            <h4>{user.email}</h4>
            <button onClick={logOut}>signOut</button>
            <ResetPassword logOut userEmail={user.email} />
          </header>
          <ExpenseMain userId={user.uid} />
        </div>
      ) : (
        <div className="startActivity">
          <h2>Expense Tracker</h2>
          <div className="activityWrapper">
            <div className="activityButtons">
              <button
                id="login"
                className={tabs === true ? "active" : ""}
                onClick={(event) => {
                  updateTabsState(event);
                }}
              >
                Login
              </button>
              <button
                id="signup"
                className={tabs === false ? "active" : ""}
                onClick={(event) => {
                  updateTabsState(event);
                }}
              >
                Signup
              </button>
            </div>
            {tabs ? (
              <LogIn userState={setUserLoggedIn} />
            ) : (
              <SignUpForm
                createUser={register}
                email={setEmail}
                password={setPassword}
              />
            )}
          </div>
        </div>
      )}
    </div> //  <div className="App">
  );
}

export default Home;
