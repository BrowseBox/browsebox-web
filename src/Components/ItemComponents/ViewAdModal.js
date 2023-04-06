import React from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import { Typography, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
// import ChatIcon from '@mui/icons-material/Chat';

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

const ViewAd = ({ adId, open, onClose }) => {
    // const [ad, setAd] = useState(null);

    const ad = {
        // ... same ad object
    };

    // useEffect(() => {
    //     // same useEffect block
    // }, [adId]);

    const openChat = () => {
        // Open chatbox and send a message to the creator of the ad
    };

    if (!ad) {
        return <div>Loading...</div>;
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography variant="h4">{ad.title}</Typography>
            </DialogTitle>
            <Container>
                <Category variant="subtitle1">{ad.category}</Category>
                <Image src={ad.imageLocation} alt={ad.title} />
                <Details>
                    <Typography>Condition: {ad.condition}</Typography>
                    <Typography>Price: ${ad.price}</Typography>
                    <Typography>Description: {ad.description}</Typography>
                    <Typography>Postal Code: {ad.postalCode}</Typography>
                    <Typography>Email: {ad.email}</Typography>
                    <Typography>Phone: {ad.phone}</Typography>
                </Details>
                {/*<ChatButton onClick={openChat} color="primary">*/}
                {/*    <ChatIcon />*/}
                {/*</ChatButton>*/}
            </Container>
        </Dialog>
    );
};

export default ViewAd;
