import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import insta_logo from "../../images/logoinsta.png";
import home from "../../images/home.svg";
import message from "../../images/message.svg";
import find from "../../images/find.svg";
import react from "../../images/love.svg";
import pp from "../../images/pp1.png";
import InputBase from "@mui/material/InputBase";
import eye from "../../images/eye.jpg";

import "./NavBar.css";
import styled from "styled-components";
export default function NavBar() {
  return (
    <>
      <div className='navbar-content'>
        <Grid container>
          <Grid item xs={1}>
            {/* blank */}
          </Grid>
          <Grid item xs={4}>
            <img src={insta_logo} className='navbar-logo' />
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: "flex", justifyContent: "flexEnd" }}
          >
            <div className='navbar-search-container'>
              <input
                type='text'
                className='navbar-search'
                placeholder='search'
              />
              <SearchIcon
                style={{
                  position: "absolute",
                  left: "10px",
                  marginTop: "18px",
                  width: "20px",
                  color: "#aaa",
                  pointerEvents: "none",
                }}
              />
            </div>
          </Grid>
          <Grid item xs={4} className='navbar-actions'>
            <img src={home} className='navbar-action'/>
            <img src={message} className='navbar-action'/>
            <img src={find} className='navbar-action'/>
            <img src={react} className='navbar-action'/>
            {/* <img src={}/> */}
            <Avatar
              src={eye}
              alt='Remy Sharp'

              className="navbar-avatar"
            />
          </Grid>
          <Grid item xs={1}>
            {/* blank */}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
