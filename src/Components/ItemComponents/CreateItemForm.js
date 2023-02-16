import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage} from "formik";
import { FormGroup, FormControl, Button} from "react-bootstrap";



const CreateItemForm = (props) => {


    const validationSchema = Yup.object().shape({

    });
    console.log(props);

    return (
        <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema}>
                <Form>

                    <FormGroup>
                        <p>Title:</p>
                        <Field name="title" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="title"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>

                    <FormGroup>
                        <p>Condition:</p>
                        <Field name="condition" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="condition"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>

                    <FormGroup>
                        <p>Description:</p>
                        <Field name="description" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="description"
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

                    <FormGroup>
                        <p>Postal Code:</p>
                        <Field name="postalCode" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="postalCode"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>

                    <FormGroup>
                        <p>Street Address:</p>
                        <Field name="streetAddress" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="streetAddress"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>

                    <FormGroup>
                        <p>Price:</p>
                        <Field name="price" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="price"
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
                        <p>Phone:</p>
                        <Field name="phone" type="text"
                               className="form-control" />
                        <ErrorMessage
                            name="phone"
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

export default CreateItemForm;
