import React from 'react';
import './../App.css';
import ExpenseMain from './ExpenseMain';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut  } from "firebase/auth";
import SignUpForm from '../components/SignUpForm';
import { useState, useEffect } from 'react'; 
import LogIn from '../components/LogIn';
import { setDoc, doc } from 'firebase/firestore';
import {db} from '../firebase.js';
function Home() {
  const auth = getAuth();
  
    const logout = () => {
      signOut(auth);
    };

  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [tabs, setTabs] = useState(true);

const updateTabsState = (event) => {
	if ( event.target.id === 'login'){
		setTabs(true);
	} else {
		setTabs(false);
	}
};

useEffect(() => {
	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser) 
	});
},[]);
 
const register = async () => {
  const user = await createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setUserLoggedIn(true);
	console.log('from register');
	console.log(user.uid);

	await setDoc(doc( db, "users", user.uid, 'expenses', 'testEpx' ), {first: 'something'});

	await setDoc(doc( db, "users", user.uid, 'category', 'testCat' ), {cat_name: 'misc'});
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
  setUserLoggedIn(false);
}
  
  return (
    <div className="App">


      { userLoggedIn ? (
        <div className="mainActivity">
		<header>
			<h4>{user.email }</h4>
        	<button onClick={logOut}>signOut</button>
		</header>         
		<ExpenseMain userId={user.uid} /> 
        </div>
      ) : (
        <div className="startActivity">
			<h2>Expense Tracker</h2>
			<div className="activityWrapper">
				<div className="activityButtons">
					<button id="login" className={tabs === true ? 'active' : ''}  onClick={(event) => {
							updateTabsState(event)
						}}>Login</button>
					<button id="signup" className={tabs === false ? 'active' : ''} onClick={(event) => {
							updateTabsState(event)
						}}>Signup</button>
				</div>					
				{
					tabs ? (
						<LogIn userState={setUserLoggedIn} />
					) : (
						<SignUpForm createUser={register} email={setEmail} password={setPassword} />  
					)
				}
			</div>          
        </div>
      )
        
      }
    
       
      
         
    </div> //  <div className="App">
  );
}

export default Home;
