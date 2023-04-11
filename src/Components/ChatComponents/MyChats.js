import { Box, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChatState } from './ChatProvider';

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();


    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

    const fetchChats = async () => {
        if (!loggedUser) return;
        try {
            const response = await axios.get(`http://localhost:3005/user/${loggedUser}/conversations`);

            const chatDataPromises = response.data.map(async (conversation) => {
                const otherUserId = conversation.user1_id === loggedUser ? conversation.user2_id : conversation.user1_id;
                const [otherUserResponse, adResponse] = await Promise.all([
                    axios.post('http://localhost:3001/get-user', { id: otherUserId }),
                    // axios.get(`http://localhost:3005/ad/${conversation.ad_id}`),
                    axios.post(`http://localhost:3001/sale`, { id: conversation.sale_id })

                ]);

                const otherUser = otherUserResponse.data;
                const ad = adResponse.data;


                return {
                    conversationId: conversation.conversation_id,
                    itemName: ad.sale_name,
                    itemImage: ad.sale_image, // Assuming the image url is stored as 'image_url'
                    otherUserName: otherUser.user_name,
                };
            });

            const chatData = await Promise.all(chatDataPromises);
            console.log('Final chat data:', chatData);
            console.log('Chats:', chats)
            setChats(chatData);
            console.log('Chats:', chats)
        } catch (error) {
            console.error(`Error fetching conversations for user ${loggedUser}: `, error);
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('id')));
    }, []);

    useEffect(() => {
        fetchChats();
    }, [loggedUser, fetchAgain]);

    return (
        <Box
            sx={{
                display: { xs: selectedChat ? 'none' : 'flex', md: 'flex' },
                flexDirection: 'column',
                alignItems: 'center',
                p: 3,
                bgcolor: 'white',
                width: { xs: '100%', md: '31%' },
                borderRadius: 'lg',
                borderWidth: '1px',
            }}
        >
            <Box
                sx={{
                    pb: 3,
                    px: 3,
                    fontSize: { xs: '28px', md: '30px' },
                    fontFamily: 'Work sans',
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                My Chats
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    bgcolor: '#F8F8F8',
                    width: '100%',
                    height: '100%',
                    borderRadius: 'lg',
                    overflowY: 'hidden',
                }}
            >
                {chats ? (
                    <Box sx={{ overflowY: 'scroll', width: '100%' }}>
                        <Stack>
                            {chats.map((chat) => (
                                <Box
                                    onClick={() => setSelectedChat(chat)}
                                    sx={{
                                        cursor: 'pointer',
                                        bgcolor: selectedChat === chat ? '#38B2AC' : '#E8E8E8',
                                        color: selectedChat === chat ? 'white' : 'black',
                                        px: 3,
                                        py: 2,
                                        borderRadius: 'lg',
                                    }}
                                    key={chat.conversationId}
                                >
                                    <Typography>
                                        {chat.otherUserName} - {chat.itemName}
                                    </Typography>
                                    <img src={chat.itemImage} alt={chat.itemName} style={{ width: '100px', height: 'auto' }} />
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                ) : (
                    <div>Loading...</div>
                )}
            </Box>
        </Box>
    );
};

export default MyChats;
