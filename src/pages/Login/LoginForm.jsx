import { Box, Button, TextField } from '@mui/material'
import React from 'react'

export default function LoginForm() {
  const textFieldStyle = {
    marginBottom: 10,
  }

  return (
    <Box mt={2}>
      <TextField label="Email" variant="outlined" fullWidth style={textFieldStyle} />
      <TextField label="Password" variant="outlined" fullWidth style={textFieldStyle} />
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 1,
        }}>
        Login
      </Button>
    </Box>
  )
}
