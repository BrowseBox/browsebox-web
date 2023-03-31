import React, { useEffect, useState } from 'react';
import Ad from './AdList';
import axios from 'axios';

const ShowAds = () => {
    const id = 1;

    const [ads, setAds] = useState([]);

    useEffect(() => {
        axios
            .post('http://localhost:3001/get-sales', { id })
            .then((res) => {
                setAds(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);



    return (
        <div>
            {ads.length > 0 &&
                ads.map((ad) => (
                    // <Ad key={ad.id} ad={ad} />
                    <Ad key={ad.sale_id} ad={ad} />
                ))}
        </div>
    );
};

export default ShowAds;







