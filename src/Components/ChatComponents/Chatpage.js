import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import MyChats from "./MyChats";
import Chatbox from "./Chatbox";
import { ChatState } from "./ChatProvider";

const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { socket, user } = ChatState();

    useEffect(() => {
        if (socket == null || user == null) return;

        // Initiate a session with the user's login ID
        socket.emit("initiate_session", user);

        // Handle other socket events here if needed

    }, [socket, user]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "stretch",
                width: "100%",
                height: "100vh",
                padding: "10px",
                gap: { xs: "10px", md: "20px" },
            }}
        >
            {user && <MyChats fetchAgain={fetchAgain} />}
            {user && (
                <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
        </Box>
    );
};

export default Chatpage;
