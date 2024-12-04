import React, { useState } from 'react';
import LoginForm from './LoginForm'

export default function LoginFormFile() {
    // user is the currently logged in user
    const [user, setUser] = useState(null);
// title is just a sample value entered in form
    const [title, setTitle] = useState('');

// when the user submits form...don't really do anything in this sample
    async function handleSubmit(event) {
        event.preventDefault();

        // do whatever on submit
        console.log("submitted")
    };

// this will be called by the LoginForm
    function HandleLogin(user) {
        setUser(user);
    }

// We have a subcomponent LoginForm and we pass it the function to call when login happens
    return (
        <div >
            <LoginForm LoginEvent={HandleLogin} />
        </div>
    );
}

