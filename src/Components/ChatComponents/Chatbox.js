import { Box, TextField, Button } from "@mui/material";
import {useEffect, useState} from "react";
import { ChatState } from "./ChatProvider";
import axios from "axios";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat, user, socket } = ChatState();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const { chats } = ChatState();

    useEffect(() => {
        if (selectedChat) {
            getMessages(selectedChat.conversation_id);
            console.log("Selected chat changed to", selectedChat);
        }
    }, [selectedChat]);

    const getMessages = async (conversationId) => {
        // console.log ("Getting messages for conversation", conversationId + "selected chat is", selectedChat.conversation_id);
        try {
            axios.get(`http://localhost:3005/conversation/${selectedChat.conversation_id}/messages`)
                .then(response => {
                    console.log("Response is", response.data);
                    setMessages(response.data);
                }
                )
            // const response = await axios.get(`http://localhost:3005/conversation/${selectedChat.conversationId}/messages`);
            // .then(response => {
            //
            // }
            //
            // // const data = await response.json();
            // setMessages(response);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const sendMessage = () => {
        // Add your code to send the message here
        // ...

        // Reset the message input field
        // setMessage("");

        // Fetch new messages (if needed)
        setFetchAgain(!fetchAgain);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "stretch",
                width: "100%",
                height: "100%",
                border: "1px solid grey",
                borderRadius: "10px",
                padding: "10px",
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            alignSelf: message.sender_id === user.id ? "flex-end" : "flex-start",
                            maxWidth: "60%",
                            padding: "5px",
                            borderRadius: "5px",
                            backgroundColor: message.sender_id === user.id ? "lightblue" : "lightgrey",
                        }}
                    >
                        {message.message}
                    </Box>
                ))}
            </Box>
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    // Handle sending message here
                }}
            >
                <TextField
                    label="Type a message"
                    variant="outlined"
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default Chatbox;
