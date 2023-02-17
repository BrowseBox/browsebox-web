import React from 'react'
import { Box, Divider, Modal } from '@mui/material'
import SignupForm from './SignupForm'

export default function SignupModal(props) {
  const { openSignupModal, handleCloseSignupModal } = props

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
      <Modal open={openSignupModal} onClose={handleCloseSignupModal}>
        <Box sx={style}>
          <h2>Sign up</h2>
          <Divider />
          <SignupForm handleCloseSignupModal={handleCloseSignupModal} />
        </Box>
      </Modal>
    </>
  )
}
