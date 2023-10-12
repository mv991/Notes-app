import { Fab } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";

function Header(props) {
 
  return (
    <header>
       <h1>
       Welcome Back,<br/>
      {props.user}
      </h1>
      <Fab color="error" size={"medium"}>
      <LogoutIcon onClick={props.logout}/>
      </Fab>
    </header>
  );
}

export default Header;
