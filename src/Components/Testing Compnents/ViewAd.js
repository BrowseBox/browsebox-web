import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Typography, IconButton } from '@mui/material';
// import ChatIcon from '@mui/icons-material/Chat';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled(Typography)`
    margin: 1rem 0;
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

const ViewAd = ({ adId }) => {
    // const [ad, setAd] = useState(null);

    const ad = {
        adId: '12345',
        title: 'Apple MacBook Pro 16-inch (2020)',
        category: 'Electronics',
        condition: 'Used',
        price: '1800',
        description:
            'Selling my 2020 Apple MacBook Pro 16-inch in excellent condition. The laptop has a 2.3 GHz 8-Core Intel Core i9 processor, 16 GB RAM, and 1 TB SSD storage. It runs on macOS Big Sur and comes with the original charger.',
        imageLocation: 'https://www.slashgear.com/img/gallery/apple-macbook-pro-16-inch-review-after-5-months-im-convinced/l-intro-1646069705.jpg',
        postalCode: '12345',
        email: 'seller@example.com',
        phone: '(555) 123-4567',
    };

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:3001/get-ad/${adId}`)
    //         .then((res) => {
    //             setAd(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [adId]);

    const openChat = () => {
        // Open chatbox and send a message to the creator of the ad
    };

    if (!ad) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Title variant="h4">{ad.title}</Title>
            <Category variant="subtitle1">{ad.category}</Category>
            <Image src={ad.imageLocation} alt={ad.title} />
            <Details>
                <Typography>Condition: {ad.condition}</Typography>
                <Typography>Price: ${ad.price}</Typography>
                <Typography>Description: {ad.description}</Typography>
            </Details>
            {/*<ChatButton onClick={openChat} color="primary">*/}
            {/*    <ChatIcon />*/}
            {/*</ChatButton>*/}
        </Container>
    );
};

export default ViewAd;
