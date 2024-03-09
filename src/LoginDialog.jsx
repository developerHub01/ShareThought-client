import { Facebook, Google } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import React from "react";

const buttonStyle = {
  width: "100%",
  maxWidth: 200,
};

const LoginDialog = ({ openLoginDialog, toggleLoginDialog }) => {
  return (
    <Dialog
      open={openLoginDialog}
      onClose={toggleLoginDialog}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle textAlign={"center"} gutterBottom fontWeight={"bold"}>
        You need to login or create account
      </DialogTitle>
      <DialogContent py={1}>
        <Stack gap={2} justifyContent={"Center"} alignItems={"center"}>
          <Button variant="contained" sx={{ ...buttonStyle }}>
            Sign Up
          </Button>
          <Button variant="contained" sx={{ ...buttonStyle }}>
            Login
          </Button>
          <Button
            color="error"
            variant="contained"
            endIcon={<Google />}
            sx={{ ...buttonStyle }}
          >
            Login With
          </Button>
          <Button
            color="primary"
            variant="contained"
            endIcon={<Facebook />}
            sx={{ ...buttonStyle }}
          >
            Login With
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
