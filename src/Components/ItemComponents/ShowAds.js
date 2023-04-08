import React, { useEffect, useState } from 'react';
import Ad from './AdList';
import axios from 'axios';
import { Typography } from '@mui/material';

const ShowAds = () => {
    const id = localStorage.getItem('id');

    const [ads, setAds] = useState([]);
    // const [image, setImage] = useState('');

    // get images from database
    // const getImage = ( {listingId} ) => {
    //     let index = 1;
    //     axios
    //         .get(`http://52.13.116.107:7355/api/image/retrieve/listing/${listingId}/${index}`)
    //         .then((response) => {
    //             // handle successful response
    //             // console.log(response.data);
    //             setImage(response.data.imageUrl);
    //             alert ('Image retrieved successfully');
    //         })
    //         .catch((error) => {
    //             // handle error
    //             console.log(error);
    //         });
    // };

    useEffect(() => {
        axios
            .post('http://localhost:3001/get-sales', { id })
            .then((res) => {

                // setImage(getImage({ listingId: id }));
                // set image as test image image object
// // console.log (image.data);
//                 getImage({ listingId: id });
                setAds(res.data);
                // console.log(image)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <Typography variant="h4" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                View Your Ads
            </Typography>
            {ads.length > 0 ? (
                ads.map((ad) => <Ad key={ad.sale_id} ad={ad} />)
            ) : (
                <Typography variant="h5" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    You have no ads
                </Typography>
            )}
        </div>
    );
};

export default ShowAds;
