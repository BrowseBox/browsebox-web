import { React, useEffect, useState} from "react";
import Item from "../../pages/Item/Item";
import axios from "axios";


const AllAds = () => {

    const [items, setItems] = useState([

      ])

      useEffect(() => {
        axios
            .post('http://localhost:3001/get-sale-price')
            .then((res) => {
                setItems(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

      const itemElements = items.map((item) => {
        

        return (
            // console.log(item.sale_id)
            <Item key={item.id} item={item} />
        )
      })

      return(itemElements)

}

export default AllAds;