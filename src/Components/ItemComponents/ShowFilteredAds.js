import React from "react";
import { useEffect, useState} from "react";
import axios from "axios";

const ShowFilteredAds = (props) => {

    const catId = props.id
    // catId.setKey({catId});
    console.log(catId)

    const [items, setItems] = useState([]);


    useEffect(() => {
        axios
            .post('http://localhost:3001/get-sale-filter', { catId })
            .then((res) => {
                setItems(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return("Filters go here")
}

export default ShowFilteredAds;