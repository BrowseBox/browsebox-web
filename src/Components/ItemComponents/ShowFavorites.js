import React, { useEffect, useState } from 'react';
import Ad from './FavoriteList';
import axios from 'axios';
import {Typography} from "@mui/material";

const ShowAds = () => {

    const id = localStorage.getItem('id');

    const [ads, setAds] = useState([]);

    useEffect(() => {
        axios
            .post('http://localhost:3001/get-favorites', { user_id:id })
            .then((res) => {
                setAds(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);



    return (
        <div>
            <Typography variant="h4" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>View Your Favorites</Typography>
            {ads.length > 0 ? (
                ads.map((ad) => (
                    // <Ad key={ad.id} ad={ad} />
                    <Ad key={ad.sale_id} ad={ad} />
                ))
                ) : (
                <Typography variant="h5" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>You have no favorites</Typography>
                )}
        </div>
    );
};

export default ShowAds;







