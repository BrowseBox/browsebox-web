import { useState, useEffect } from "react";
import axios from "axios";
const HandleFilters = (props) => {

    console.log(props)

    const [items, setItems] = useState([]);
    useEffect(() => {
        axios
            .post('http://localhost:3001/get-filters')
            .then((res) => {
                setItems(res.data)
                // console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log(items)
}
export default HandleFilters;