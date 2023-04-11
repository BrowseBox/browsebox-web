import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { FormControl, InputLabel, Input, Typography, Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import ScrollableFeed from "react-scrollable-feed";
import "./styles.css";
import {ChatState} from "./ChatProvider";
import {getSender, getSenderFull, isLastMessage, isSameSender, isSameSenderMargin, isSameUser} from "./ChatLogics";

const ENDPOINT = "http://localhost:3005";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);

    const userId = localStorage.getItem("id");

    const defaultOptions = {
        loop: true,
        autoplay: true,
        // animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const { selectedChat, setSelectedChat, user, notification, setNotification } =
        ChatState();

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {


            setLoading(true);

            const { data } = await axios.get(
                'http://localhost:3005/conversation/' + selectedChat._id + '/messages'
                `/api/message/${selectedChat._id}`
            );
            setMessages(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            // toast({
            //     title: "Error Occured!",
            //     description: "Failed to Load the Messages",
            //     status: "error",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom",
            // });
        }
    };

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const { data } = await axios.post(
                    "/api/message",
                    {
                        content: newMessage,
                        chatId: selectedChat,
                    },
                    config
                );
                socket.emit("new message", data);
                setMessages([...messages, data]);
            } catch (error) {
                // toast({
                //     title: "Error Occured!",
                //     description: "Failed to send the Message",
                //     status: "error",
                //     duration: 5000,
                //     isClosable: true,
                //     position: "bottom",
                // });
            }
        }
    };

    useEffect(() => {
        console.log(user);
        socket = io(ENDPOINT);
        socket.emit("setup", 4);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat;
        // eslint-disable-next-line
    }, [selectedChat]);

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (
                !selectedChatCompare || // if chat is not selected or doesn't match current chat
                selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {
                if (!notification.includes(newMessageRecieved)) {
                    setNotification([newMessageRecieved, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    });

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };
    return (
        <>
            {selectedChat ? (
                <>
                    <Typography
                        variant="h5"
                        style={{
                            paddingBottom: "8px",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                            width: "100%",
                            fontFamily: "Work sans",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            style={{
                                display: "flex",
                            }}
                            onClick={() => setSelectedChat("")}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        {messages &&
                            (!selectedChat.isGroupChat ? (
                                <>
                                    {/*{getSender(user, selectedChat.users)}*/}
                                    {/*<ProfileModal*/}
                                    {/*    user={getSenderFull(user, selectedChat.users)}*/}
                                    {/*/>*/}
                                </>
                            ) : (
                                <>{selectedChat.chatName.toUpperCase()}</>
                            ))}
                    </Typography>
                    <Box
                        d="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {loading ? (
                            <></>
                            // <Spinner
                            //     size="xl"
                            //     w={20}
                            //     h={20}
                            //     alignSelf="center"
                            //     margin="auto"
                            // />
                        ) : (
                            <div className="messages">
                                <ScrollableChat messages={messages} />
                            </div>
                        )}

                        <FormControl
                            onKeyDown={sendMessage}
                            id="first-name"
                            isRequired
                            mt={3}
                        >
                            {istyping ? (
                                <div>
                                    {/*<Lottie*/}
                                    {/*    options={defaultOptions}*/}
                                    {/*    // height={50}*/}
                                    {/*    width={70}*/}
                                    {/*    style={{ marginBottom: 15, marginLeft: 0 }}*/}
                                    {/*/>*/}
                                </div>
                            ) : (
                                <></>
                            )}
                            <Input
                                variant="filled"
                                bg="#E0E0E0"
                                placeholder="Enter a message.."
                                value={newMessage}
                                onChange={typingHandler}
                            />
                        </FormControl>
                    </Box>
                </>
            ) : (
                // to get socket.io on same page
                <Box d="flex" alignItems="center" justifyContent="center" h="100%">
                    <Typography variant="h4" gutterBottom fontFamily="Work sans">
                        Click on a user to start chatting
                    </Typography>
                </Box>
            )}
        </>
    );
};

const ScrollableChat = ({ messages }) => {
    const userId = localStorage.getItem("id");

    return (
        <ScrollableFeed>
            {messages &&
                messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                        {(isSameSender(messages, m, i, userId) ||
                            isLastMessage(messages, i, userId)) && (
                            <Tooltip title={m.sender.name} placement="bottom-start" arrow>
                                <Avatar
                                    style={{ marginTop: 7, marginRight: 5 }}
                                    size="small"
                                    cursor="pointer"
                                    alt={m.sender.name}
                                    src={m.sender.pic}
                                />
                            </Tooltip>
                        )}
                        <span
                            style={{
                                backgroundColor: `${
                                    m.sender._id === userId ? "#BEE3F8" : "#B9F5D0"
                                }`,
                                marginLeft: isSameSenderMargin(messages, m, i, userId),
                                marginTop: isSameUser(messages, m, i, userId) ? 3 : 10,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                            }}
                        >
              {m.content}
            </span>
                    </div>
                ))}
        </ScrollableFeed>
    );
};

export default SingleChat;
export { ScrollableChat };
