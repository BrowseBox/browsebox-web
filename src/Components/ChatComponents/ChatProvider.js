import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();
    const [socket, setSocket] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("id"));
        setUser(userInfo);

        if (!userInfo) navigate("/");
    }, [navigate]);

    useEffect(() => {
        // Replace 'http://localhost:3001' with your server URL
        const newSocket = io("http://localhost:3005");
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return (
        <ChatContext.Provider
            value={{
                selectedChat,
                setSelectedChat,
                user,
                setUser,
                notification,
                setNotification,
                chats,
                setChats,
                socket, // Add the socket here
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
