// LoginUser Component for login a user

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import LoginUserForm from "./LoginUserForm.component";




// LoginUser Component
const LoginUser = () => {

    const [formValues, setFormValues] =
        useState({  username: '', password: ''})


// Login a user

    const onSubmit = async(userObject) => {
        const response = await axios.post(
            'http://localhost:4000/users/login-user',  {"username":userObject.username , "password": userObject.password})

        const json = await response.data;

        if (response.status === 200) {
  //save username and imageLocation in local storage
            localStorage.setItem('username', json.username);
            localStorage.setItem('imageLocation', json.imageLocation);



            alert("User successfully logged in");
        }
        else
            Promise.reject();
    }

// Return user form
    return (
        <div>
            <h2>Login User</h2>

                <LoginUserForm
                    initialValues={formValues}
                    onSubmit={onSubmit}
                    enableReinitialize>
                    Login User
                </LoginUserForm>

        </div>
    )
}


// Export LoginUser Component
export default LoginUser
