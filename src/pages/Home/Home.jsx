import React from 'react'
import { Box, Stack } from '@mui/material'
import Item from '../Item/Item'

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
      <Box>
        <Stack direction="row" spacing={3} m={5}>
          {itemElements}
        </Stack>
      </Box>
    </>
  )
}
