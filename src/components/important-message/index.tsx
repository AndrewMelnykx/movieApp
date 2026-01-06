import React from "react";
import { UseStoreDispatcher } from "@redux/store/store";

import { Typography, Box, Button } from "@mui/material";
import { authorizationActions } from "@redux/slices/authorization-slice";

const ImportantMessage = () => {
  const dispatch = UseStoreDispatcher();
  const handleGetStarted = () => {
    dispatch(authorizationActions.changedSignUpVisibility(true));
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      mt={10}
      flexDirection={"column"}
    >
      <Typography variant="h3" color={"white"}>
        Stay connected to new movies...
      </Typography>
      <Typography variant="h5" color={"purple"} mt={4} mr={1}>
        Feel free to sign up or login to use our services
      </Typography>
      <Button
        onClick={handleGetStarted}
        sx={{
          color: "orange",
          mt: 4,
          width: "10rem",
          fontSize: "1.5rem",
          background: "black",
          borderRadius: "1rem",
          border: "transparent",
          "&:hover": {
            background: "transparent",
            color: "black",
            border: "2px solid white",
            transition: "0.3s",
          },
        }}
        variant="outlined"
        size="large"
      >
        I`m in!
      </Button>
    </Box>
  );
};

export default ImportantMessage;
