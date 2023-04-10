import React from "react";
import { useState, useEffect } from 'react'
import { InputAdornment, TextField} from '@mui/material'
import { useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'
import HandleSearch from "./HandleSearch";
import ShowSearchedAds from "./ShowSearchedAds";


const SearchBar = () => {

  const [input, setInput] = useState("")
  const navigate = useNavigate();

  const handleSearch = (event) =>{
    setInput(event.target.value) 
    
  }

  const handleClick = () => {
    navigate("/searched")
  }
  

   return (
    <header>
      <TextField
          variant="outlined"
          size="small"
          placeholder='Search...'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
        <button onClick={handleClick}>Find</button>
        <HandleSearch input={input}/>
    </header>
    
   )
}



export default SearchBar;