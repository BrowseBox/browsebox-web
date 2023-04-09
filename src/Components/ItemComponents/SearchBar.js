import React from "react";
import { useState, useEffect } from 'react'
import { InputAdornment, TextField} from '@mui/material'
import { FaSearch } from 'react-icons/fa'




const SearchBar = () => {
    // Search Functions
  const [input, setInput] = useState("")

  const handleSearch = (event) =>{
    setInput(event.target.value) 
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
    </header>
   )
}

export default SearchBar;