import React, { Component, useEffect, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PictureBox2 from './PictureBox2';
import PictureBox from './PictureBox';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    condition: Yup.string().required('Condition is required'),
    description: Yup.string().required('Description is required'),
    postalCode: Yup.string().required('Postal code is required'),
    price: Yup.number().required('Price is required'),
    email: Yup.string().required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
});

const CreateAd2 = () => {
    const style = {
        display: 'flex',
        justifyContent: 'center',
    };

    const [image, setImage] = useState(null);

    const handleImageChange = (image) => {
        setImage(image);
    };

    const [category, setCategory] = useState(['']);
    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            title: '',
            condition: '',
            description: '',
            imageLocation: '',
            postalCode: '',
            price: '',
            email: '',
            phone: '',
            category: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            axios
                .post('http://localhost:3001/add-item', values)
                .then((res) => {
                    if (res.status === 200) {
                        alert('Item successfully created');
                        resetForm();
                    } else Promise.reject();
                })
                .catch((err) => alert('Something went wrong'));
        },
    });

    useEffect(() => {
        axios
            .post('http://localhost:3001/get-filters')
            .then((res) => {
                console.log(res.data);

                setCategory(['', ...res.data.map(({ cat_name }) => cat_name)]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const categoryList = category.map((cat_name) => {
        return (
            <MenuItem key={cat_name} value={cat_name}>
                {cat_name}
            </MenuItem>
        );
    });

    return (
        <div>
            <Typography variant="h4" style={style}>
                Sell Something
            </Typography>
            <form
                onSubmit={handleSubmit}
                aria-label="create-ad-form"
                id="create-ad-form"
            >
                <div style={{ display: 'flex' }}>
                    <TextField
                        fullWidth
                        label="What are you selling?"
                        margin="normal"
                        name="title"
                        onChange={handleChange}
                        value={values.title}
                        variant="outlined"
                        style={{ flexBasis: '75%', marginRight: '1rem' }}
                        error={Boolean(errors.title)}

                    />
                    <div style={{ flexBasis: '25%' }}>
                        <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel id="condition-label">Condition</InputLabel>
                            <Select
                                labelId="condition-label"
                                label="Condition"
                                name="condition"
                                onChange={handleChange}
                                value={values.condition}
                                variant="outlined"
                                error={Boolean(errors.condition)}

                            >
                                <MenuItem value="new">New</MenuItem>
                                <MenuItem value="used">Used</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div style={{ display: 'flex' }}>
                    <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel id="category-label">Item Category</InputLabel>
                        <Select
                            labelId="category-label"
                            label="Item Category"
                            name="category"
                            onChange={handleChange}
                            value={values.category}
                            variant="outlined"
                            style={{ flexBasis: '75%', marginRight: '1rem' }}
                            error={Boolean(errors.category)}

                        >
                            {categoryList}
                        </Select>
                    </FormControl>
                    <div style={{ flexBasis: '25%' }}>
                        <TextField
                            fullWidth
                            label="Selling Price"
                            margin="normal"
                            name="price"
                            onChange={handleChange}
                            value={values.price}
                            variant="outlined"
                            error={Boolean(errors.price)}

                        />
                    </div>
                </div>

                <TextField
                    fullWidth
                    label="Description"
                    margin="normal"
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                    variant="outlined"
                    multiline
                    rows={2}
                    error={Boolean(errors.description)}

                />

                <Typography variant="h6" style={style} sx={{ padding: 2 }}>
                    Uploads some pics to get your item noticed!
                </Typography>

                {/*<PictureBox setImage={setImage}*/}
                {/*image={image}*/}
                <PictureBox onImageChange={handleImageChange} />


                />


                <div style={{ display: 'flex' }}>
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        variant="outlined"
                        style={{ flexBasis: '40%', marginRight: '1rem' }}
                        error={Boolean(errors.email)}

                    />
                    <TextField
                        fullWidth
                        label="Postal Code"
                        margin="normal"
                        name="postalCode"
                        onChange={handleChange}
                        value={values.postalCode}
                        variant="outlined"
                        style={{ flexBasis: '30%', marginRight: '1rem' }}
                        error={Boolean(errors.postalCode)}

                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        margin="normal"
                        name="phone"
                        onChange={handleChange}
                        value={values.phone}
                        variant="outlined"
                        style={{ flexBasis: '30%', marginRight: '1rem' }}
                        error={Boolean(errors.phone)}

                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    id="create-ad-btn"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default CreateAd2;
