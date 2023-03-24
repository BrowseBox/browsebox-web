

import React, {Component, useState} from 'react';
import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel  } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import PictureBox2 from "./PictureBox2";
import PictureBox from "./PictureBox";

//import React from 'react'
import axios from 'axios'



const CreateAd2 = () => {

    const category = ['option1', 'option2', 'option3'];
   // load item categories from database
    axios.post('http://localhost:3001/get-filters')
    .then((res) => {
        console.log(res.data)
        const category = res.data;
    })
    .catch((err) => {
        console.log(err)
    })


    // form validation
    const validationSchema = Yup.object().shape({
        // form validation stuff here
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            condition: '',
            description: '',
            imageLocation: '',
            postalCode: '',
            price: '',
            email: '',
            phone: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {

            // axios
            //     .post('http://localhost:3001/add-item', values)
            //     .then((res) => {
            //         if (res.status === 200) {
            //             alert('User successfully created')
            //         } else Promise.reject()
            //     })
            //     .catch((err) => alert('Something went wrong'))
        },
    })


    return (
        <div>
            <Typography variant="h4" style={style}>Sell Something</Typography>
            <form>
                <div style={{ display: "flex" }}>
                    <TextField
                        fullWidth
                        label="What are you selling?"
                        margin="normal"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        variant="outlined"
                        style={{ flexBasis: "75%", marginRight: "1rem" }}
                    />
                    <div style={{ flexBasis: "25%" }}>
                        <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel id="condition-label">Condition</InputLabel>
                            <Select
                                labelId="condition-label"
                                label="Condition"
                                // margin="normal"
                                name="condition"
                                onChange={formik.handleChange}
                                value={formik.values.condition}
                                variant="outlined"
                            >
                                <MenuItem value="new">New</MenuItem>
                                <MenuItem value="used">Used</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div style={{ display: "flex" }}>
                <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel id="category-label">Item Category</InputLabel>
                    <Select
                        labelId="category-label"
                        label="Item Category"
                        // margin="normal"
                        name="category"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                        variant="outlined"
                        style={{ flexBasis: "75%", marginRight: "1rem" }}
                    >
                        {category.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div style={{ flexBasis: "25%" }}>
                <TextField
                    fullWidth
                    label="Selling Price"
                    margin="normal"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    variant="outlined"
                />
                </div>
                </div>

                <TextField
                    fullWidth
                    label="Description"
                    margin="normal"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    variant="outlined"
                    multiline
                    rows={2}
                />

                <Typography variant="h6" style={style} sx={{padding:2}}>Uploads some pics to get your item noticed!</Typography>
                <PictureBox />

                <div style={{ display: "flex" }}>
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        variant="outlined"
                        style={{ flexBasis: "40%", marginRight: "1rem" }}
                    />
                    <TextField
                        fullWidth
                        label="Postal Code"
                        margin="normal"
                        name="postalCode"
                        onChange={formik.handleChange}
                        value={formik.values.postalCode}
                        variant="outlined"
                        style={{ flexBasis: "30%", marginRight: "1rem" }}
                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        margin="normal"
                        name="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        variant="outlined"
                        style={{ flexBasis: "30%", marginRight: "1rem" }}
                    />

                </div>
                <Button variant="contained" color="primary" onClick={formik.handleSubmit}>Submit</Button>

            </form>

        </div>

    )
}


const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default CreateAd2;
