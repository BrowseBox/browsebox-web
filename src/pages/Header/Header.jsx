import { Box } from '@mui/material'
import React from 'react'

export default function Header() {
  return (
    <header>
      <Box
        sx={{
          backgroundColor: '#c8dbbe',
          display: 'flex',
          // alignItems: 'center',
          // justifyContent: 'center',
          // gap: '7px',
          // padding: '5px',
          // marginBottom: '36px',
        }}>
        <h1>My App</h1>
      </Box>
    </header>
  )
}
