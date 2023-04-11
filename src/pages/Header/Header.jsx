import { Box, IconButton, InputAdornment, TextField, Menu, MenuItem } from '@mui/material'
import { FaSearch, FaUserAlt } from 'react-icons/fa'
import React from 'react'
import { useState } from 'react'
import SignupModal from '../Signup/SignupModal'
import LoginModal from '../Login/LoginModal'
import EditModal from '../Edit/EditModal'

export default function Header(props) {
  const { user, setUser, schools } = props

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
  const handleOpenSignupModal = () => {
    handleMenuClose()
    setOpenSignupModal(true)
  }
  const handleCloseSignupModal = () => setOpenSignupModal(false)

  // Login Modal
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const handleOpenLoginModal = () => {
    handleMenuClose()
    setOpenLoginModal(true)
  }
  const handleCloseLoginModal = () => setOpenLoginModal(false)

  // Edit Modal
  const [openEditModal, setOpenEditModal] = useState(false)
  const handleOpenEditModal = () => {
    handleMenuClose()
    setOpenEditModal(true)
  }
  const handleCloseEditModal = () => setOpenEditModal(false)

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('id')
    setUser(null)
    handleMenuClose()
  }

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
        <IconButton onClick={handleMenuClick}>
          <FaUserAlt />
        </IconButton>
        <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
          {localStorage.getItem('id') === null && <MenuItem onClick={handleOpenSignupModal}>Sign Up</MenuItem>}
          {localStorage.getItem('id') === null && <MenuItem onClick={handleOpenLoginModal}>Log In</MenuItem>}
          {localStorage.getItem('id') !== null && <MenuItem onClick={handleOpenEditModal}>Edit Profile</MenuItem>}
          {localStorage.getItem('id') !== null && <MenuItem onClick={handleLogout}>Log Out</MenuItem>}
          {/* <MenuItem onClick={handleMenuClose}>Log Out</MenuItem> */}
        </Menu>
        <SignupModal
          openSignupModal={openSignupModal}
          handleCloseSignupModal={handleCloseSignupModal}
          schools={schools}
        />
        <LoginModal openLoginModal={openLoginModal} handleCloseLoginModal={handleCloseLoginModal} setUser={setUser} />
        <EditModal
          openEditModal={openEditModal}
          handleCloseEditModal={handleCloseEditModal}
          user={user}
          setUser={user}
          // schools={schools}
        />
      </Box>
    </header>
  )
}
