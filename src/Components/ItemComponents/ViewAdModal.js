import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import { Typography, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import axios from "axios";
import ChatIcon from '@mui/icons-material/Chat';
import No_image_available from '../../Media/No_Image_Available.jpg';

const Container = styled(DialogContent)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Category = styled(Typography)`
    margin-bottom: 1rem;
`;

const Image = styled.img`
    max-width: 80%;
    height: auto;
    margin-bottom: 1rem;
`;

const Details = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
`;

const ChatButton = styled(IconButton)`
    margin-top: 1rem;
`;

const ViewAd = ({ trigger, onClose, id }) => {
    const [ad, setAd] = useState(null);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        setOpen(trigger);
    }, [trigger]);

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
        axios
            .post(`http://localhost:3001/sale`, { id: id })
            .then((res) => {
                setAd(res.data[0]);
                console.log(res.data[0]);

            })
            .catch((err) => {
                console.log(err);
            });
    }
    }, [open, id]);

    const openChat = () => {
        // Open chatbox and send a message to the creator of the ad
    };

    if (!ad) {
        return <div></div>;
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography variant="h4" component="div" align="center">
                    {ad.sale_name}
                </Typography>
            </DialogTitle>
            <Container>
                <Category variant="subtitle1">{ad.cat_name}</Category>
                <Image src={ad.sale_image ? ad.sale_image : No_image_available} alt={ad.sale_name} />
                <Details>
                    {/*<Typography>Condition: {ad.condition}</Typography>*/}
                    <Typography>Price: ${ad.sale_price}</Typography>
                    <Typography>Description: {ad.sale_description}</Typography>
                    {/*<Typography>Postal Code: {ad.postalCode}</Typography>*/}
                    {/*<Typography>Email: {ad.email}</Typography>*/}
                    {/*<Typography>Phone: {ad.phone}</Typography>*/}
                </Details>
                <ChatButton onClick={openChat} color="primary">
                    <ChatIcon />
                </ChatButton>
            </Container>
        </Dialog>
    );
};

export default ViewAd;
