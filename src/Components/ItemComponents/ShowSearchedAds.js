import React, { useEffect, useState } from 'react';
import {Typography} from "@mui/material";
import Ad from './AdList';
import axios from 'axios';


const ShowSearchedAds = (props) => {

    const keyword = props.prompt;
    // console.log(keyword)

    const [ads, setAds] = useState([]);

    useEffect(() => {
        axios
            .post('http://localhost:3001/search-sale', { keyword })
            .then((res) => {
                setAds(res.data);
                console.log(keyword)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);



    return (
        <div>
            <Typography variant="h4" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>Here are your results...</Typography>
            {ads.length > 0 ? (
                ads.map((ad) => (
                    // <Ad key={ad.id} ad={ad} />
                    <Ad key={ad.sale_id} ad={ad} />
                ))
            ) : (
                <Typography variant="h5" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>We could not find a match....</Typography>
            )}
        </div>
    );
    
}

export default ShowSearchedAds;