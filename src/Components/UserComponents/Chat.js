
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Container, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Button } from '@mui/material';
// import { styled } from '@emotion/react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';

const socket = io.connect('http://localhost:3005');

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ChatContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
  width: 80vw;
`;

const RoomList = styled(List)`
  width: 20%;
  overflow: auto;
`;

const MessagesList = styled(List)`
  flex-grow: 1;
  width: 80%;
  overflow: auto;
`;

const Chat = () => {
    const [rooms, setRooms] = useState([{ id: 1, name: 'Room 1' }, { id: 2, name: 'Room 2' }]);
    const [activeRoom, setActiveRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const [userId, setUserId] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Set a user ID when the component is mounted
        // Replace this with a real user ID from your authentication system
        const loggedInUserId = '1';
        setUserId(loggedInUserId);

        // Emit the 'authenticate' event with the user ID when the socket is connected
        if (loggedInUserId) {
            socket.emit('authenticate', loggedInUserId);
        }
    }, []);

    useEffect(() => {
        socket.on('newMessage', (message) => {
            if (message.roomId === activeRoom) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });
    }, [activeRoom]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleRoomClick = (roomId) => {
        setActiveRoom(roomId);
        // Fetch messages for the clicked room (replace with actual API call)
        setMessages([
            { id: 1, text: 'Hello, this is a message', sender: 'User 1' },
            { id: 2, text: 'Hello, this is another message', sender: 'User 2' },
        ]);
    };

    const handleDeleteRoom = (roomId) => {
        setRooms(rooms.filter((room) => room.id !== roomId));
    };

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const message = { id: Date.now(), text: newMessage, sender: 'User 1', roomId: activeRoom };
            socket.emit('sendMessage', message);
            setNewMessage('');
        }
    };

    return (
        <StyledContainer>
            <ChatContainer>
                <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                    <RoomList>
                        {rooms.map((room) => (
                            <ListItem button key={room.id} onClick={() => handleRoomClick(room.id)}>
                                <ListItemText primary={room.name} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" color="inherit" onClick={() => handleDeleteRoom(room.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </RoomList>
                    <MessagesList>
                        {messages.map((message) => (
                            <ListItem key={message.id}>
                                <ListItemText primary={message.text} secondary={message.sender} />
                            </ListItem>
                        ))}
                        <div ref={messagesEndRef} />
                    </MessagesList>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Type your message"
                        value={newMessage}
                        onChange={handleNewMessageChange}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                    />
                    <Button
                        style={{ marginLeft: '1rem' }}
                        variant="contained"
                        color="primary"
                        onClick={handleSendMessage}
                    >
                        Send
                    </Button>
                </div>
            </ChatContainer>
        </StyledContainer>
    );
};

export default Chat;


