import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Item from '../../pages/Item/Item';
import { Box, Stack, Typography } from '@mui/material';

const ShowSearchedAds = () => {

    const keyword = localStorage.getItem("input");
    // console.log(input)
    
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .post('http://localhost:3001/search-sale', { keyword })
            .then((res) => {
                setItems(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const itemElements = items.map((item) => {
        return (
            <Item
                key={item.sale_id}
                item={{
                    id: item.sale_id,
                    name: item.sale_name,
                    img: item.sale_image,
                    description: item.sale_description,
                    price: item.sale_price,
                }}
            />
        );
    });

    return (
        <>
        <Typography variant="h4" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>Here are your results...</Typography>
            <Box sx={{ width: '80%', margin: 'auto' }}>
                <Stack direction="row" spacing={3} m={5}>
                    {itemElements}
                </Stack>
                { items.length > 0 && (
                    <Typography align="center" variant="h6">
                        End of ad list
                    </Typography>
                )}
                
            </Box>
        </>
    );
    
}

export default ShowSearchedAds;