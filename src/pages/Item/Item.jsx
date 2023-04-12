import React, { useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Stack,
  CardActionArea,
  Grid,
} from '@mui/material'
import { FaStar } from 'react-icons/fa'
import ViewAdModal from '../../Components/ItemComponents/ViewAdModal'
import NoImageAvailable from './../../Media/No_Image_Available.jpg'

export default function Item(props) {
  const [showViewAdModalOpen, setIsViewAdModalOpen] = useState(false)
  const { item } = props

    // const addFavorite = () => {
    //     axios.post ('http://localhost:3001/add-favorite', {user_id: localStorage.getItem("id"), sale_id: item.id})
    //     .then((res) => {
    //         console.log(res.data)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }

  const handleIsViewAdModalOpen = () => {
    setIsViewAdModalOpen(true)
  }

  const handleCloseViewAdModal = () => {
    setIsViewAdModalOpen(false)
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          minWidth: 345,
          maxWidth: 345,
        }}>
        <CardActionArea onClick={handleIsViewAdModalOpen}>
          <CardMedia
            sx={{ height: 220 }}
            image={item.img ? item.img : NoImageAvailable}
            alt={item.name}
            component="img"
          />
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
          <Typography variant="body2" color="green" fontSize={15} fontWeight={600}>
            ${item.price}
          </Typography>
        </CardContent>
        <ViewAdModal trigger={showViewAdModalOpen} onClose={handleCloseViewAdModal} id={item.id} />
      </Card>
    </Grid>
  )
}
