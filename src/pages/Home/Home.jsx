import React from 'react'
import { Box, Stack, IconButton} from '@mui/material'
import Item from '../Item/Item'

import BookIcon from '@mui/icons-material/AutoStoriesOutlined';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import FavoritesIcon from '@mui/icons-material/StarOutlineOutlined';
import SuppliesIcon from '@mui/icons-material/CreateOutlined';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ComputerIcon from '@mui/icons-material/Computer';
import VerifiedUserIcon from '@mui/icons-material/HowToReg';

export default function Home() {
  // Test State
  const [items, setItems] = React.useState([
    { id: 1, name: 'Item 1', img: 'https://picsum.photos/200/300', description: 'askldjlkqwjeiqwjeilqwjeiqwjelqeqwe' },
    { id: 2, name: 'Item 2', img: 'https://picsum.photos/200/300', description: 'askldjlkqwjeiqwjeilqwjeiqwjelqeqwe' },
    { id: 3, name: 'Item 3', img: 'https://picsum.photos/200/300', description: 'askldjlkqwjeiqwjeilqwjeiqwjelqeqwe' },
    { id: 4, name: 'Item 4', img: 'https://picsum.photos/200/300', description: 'askldjlkqwjeiqwjeilqwjeiqwjelqeqwe' },
    { id: 5, name: 'Item 5', img: 'https://picsum.photos/200/300', description: 'askldjlkqwjeiqwjeilqwjeiqwjelqeqwe' },
    { id: 6, name: 'Item 6', img: 'https://picsum.photos/200/300', description: 'askldjlkqwjeiqwjeilqwjeiqwjelqeqwe' },
  ])

  const itemElements = items.map((item) => {
    return <Item key={item.id} item={item} />
  })

  return (
    <>

    <Stack direction="row" spacing={14} justifyContent="center" borderRadius={2} padding="5">
      <IconButton aria-label="favorites">
        <FavoritesIcon />
      </IconButton>
      <IconButton aria-label="saved">
        <BookmarkIcon />
      </IconButton>
      <IconButton aria-label="supplies">
        <SuppliesIcon />
      </IconButton>
      <IconButton aria-label="electronics">
        <SmartphoneIcon />
      </IconButton>
      <IconButton aria-label="books">
        <BookIcon />
      </IconButton>
      <IconButton aria-label="computers/laptop">
        <ComputerIcon />
      </IconButton>
      <IconButton aria-label="verified user">
        <VerifiedUserIcon />
      </IconButton>
    </Stack>


      <Box>
        <Stack direction="row" spacing={3} m={5}>
          {itemElements}
        </Stack>
      </Box>
    </>
  )
}
