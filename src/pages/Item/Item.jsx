import React from 'react'
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography, Stack, CardActionArea } from '@mui/material'
import { FaStar } from 'react-icons/fa'

export default function Item(props) {
  const { item } = props

  return (
    <Card
      sx={{
        maxWidth: 345,
      }}>
      <CardActionArea>
        <CardMedia sx={{ height: 220 }} image={item.img} alt={item.name} component="img" />
      </CardActionArea>
      <CardContent>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography gutterBottom variant="h5" component="div" fontWeight={600}>
            {item.name}
          </Typography>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" size="small">
              <FaStar />
            </IconButton>
          </CardActions>
        </Stack>
        <Typography variant="body2" color="text.secondary" fontSize={12}>
          {item.description}
        </Typography>
      </CardContent>
    </Card>
  )
}
