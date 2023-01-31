// CreateUser Component for add new user

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import CreateUserForm from "./CreateUserForm.component";

// CreateUser Component

const CreateUser = (props) => {

    const [formValues, setFormValues] =
        useState({ username: '', email: '', password: '', imageLocation: '' })
// onSubmit handler
    const onSubmit = userObject => {
        userObject.email = userObject.email.toLowerCase();

        axios.post(
            'http://localhost:4000/users/create-user',
            userObject)
            .then(res => {
                if (res.status === 200) {
                    alert('User successfully created');

                }
                else
                    Promise.reject()
            })
            .catch(err => alert('Something went wrong'))

    }

// Return user form
    return(
        <div>
            <h2>Create User</h2>

                <CreateUserForm
                    initialValues={formValues}
                    onSubmit={onSubmit}
                    enableReinitialize>
                    Create User
                </CreateUserForm>
        </div>
    )
}

// Export CreateUser Component
export default CreateUser
