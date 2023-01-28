import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage} from "formik";
import { FormGroup, FormControl, Button} from "react-bootstrap";



const CreateUserForm = (props) => {


    const validationSchema = Yup.object().shape({
        // fname: Yup.string().required("Required"),
        // lname: Yup.string().required("Required"),
        email: Yup.string()
            .email("You have enter an invalid email address")
            .required("Required"),
        password: Yup.string().required("Required"),
    });
    console.log(props);

    return (
        <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema}>
                <Form>
                    <FormGroup>
                        <p>User Name:</p>
                        <Field name="username" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="username"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>


                    <FormGroup>
                        <p>Email:</p>
                        <Field name="email" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="email"
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

                    <FormGroup>
                        <p>Image Location:</p>
                        <Field name="imageLocation" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="imageLocation"
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

export default CreateUserForm;
