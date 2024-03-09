import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      minHeight={"100vh"}
    >
      <Typography variant="h1" fontWeight={"bold"} textAlign={"center"}>
        404
      </Typography>
      <Link to="/">
        <Button variant="contained">Move to home page</Button>
      </Link>
    </Box>
  );
};

export default ErrorPage;
