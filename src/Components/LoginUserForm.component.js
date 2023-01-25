// This will create a component for the User Form. The form will use Material ui for the styling.
// The for will use Formik for the validation. The form will use Yup for the validation schema.
// The form ill have Field for UserName, Password, Email, and Role. The form will have a submit button.

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

const LoginUserFormComponent = (props) => {
    //const classes = useStyles();


    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),

        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),

    });


    console.log(props);


    return (
        <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema} >
                <Form>
                    <FormGroup>
                        <p>First Name:</p>
                        <Field name="fname" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="fname"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>


                    <FormGroup>
                        <p>Password:</p>
                        <Field name="password" type="password"
                               className="form-control" />
                        <ErrorMessage
                            name="password"
                            className="d-block invalid"
                            component="span"
                        />
                    </FormGroup>
                </Form>
            </Formik>
        </div>
    );
};

export default LoginUserFormComponent;
