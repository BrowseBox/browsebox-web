import { Box } from "@mui/material";
import { useState } from "react";
// import Chatbox from "../components/Chatbox";
import MyChats from "./MyChats";
import ChatProvider from "./ChatProvider";


const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const user = JSON.parse(localStorage.getItem("id"));

    return (
        <ChatProvider>
        <div style={{ width: "100%" }}>
            <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {user && <MyChats fetchAgain={fetchAgain} />}
                {/*{user && (*/}
                {/*    <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />*/}
                {/*)}*/}
            </Box>
        </div>
        </ChatProvider>

    );
};

export default Chatpage;
