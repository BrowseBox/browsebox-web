import { setIn } from "formik";
import { React, useState } from "react";
import ShowSearchedAds from "./ShowSearchedAds";
import { Hidden } from "@mui/material";

const HandleSearch = ({input}) => {

    const prompt = input;
    return(
        <div hidden>
            <ShowSearchedAds prompt={prompt}/>
        </div>
    );
}

export default HandleSearch;