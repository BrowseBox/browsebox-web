import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";


const LoginUserForm = (props) => {
    const validationSchema = Yup.object().shape({

     // I'll fix this later

    });
    console.log(props);
    return (
        <div className="form-wrapper">



            <Formik {...props} validationSchema={validationSchema}>
                <Form>

                    <FormGroup>
                        <p>Email:</p>
                        <Field name="username" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="username"
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
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>

                    <div className="text-center">
                        <Button variant="danger" size="lg"
                                block="block" type="submit">
                            {props.children}
                        </Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default LoginUserForm;
