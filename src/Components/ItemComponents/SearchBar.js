import React from "react";
import { useState, useEffect } from 'react'
import { InputAdornment, TextField} from '@mui/material'
import { useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'


const SearchBar = () => {

  const [input, setInput] = useState("")
  const navigate = useNavigate();

  const handleSearch = (event) =>{
    setInput(event.target.value) 
    localStorage.setItem("input", input);
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
    </header>
    
   )
}



export default SearchBar;