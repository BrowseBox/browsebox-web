import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal, Button, Typography, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import axios from "axios";

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 5px;
    width: 500px;
    max-width: 100%;
`;

const Congratulations = ({ trigger, onClose, id }) => {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(() => {
        setOpen(trigger);
    }, [trigger]);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
        setOpen(false);
    };

    const handleChange = (event) => setSelectedOption(event.target.value);

    const handleRemoveItem = () => {
        //remove item with axios
        //alert ("removing item" + id)

        axios.post(`http://localhost:3001/delete-sale`, { id: id })
            .then(res => {
                // console.log(res);
                // console.log(res.data);

                if (image !== "") {
                    const formData = new FormData();
                    formData.append('id', id);
                    formData.append('index', 1);

                    axios.post(`http://52.13.116.107:7355/api/image/delete/listing`, formData)
                        .then(res => {
                            // console.log(res);
                            // console.log(res.data);
                            // alert('Image deleted successfully');
                        })
                }

               // alert({id} + " has been deleted");
            })

        handleClose();
    };

    return (
        <StyledModal open={open} onClose={handleClose}>
            <ModalContent>
                <Typography variant="h5" gutterBottom>
                    Congratulations on the sale!
                </Typography>
                <RadioGroup value={selectedOption} onChange={handleChange}>
                    <FormControlLabel
                        value="here"
                        control={<Radio />}
                        label="Sold the item here"
                    />
                    <FormControlLabel
                        value="elsewhere"
                        control={<Radio />}
                        label="Sold the item elsewhere"
                    />
                    <FormControlLabel
                        value="no_comment"
                        control={<Radio />}
                        label="No comment"
                    />
                </RadioGroup>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleRemoveItem}
                    style={{ marginRight: '1rem' }}
                >
                    Remove Item
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                    Cancel
                </Button>
            </ModalContent>
        </StyledModal>
    );
};

export default Congratulations;
