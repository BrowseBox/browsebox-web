// This component will add a new user to the swl database using axios. This component will use the UserForm component.

import React, { useState, useEffect } from "react";
import axios from 'axios';

import CreateUserFormComponent from "./CreateUserForm.component";

// CreateUser Component for add new user

const CreateUserComponent = () => {

    const [formValues, setFormValues] = useState({ username: '', email: '', password: '', img: ''})

    // onSubmit handler
    const onSubmit = userObject => {
        //userObject.email = userObject.email.toLowerCase();
        // checks to see if admin and if not, sets role to 1
        //if (userObject.role === "Admin" || "admin") userObject.role = "0"; else userObject.role = "1";
        console.log("Button pressed");
        alert("Button pressed");
        axios.post(
            'http://localhost:3001/add-user',
            userObject)
            .then(res => {
                if (res.status === 200) {
                    alert('User successfully created');
                    console.log("Username "+res.data.username);
                    alert("This is working")

                    //go to login page
                   // window.location.href = "/login-user ";
                }
                else
                    Promise.reject()
            })
            .catch(err => alert('Something went wrong'))
    }

    // Return user form
    return(
        <div>
            <CreateUserFormComponent
                initialValues={formValues}
                onSubmit={onSubmit}
                enableReinitialize>
                Create User
            </CreateUserFormComponent>
        </div>
    )
}

export default CreateUserComponent;
