import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, {  useState, useEffect } from 'react';

// LoginSuccessful is a function sent in by parent component
function LoginForm({LoginEvent}) {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
    };

// Initialize Firebase
    initializeApp(firebaseConfig);

    const [loggedUser, setLoggedUser] = useState('');

    // function to sign in with Google's page
    const signInWithGoogle = () => {

        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // User signed in
                console.log(result.user);
                setLoggedUser(result.user)

            }).catch((error) => {
            // Handle Errors here.
            console.error(error);
        });
    };

    // function to sign out
    function logoutGoogle () {
        const auth=getAuth();
        auth.signOut();
        setLoggedUser(null)
    }

    // we put the onAuthStateChanged in useEffect so this is only called when
    // this component mounts
    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                console.log("User is signed in:", user);


                setLoggedUser(user);

            } else {
                // No user is signed in.
                console.log("No user is signed in.");
            }
            LoginEvent(user);
        });
    }, []);
    // note the ? to show either login or logout button
    return (
        <div className={"sign-in-footer"} >
            { loggedUser?
                <><p>user: {loggedUser.uid}</p> <button onClick={logoutGoogle}>Log out</button> </>
                :<button onClick={signInWithGoogle}>Sign in with Google</button>
            }

        </div>
    );

}
export default LoginForm;
