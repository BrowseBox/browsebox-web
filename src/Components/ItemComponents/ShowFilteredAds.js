import React from "react";
import { useEffect, useState} from "react";
import axios from "axios";
import Filters from "./Filters";
import Item from "../../pages/Item/Item";
import { Box, Stack, IconButton, Typography } from '@mui/material';

const ShowFilteredAds = () => {

    const catId = localStorage.getItem('filterID')
    console.log(catId)

    //this handles the post request to get-sale-filter
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .post('http://localhost:3001/get-sale-filter', { catId: catId })
            .then((res) => {
                setItems(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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

    return(
        <>
        <Filters/>
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
    )
}

export default ShowFilteredAds;