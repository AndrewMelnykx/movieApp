import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { UseStoreDispatcher } from "@redux/store/store";
import { authorizationActions } from "@redux/slices/authorization-slice";

const Header = () => {
  const dispatch = UseStoreDispatcher();
  const handleSignUpVisibility = () => {
    dispatch(authorizationActions.changedSignUpVisibility(true));
  };

  return (
    <AppBar position="static" style={{ background: "black" }}>
      <Toolbar>
        <Typography
          className="header"
          variant="h4"
          sx={{
            flexGrow: 1,
            "&:hover": {
              color: "aqua",
              transition: " 0.3s ease-in-out",
            },
          }}
        >
          MOVIES
        </Typography>
        <IconButton size="large" edge="end" onClick={handleSignUpVisibility}>
          <LoginOutlinedIcon style={{ color: "white" }} fontFamily={"CustomFont"} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
