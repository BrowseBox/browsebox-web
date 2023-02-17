import React from 'react'
import { Box, Divider, Modal } from '@mui/material'
import LoginForm from './LoginForm'

export default function LoginModal(props) {
  const { openLoginModal, handleCloseLoginModal, setUser } = props

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 10,
    p: 2,
    borderRadius: 2,
  }

  return (
    <>
      <Modal open={openLoginModal} onClose={handleCloseLoginModal}>
        <Box sx={style}>
          <h2>Log in</h2>
          <Divider />
          <LoginForm setUser={setUser} handleCloseLoginModal={handleCloseLoginModal} />
        </Box>
      </Modal>
    </>
  )
}
