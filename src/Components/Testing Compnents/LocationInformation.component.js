
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormGroup, FormControl } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
        root: {
            "& > *": {
                margin: theme.spacing(1),
                width: "25ch",
            },
        }
    })
);

const LocationInformation = (props) => {
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        postalCode: Yup.string().required("Required"),
        streetAddress: Yup.string().required("Required"),
    });

    return (
        <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema}>
                <Form>
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
}


