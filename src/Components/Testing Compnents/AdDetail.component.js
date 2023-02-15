
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

const AdDetail = (props) => {
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        condition: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
    });

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
