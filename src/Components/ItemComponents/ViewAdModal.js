import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography, IconButton, Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import axios from 'axios';
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

const ChatForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    gap: 1rem;
`;

const ViewAd = ({ trigger, onClose, id }) => {
    const [ad, setAd] = useState(null);
    const [open, setOpen] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    let currentUser = JSON.parse(localStorage.getItem('id'));

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
                    // console.log(res.data[0]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [open, id]);

    const openChat = async (e) => {
        e.preventDefault();

        const messageText = e.target.elements[0].value;

        try {
            const conversationResponse = await axios.post('http://localhost:3005/create-conversation', {
                user1_id: currentUser,
                user2_id: ad.owner,
                sale_id: ad.sale_id,
            });

            const conversationId = conversationResponse.data.conversation_id;

            await axios.post('http://localhost:3005/send-message', {
                conversation_id: conversationId,
                speaker_id: currentUser,
                message_content: messageText,
            });

            e.target.elements[0].value = '';
            setMessageSent(true);

            console.log('Message sent');
        } catch (error) {
            console.error('Error sending the message:', error);
        }
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
                    <Typography>Price: ${ad.sale_price}</Typography>
                    <Typography>Description: {ad.sale_description}</Typography>
                </Details>
                {currentUser !== ad.owner ? (
                    !messageSent ? (
                        <ChatForm onSubmit={openChat}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Message"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Send
                            </Button>
                        </ChatForm>
                    ) : (
                        <Typography variant="h6" color="primary" style={{ marginTop: '1rem' }}>
                            Message sent!
                        </Typography>
                    )
                ) : (
                    <Typography variant="h6" color="primary" style={{ marginTop: '1rem' }}>
                        This is your ad!
                    </Typography>
                )}
            </Container>
        </Dialog>
    );
};

export default ViewAd;

