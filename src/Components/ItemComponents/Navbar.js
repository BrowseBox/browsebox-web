import React from "react";
import styled from "styled-components";
import {AppBar, Toolbar, IconButton, Button, ButtonGroup} from "@mui/material";
import { Menu as MenuIcon, Favorite, Chat } from "@mui/icons-material";
import {Link} from "react-router-dom";

const Navbar = ( props ) => {
    let name = props.LoggedIn?.user_name
    // console.log(props.LoggedIn.user_name);
    // user=1;
    return (
        <div position="static" sx={{display:'flex'}}>

            <Toolbar sx={{backgroundColor:'#b7ac91', color:'#f7f2e5', display:'flex'}}>
                {name  ? (
                    <>

                        <p> Welcome {name} </p>
                        <ButtonGroup sx={{ display:'flex', justifyContent: 'flex-end', float:'right'}}>

                        <Link to="/ShowAd"><IconButton edge="end" color="inherit" aria-label="menu" title="View Ads">
                            <MenuIcon />
                        </IconButton></Link>
                        <Link to="/favorites"><IconButton edge="end" color="inherit" aria-label="favorite" title="Favorites">
                            <Favorite />
                        </IconButton></Link>
                        <Link to="/chat"><IconButton edge="end" color="inherit" aria-label="chat" title = "Chat">
                            <Chat />
                        </IconButton></Link>
                        <Link to="/create-ad"><Button color="primary" size="large" variant="contained">Post add</Button></Link>

                        </ButtonGroup>
                    </>
                ) : (
                    <>
                       <p> Please Login to create or inquire on Ads</p>
                    </>
                )}
            </Toolbar>
        </div>
    );
};



export default Navbar;

