
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

const MediaInformation = (props) => {
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        photolocation: Yup.string().required("Required"),
        youtubeurl: Yup.string().required("Required"),

    })

    return (
        <div className="form-wrapper">
            <Formik {...props} validationSchema={validationSchema}>
                <Form>
                    <FormGroup>
                        <p>Photo Location:</p>
                        <Field name="photolocation" type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="photolocation"
                            className="d-block invalid-feedback"
                            component="span"
                        />
                    </FormGroup>

                    <FormGroup>
                        <p>Youtube Video Url:</p>
                        <Field name="youtubeurl" type="text"
                            className="form-control" />
                        <ErrorMessage
                            name="youtubeurl"
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
