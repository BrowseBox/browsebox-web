import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
    Box,
    Button,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import styled from 'styled-components';
import PictureBox from './PictureBox';

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    padding: 16px;
  }
`;

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    category: Yup.string().required('Category is required'),
});

const EditItemModal = ({ trigger, onClose, id }) => {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState(['']);
    // Added this to store the name to Id mapping
    const [catNameToIdMap, setCatNameToIdMap] = useState({});
    const [formValuesLoaded, setFormValuesLoaded] = useState(false);
    let imageHasChanged = false;
    const [selectedFile, setSelectedFile] = useState(null);
    const [Ad, setAd] = useState({});
    const [initialValues, setInitialValues] = useState({
        id: '',
        title: '',
        description: '',
        image: '',
        price: '',
        category: '',
        // catName: '',
        catId: '',
    });

    const handleImageChange = (imageFile) => {
        if (imageFile) {
            setSelectedFile(imageFile);

            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(imageFile);
        } else {
            setImage(null);
            setSelectedFile(null);
        }
    };

    const updateImageInMainDatabase = (sale_id, imageUrl) => {
        axios.post('http://localhost:3001/update-sale', { id: sale_id, img: imageUrl })
            .then((res) => {

                console.log(res);
            })
    }

    const { handleSubmit, handleChange, values, errors, resetForm, setValues } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            axios.post('http://localhost:3001/update-sale', {id: values.id, saleName: values.title, description: values.description, price: values.price, catId: catNameToIdMap[values.category]})
                .then((res) => {

                    // if (imageHasChanged) {
                        const formData = new FormData();
                        formData.append('id', values.id);
                        formData.append('index', 1);
                        formData.append('image', selectedFile);
                        axios.post('http://52.13.116.107:7355/api/image/update/listing', formData)
                            .then((res) => {
                                // updateImageInMainDatabase(values.id, res.data.imageUrl);
                                console.log(res);
                                console.log(res.data);
                                alert('Image updated successfully');
                            })
                            // }
                    // close modal
                    onClose();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    });

    useEffect(() => {
        setOpen(trigger);
    }, [trigger]);

    // useEffect(() => {
    //     axios
    //         .post('http://localhost:3001/get-filters')
    //         .then((res) => {
    //             setCategory(['', ...res.data.map(({ cat_name }) => cat_name)]);
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

    useEffect(() => {
        if (open && !formValuesLoaded) {
        axios.post('http://localhost:3001/sale', { id: id })
            .then((res) => {
                setAd(res.data[0]);
                // alert ("original id:"+id + " res.data.id:"+res.data[8].id);
                // console.log(res.data[0]);
                // console.log(Ad.sale_name);


                setInitialValues({
                    id: res.data[0].sale_id,
                    title: res.data[0].sale_name,
                    description: res.data[0].sale_description,
                    image: res.data[0].sale_image,
                    price: res.data[0].sale_price,
                    category: res.data[0].cat_name,
                });

                // console.log(res.data[0].sale_image);
                setImage(res.data[0].sale_image);
                console.log(res.data[0].sale_image);

            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [open, id, formValuesLoaded]);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues, setValues]);

    const categoryList = category.map((cat_name) => (
        <MenuItem key={cat_name} value={cat_name}>
            {cat_name}
        </MenuItem>
    ));



        return (
            <StyledDialog open={open} onClose={onClose}>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{marginBottom: 2}}>
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

                        <Box sx={{marginBottom: 2}}>
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
                            <Box sx={{marginLeft: 2}}>
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
                            sx={{marginBottom: 2}}
                        />

                        <Typography variant="h6" sx={{padding: 2}}>
                            Uploads some pics to get your item noticed!
                        </Typography>

                        <PictureBox
                            initialImage={image}
                            onImageChange={handleImageChange}

                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                        id="update-item-btn"
                        sx={{marginRight: 2}}
                    >
                        Update Item
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onClose}
                        id="cancel-btn"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </StyledDialog>
        );

};

export default EditItemModal;
