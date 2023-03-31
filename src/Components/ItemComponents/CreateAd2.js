import React, { useEffect, useState } from 'react';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import PictureBox from './PictureBox';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    category: Yup.string().required('Category is required'),
});

const CreateAd2 = () => {
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState(['']);

    // Added this to store the name to Id mapping
    const [catNameToIdMap, setCatNameToIdMap] = useState({});


    const handleImageChange = (image) => {
        setImage(image);
    };

    // This is when it is changed or better yet just before it is submitted
    // const handleCategoryChange = (selectedCatName) => {
    //     const selectedCatId = catNameToIdMap[selectedCatName];
    //     console.log('Selected cat_name:', selectedCatName, 'cat_id:', selectedCatId);
    //     // Perform any action you want with the selected cat_id
    // };



    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            id: '',
            title: '',
            description: '',
            image: '',
            price: '',
            // filter_ids: '',
            category: '',
            catId: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            // This is where I would add the image to the values object
            // As well the user id is hard set when it should be soft
            //values.image = image;
            values.id = 1;
            values.image = 'test';
            // values.filter_ids = category;
            // values.catId = category;
            //     values.catId  = category.indexOf(values.category);
            //get the cat_id from the category array
            // handleCategoryChange(values.category)
            values.catId = catNameToIdMap[values.category];


            alert("submitting");
            axios
                .post('http://localhost:3001/add-sale', values)
                .then((res) => {
                    if (res.status === 200) {
                        alert('Item successfully created');
                        resetForm();
                        setImage(null);
                    } else Promise.reject();
                })
                .catch((err) => alert('Something went wrong'));
        },
    });

    // useEffect(() => {
    //     axios
    //         .post('http://localhost:3001/get-filters')
    //         .then((res) => {
    //             console.log(res.data);
    //             //setCategory(['', ...res.data.map(({ cat_name }) => cat_name)]);
    //             // make a map of cat_name to cat_id
    //             setCategory(['', ...res.data.map(({ cat_name, cat_id }) => cat_name)]);
    //
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    useEffect(() => {
        axios
            .post('http://localhost:3001/get-filters')
            .then((res) => {
                // console.log(res.data);
                const nameToIdMap = res.data.reduce((acc, { cat_name, cat_id }) => {
                    acc[cat_name] = cat_id;
                    return acc;
                }, {});
                setCatNameToIdMap(nameToIdMap);
                setCategory(['', ...res.data.map(({ cat_name }) => cat_name)]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const categoryList = category.map((cat_name) => (
        <MenuItem key={cat_name} value={cat_name}>
            {cat_name}
        </MenuItem>
    ));

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: 2,
            }}
        >
            <Typography variant="h4">Sell Something</Typography>
            <form
                onSubmit={handleSubmit}
                aria-label="create-ad-form"
                id="create-ad-form"
            >
                <Box sx={{ display: 'flex', width: '100%', marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label="What are you selling?"
                        margin="normal"
                        name="title"
                        onChange={handleChange}
                        value={values.title}
                        variant="outlined"
                        error={Boolean(errors.title)}
                    />
                </Box>

                <Box sx={{ display: 'flex', width: '100%', marginBottom: 2 }}>
                    <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel id="category-label">Item Category</InputLabel>
                        <Select
                            labelId="category-label"
                            label="Item Category"
                            name="category"
                            onChange={handleChange}
                            value={values.category}
                            variant="outlined"
                            error={Boolean(errors.category)}
                        >
                            {categoryList}
                        </Select>
                    </FormControl>
                    <Box sx={{ marginLeft: 2 }}>
                        <TextField
                            fullWidth
                            label="Selling Price"
                            margin="normal"
                            name="price"
                            onChange={handleChange}
                            value={values.price}
                            variant="outlined"
                            error={Boolean(errors

                                .price)}
                        />
                    </Box>
                </Box>


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
                    sx={{ marginBottom: 2 }}
                />

                <Typography variant="h6" sx={{ padding: 2 }}>
                    Uploads some pics to get your item noticed!
                </Typography>

                <PictureBox onImageChange={handleImageChange} />

                {/*<Box sx={{ display: 'flex', width: '100%', marginBottom: 2 }}>*/}
                {/*    <TextField*/}
                {/*        fullWidth*/}
                {/*        label="Email"*/}
                {/*        margin="normal"*/}
                {/*        name="email"*/}
                {/*        onChange={handleChange}*/}
                {/*        value={values.email}*/}
                {/*        variant="outlined"*/}
                {/*        error={Boolean(errors.email)}*/}
                {/*    />*/}
                {/*</Box>*/}
                <Button
                    // onSubmit={handleSubmit}
                    variant="contained"
                    color="primary"
                    type="submit"
                    id="create-ad-btn"
                    sx={{ marginTop: 2, marginRight: 2 }}
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    id="create-bk-btn"
                    sx={{ marginTop: 2 }}
                >
                    Cancel
                </Button>
            </form>
        </Box>
    );
};

export default CreateAd2;
