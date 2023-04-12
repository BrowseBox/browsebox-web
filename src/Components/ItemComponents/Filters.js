import { AppBar, Toolbar, IconButton, Button, ButtonGroup } from '@mui/material'
import { Menu as MenuIcon, Favorite, Chat, Home as HomeIcon } from '@mui/icons-material'
import MonitorIcon from '@mui/icons-material/Monitor';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalculateIcon from '@mui/icons-material/Calculate';
import LinkIcon from '@mui/icons-material/Link';
import { Link } from 'react-router-dom'
import { React, useState} from 'react'
import styled from 'styled-components'
import { useEffect } from 'react'
import ShowFilteredAds from './ShowFilteredAds';
import axios from 'axios';

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 8px;
  margin-right: 8px;
`


const HandleFilters = () => {

}

const Filters = () => {
    
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .post('http://localhost:3001/get-filters')
            .then((res) => {
                setItems(res.data)
                // console.log(items)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log(items)

    const filterElements = items.map((item) => {
        return(
            <HandleFilters
                key={item.cat_id}
                item={{
                    catID: item.cat_id,
                    catName: item.cat_name
                }}
            />
        );
    })
    const handleMiscFilter = (event) => {
        
    }
    const handleComputerFilter = (event) => {
        
        return(
            filterElements
        )
        
    }
    const handleCalculatorFilter = (event) => {
        localStorage.setItem("catID", 1)
        
    }
    const handleStanionaryFilter = (event) => {
        localStorage.setItem("catID", 3)
        
    }
    const handleTextbookFilter = (event) => {
        localStorage.setItem("catID", 2)
        
    }

  return (
    <Toolbar sx={{ backgroundColor: '#6e6b6a', color: '#6e6b6a', display: 'flex', justifyContent: 'space-between' }}>
      <>
        <ButtonGroup sx={{ display: 'flex', justifyContent: 'flex-end', float: 'right' }}>
          <StyledLink to="/searched-filter">
            <IconButton edge="end" color="inherit" aria-label="MiscellaneousServicesIcon" title="Miscellenious" onClick={handleMiscFilter}>
              <MiscellaneousServicesIcon />
            </IconButton>
          </StyledLink>
          <StyledLink to="/searched-filter">
            <IconButton edge="end" color="inherit" aria-label="MonitorIcon" title="Computer" onClick={handleComputerFilter}>
              <MonitorIcon />
            </IconButton>
          </StyledLink>
          <StyledLink to="/searched-filter">
            <IconButton edge="end" color="inherit" aria-label="MenuBookIcon" title="Textbook" onClick={handleTextbookFilter}>
              <MenuBookIcon />
            </IconButton>
          </StyledLink>
          <StyledLink to="/searched-filter">
            <IconButton edge="end" color="inherit" aria-label="LinkIcon" title="Stationary" onClick={handleStanionaryFilter}>
              <LinkIcon />
            </IconButton>
          </StyledLink>
          <StyledLink to="/searched-filter">
            <IconButton edge="end" color="inherit" aria-label="CalculateIcon" title="Calculator" onClick={handleCalculatorFilter}>
              <CalculateIcon />
            </IconButton>
          </StyledLink>
        </ButtonGroup>
      </>
    </Toolbar>
  )
}

export default Filters
