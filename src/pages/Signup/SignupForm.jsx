import { Box, Button, TextField } from '@mui/material'
import React from 'react'

export default function SignupForm() {
  const textFieldStyle = {
    marginBottom: 10,
  }

  return (
    <Box mt={2}>
      <TextField label="Username" variant="outlined" fullWidth style={textFieldStyle} />
      <TextField label="Email" variant="outlined" fullWidth style={textFieldStyle} />
      <TextField label="Password" variant="outlined" fullWidth style={textFieldStyle} />
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 1,
        }}>
        Sign Up
      </Button>
    </Box>
  )
}
