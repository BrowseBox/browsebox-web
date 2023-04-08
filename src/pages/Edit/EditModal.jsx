import React from 'react'
import { Box, Divider, Modal } from '@mui/material'
import EditForm from './EditForm'

export default function EditModal(props) {
  const { openEditModal, handleCloseEditModal, user, setUser } = props

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
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Box sx={style}>
          <h2>Edit Profile</h2>
          <Divider />
          <EditForm user={user} setUser={setUser} handleCloseEditModal={handleCloseEditModal} />
        </Box>
      </Modal>
    </>
  )
}
