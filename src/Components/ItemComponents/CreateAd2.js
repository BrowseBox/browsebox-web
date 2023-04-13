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
import background from '../../Media/fabric.jpg';




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
    // const placeholderImage = 'https://via.placeholder.com/150';

    const handleImageChange = (image) => {
        setImage(image);
    };

    const sendImage = (listingid) => {
        const formData = new FormData();
        // formData.append('type', 'listing');
        formData.append('id', randomId());
        formData.append('image', image);
        formData.append('index', 1)
        // alert (listingingid.values.salesId+" "+FormData.id);
        //alert(listingingid + " " + formData.get("id"));
        axios
            // .post('http://52.13.116.107:7355/api/image/upload ', formData)
            .post('http://52.13.116.107:7355/api/image/upload/listing', formData)
            .then((res) => {
                if (res.status === 200) {
                    // alert("in AWS")
                    // console.log(res.data.imageUrl);
                    // setImage(res.data.imageUrl);
                    // console.log("Sending image 2"+listingid+" "+" "+image+" "+res.data.imageUrl);
                    // alert("Sending image 2"+listingid+" "+res.data.imgUrl);
                    console.log("Picture sent to local database")
                    updateImageInMainDatabase(listingid, res.data.imageUrl);
                }
            })
            .catch((err) => console.log(err));
    }

    const updateImageInMainDatabase = (sale_id, imageUrl) => {
        console.log("Sending image 3 " + sale_id + " " + " " + image + " " + imageUrl);
        axios.post('http://localhost:3001/update-sale', { id: sale_id, img: imageUrl })
            .then((res) => {

                console.log(res);
            })
    }

    // 5 digit number genorator
    const randomId = () => {
        return Math.floor(10000 + Math.random() * 90000);
    }

    // This is when it is changed or better yet just before it is submitted
    // const handleCategoryChange = (selectedCatName) => {
    // const selectedCatId = catNameToIdMap[selectedCatName];
    // console.log('Selected cat_name:', selectedCatName, 'cat_id:', selectedCatId);
    // // Perform any action you want with the selected cat_id
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
            // values.image = image;
            // values.id = 1;
            // get id from local storage
            values.id = localStorage.getItem('id');

            // values.image = 'test';
            // values.filter_ids = category;
            // values.catId = category;
            // values.catId = category.indexOf(values.category);
            //get the cat_id from the category array
            // handleCategoryChange(values.category)
            values.catId = catNameToIdMap[values.category];

            // if (image == null) {
            // setImage(placeholderImage);
            // }
            // console.log(values);
            // sendImage(values.sale_id, image);
            // values.image = image;

            axios
                .post('http://localhost:3001/add-sale', values)
                .then((res) => {
                    if (res.status === 200) {
                        // console.log (res.data[0].sale_id);
                        //
                        if (image != null) {
                            sendImage(res.data.sale_id);

                        }
                        // The following 2 lines were commented out
                        // updateImageInMainDatabase(res.data[0].sale_id);
                        values.image = image;




                        resetForm();
                        setImage(null);
                        // go to home page
                        window.location.href = '/';

                    } else Promise.reject();
                })
                // .catch((err) => alert(`Something went wrong: ${err.message}`));
                .catch((err) => console.log(err));
        },
    });

    // useEffect(() => {
    // axios
    // .post('http://localhost:3001/get-filters')
    // .then((res) => {
    // console.log(res.data);
    // //setCategory(['', ...res.data.map(({ cat_name }) => cat_name)]);
    // // make a map of cat_name to cat_id
    // setCategory(['', ...res.data.map(({ cat_name, cat_id }) => cat_name)]);
    //
    // })
    // .catch((err) => {
    // console.log(err);
    // });
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

    const handleCancelClick = () => {
        window.location.href = '/';
    };

    return (
        <div id="MainBody">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '90vh',
                    padding: 2,

                    width: '100vw',

                    backgroundColor: '#b7ac9a',
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',



                }}
            >
                <div style={{
                    backgroundColor: '#f7f2e5', width: '50%', height: '80%', borderRadius: '20px', alignItems: 'center', margin: 'auto',
                    // content: '', position: 'absalute', left: '10px', bottom: '-20px', zIndex: '-1', boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.1)'
                    boxShadow: '12px 12px 16px 0 rgba(0, 0, 0, 0.2), -12px -12px 16px 0 rgba(255, 255, 255, .1), opacity: 0.5'
                }}>
                    <div style={{ margin: 'auto', width: '80%', padding: 30, height: '80%' }}>
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
                            {/* <TextField*/}
                            {/* fullWidth*/}
                            {/* label="Email"*/}
                            {/* margin="normal"*/}
                            {/* name="email"*/}
                            {/* onChange={handleChange}*/}
                            {/* value={values.email}*/}
                            {/* variant="outlined"*/}
                            {/* error={Boolean(errors.email)}*/}
                            {/* />*/}
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
                                type="reset"
                                id="create-bk-btn"
                                sx={{ marginTop: 2 }}
                                onClick={handleCancelClick}
                            >
                                Cancel
                            </Button>
                        </form>
                    </div>
                </div>
            </Box>
        </div>
    );
};

export default CreateAd2;