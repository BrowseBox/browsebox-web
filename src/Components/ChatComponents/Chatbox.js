import { Box, TextField, Button } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { ChatState } from "./ChatProvider";
import axios from "axios";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat, user, socket } = ChatState();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    let loggedInUser = JSON.parse(localStorage.getItem('id'));

    useEffect(() => {
        if (selectedChat) {
            getMessages(selectedChat);
            socket.emit("join chat", selectedChat.conversationId);
        }

        return () => {
            if (selectedChat) {
                socket.emit("leave chat", selectedChat.conversationId);
            }
        };
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
        });

        return () => {
            socket.off("message received");
        };
    }, [socket]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const getMessages = async (ConversationID) => {
        console.log ("Getting messages for conversation   selected chat is", ConversationID.conversationId);
        try {
            axios.get(`http://localhost:3005/conversation/${ConversationID.conversationId}/messages`)
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
        if (!newMessage) return;
        const messageData = {
            conversation_id: selectedChat.conversationId,
            speaker_id: loggedInUser,
            message_content: newMessage,
        };
        axios.post("http://localhost:3005/conversation/messages", messageData)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error sending message:", error);
            });

        socket.emit("new message", {
            ...messageData,
            sender: { _id: loggedInUser },
            chat: selectedChat,
        });

        // Update the messages state with the new message
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                ...messageData,
                message_id: Math.random().toString(36).substring(2, 15),
            },
        ]);

        setNewMessage("");
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
                            alignSelf: message.speaker_id === loggedInUser ? "flex-end" : "flex-start",
                            maxWidth: "60%",
                            padding: "5px",
                            borderRadius: "5px",
                            backgroundColor: message.speaker_id === loggedInUser ? "lightblue" : "lightgrey",
                        }}
                    >
                        {message.message_content}
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
                    sendMessage();
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


