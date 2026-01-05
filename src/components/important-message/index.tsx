import { Typography, Box } from "@mui/material";
import React from "react";

const ImportantMessage = () => {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} mt={10}>
      <Typography variant="h3">Please sign up or login!</Typography>
    </Box>
  );
};

export default ImportantMessage;
