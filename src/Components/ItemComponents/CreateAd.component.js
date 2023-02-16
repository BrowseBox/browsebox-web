// this component will  use the AdDetailInformationForm.component.js and send result to the backend

import React, {Component, useState} from 'react';
import axios from 'axios';
import CreateItemForm from "./CreateItemForm";
//import MediaForm from "./MediaForm.component";
// import LocationInformationForm from "./LocationInformationForm.component";
// import PriceInformationForm from "./PriceInformationForm.component";
// import ContactInformationForm from "./ContactInformationForm.component";


const CreateAd = () => {

    const [adDetail, setadetaild] = useState({
        title: '',
        condition: '',
        description: '',
        imageLocation: '',
        postalCode: '',
        streetAddress: '',
        price: '',
        email: '',
        phone: ''
    })

    const onSubmit = async (adDetailObject) => {
        const response = await axios.post('http://localhost:4000/ads/create-ad', adDetailObject)
        const json = await response.data;
        if (response.status === 200) {
            alert("Ad successfully created");
            // navigate("/ad-list");
        }
        else
            Promise.reject();
    }

    return (

        <div>
                <CreateItemForm
                    initialValues={adDetail}
                    onSubmit={onSubmit}
                    enableReinitialize>
                    Create Item
                </CreateItemForm>

        </div>
    )
}

export default CreateAd;

