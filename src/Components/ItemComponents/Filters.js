import { AppBar, Toolbar, IconButton, Button, ButtonGroup } from '@mui/material'
import MonitorIcon from '@mui/icons-material/Monitor';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalculateIcon from '@mui/icons-material/Calculate';
import LinkIcon from '@mui/icons-material/Link';
import { Link } from 'react-router-dom'
import { React, useState} from 'react'
import styled from 'styled-components'
import HandleFilters from './handleFilters';

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 8px;
  margin-right: 8px;
`
const Filters = () => {

  const [filterId, setId] = useState("")
  const id = useState("");

    const handleClick = (id) => {
      localStorage.setItem('filterID', id)
    }

  return (
    <Toolbar sx={{ backgroundColor: '#6e6b6a', color: '#6e6b6a', display: 'flex', justifyContent: 'space-between' }}>
      <>
        <ButtonGroup sx={{ display: 'flex', justifyContent: 'flex-end', float: 'right' }}>
          <StyledLink to="/searched-filter">
            <IconButton edge="end" color="primary" aria-label="MiscellaneousServicesIcon" title="Miscellenious" onClick={handleClick.bind(id, 4)}>
              <MiscellaneousServicesIcon />
            </IconButton>
          </StyledLink>
          <StyledLink to="/searched-filter">
            <IconButton edge="end" color="primary" aria-label="MonitorIcon" title="Computer" onClick={handleClick.bind(id, 0)}>
              <MonitorIcon />
            </IconButton>
          </StyledLink>
          <StyledLink to="/searched-filter">
            <IconButton edge="end" color="primary" aria-label="MenuBookIcon" title="Textbook" onClick={handleClick.bind(id, 2)}>
              <MenuBookIcon />
            </IconButton>
          </StyledLink>
          <StyledLink to="/searched-filter">
            <IconButton edge="end" color="primary" aria-label="LinkIcon" title="Stationary" onClick={handleClick.bind(id, 3)}>
              <LinkIcon />
            </IconButton>
          </StyledLink>
          <StyledLink to="/searched-filter">
            <IconButton edge="end" color="primary" aria-label="CalculateIcon" title="Calculator" onClick={handleClick.bind(id, 1)}>
              <CalculateIcon />
            </IconButton>
          </StyledLink>
        </ButtonGroup>
      </>
    </Toolbar>
  )
}

export default Filters
