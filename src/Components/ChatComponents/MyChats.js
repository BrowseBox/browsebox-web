import { Box, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ChatState } from './ChatProvider';

const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();

    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

    const fetchChats = async () => {
        try {
            const response = await axios.get(`http://localhost:3005/user/${loggedUser}/conversations`);

            const chatDataPromises = response.data.map(async (conversation) => {
                const adResponse = await axios.post('http://localhost:3001/sale', { id: conversation.sale_id });
                const ad = adResponse.data[0];

                const otherUserId = conversation.user1_id === loggedUser ? conversation.user2_id : conversation.user1_id;
                const userResponse = await axios.get(`http://localhost:3005/users/${otherUserId}`);
                const otherUser = userResponse.data;

                return {
                    conversationId: conversation.conversation_id,
                    itemName: ad.sale_name,
                    otherUserName: otherUser.name,
                };
            });

            const chatData = await Promise.all(chatDataPromises);
            setChats(chatData);
        } catch (error) {
            console.error(`Error fetching conversations for user ${loggedUser}: `, error);
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('id')));

        fetchChats();
    }, [fetchAgain]);

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
                                    key={chat.conversation_id} // Update the key to use conversation_id
                                >
                                    <Typography>
                                        {loggedUser === chat.user1_id ? chat.user2_name : chat.user1_name} - {chat.itemName}
                                    </Typography>
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


