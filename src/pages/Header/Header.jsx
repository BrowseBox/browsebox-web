import { Box, IconButton, InputAdornment, TextField, Tooltip, Menu, MenuItem } from '@mui/material'
import { FaSearch, FaUserAlt } from 'react-icons/fa'
import React from 'react'
import { useState } from 'react'
import SignupModal from '../Signup/SignupModal'
import LoginModal from '../Login/LoginModal'

export default function Header() {
  // User Menu
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  // -------------

  // Sign-up Modal
  const [openSignupModal, setOpenSignupModal] = useState(false)
  const handleOpenSignupModal = () => setOpenSignupModal(true)
  const handleCloseSignupModal = () => setOpenSignupModal(false)

  // Login Modal
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const handleOpenLoginModal = () => setOpenLoginModal(true)
  const handleCloseLoginModal = () => setOpenLoginModal(false)

  return (
    <header>
      <Box
        sx={{
          backgroundColor: '#FFA996',
          color: '#665A48',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
          height: '5rem',
        }}>
        <h1>BrowseBox</h1>
        <TextField
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
        {/* <Tooltip title="User Settings"> */}
        <IconButton onClick={handleMenuClick}>
          <FaUserAlt />
        </IconButton>
        {/* </Tooltip> */}
        <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
          <MenuItem onClick={handleOpenSignupModal}>Sign In</MenuItem>
          <MenuItem onClick={handleOpenLoginModal}>Log In</MenuItem>
        </Menu>
        <SignupModal openSignupModal={openSignupModal} handleCloseSignupModal={handleCloseSignupModal} />
        <LoginModal openLoginModal={openLoginModal} handleCloseLoginModal={handleCloseLoginModal} />
      </Box>
    </header>
  )
}
