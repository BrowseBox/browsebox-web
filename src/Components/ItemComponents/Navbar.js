import React from "react";
import styled from "styled-components";
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import { Menu as MenuIcon, Favorite, Chat } from "@mui/icons-material";
import {Link} from "react-router-dom";

const Navbar = ({ user }) => {
    user=1;
    return (
        <div position="static">
            <Toolbar>
                {user === 1 ? (
                    <>
                        <Link to="/ShowAd"><IconButton edge="end" color="inherit" aria-label="menu">
                            <MenuIcon /> View Ads
                        </IconButton></Link>
                        <IconButton edge="end" color="inherit" aria-label="favorite">
                            <Favorite /> Favirotes
                        </IconButton>
                        <IconButton edge="end" color="inherit" aria-label="chat">
                            <Chat /> Chat
                        </IconButton>
                        <Link to="/create-ad"><Button color="primary" size="large" variant="outlined">Post add</Button></Link>
                    </>
                ) : (
                    <>
                        <Button color="inherit">Option 1</Button>
                        <Button color="inherit">Option 2</Button>
                        <Button color="inherit">Option 3</Button>
                    </>
                )}
            </Toolbar>
        </div>
    );
};



export default Navbar;
