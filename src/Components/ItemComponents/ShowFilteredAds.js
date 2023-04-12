import React from "react";
import { useEffect, useState} from "react";
import axios from "axios";
import Filters from "./Filters";

const ShowFilteredAds = () => {

    const catId = localStorage.getItem('filterID')
    console.log(catId)

    const [filters, setFilters] = useState("");

    useEffect(() => {
        axios
            .post('http://localhost:3001/get-filters')
            .then((res) => {
                setFilters(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //this handles the post request to get-sale-filter
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .post('http://localhost:3001/get-sale-filter', { catId: catId })
            .then((res) => {
                setItems(res.data)
                // console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return(
        <Filters/>
    )
}

export default ShowFilteredAds;