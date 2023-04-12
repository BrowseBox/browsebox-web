import React from "react";
import { useState } from 'react'
import { InputAdornment, TextField} from '@mui/material'
import { FaSearch } from 'react-icons/fa'
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
    text-decoration: none;
    margin-left: 8px;
    margin-right: 8px;
`;

const SearchBar = () => {

  const [input, setInput] = useState("")

  const handleSearch = (event) =>{
    setInput(event.target.value) 
    localStorage.setItem("input", input);
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
        <StyledLink to="/searched"><Button color="primary" size="small" variant="contained">Search</Button></StyledLink>
    </header>
    
   )
}



export default SearchBar;