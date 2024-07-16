import {
  Box,
  Button,
  Stack,
  FormControl,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import { ThemeColors } from "../constants/ThemeColors";
import { ChangeEvent, FormEvent, useState } from "react";

interface IFormValues {
  userName: string;
  fullName: string;
  email: string;
  password: string;
}

const signUpInputElements = [
  {
    id: "fullName",
    name: "fullName",
    label: "Full name",
  },
  {
    id: "userName",
    name: "userName",
    label: "UserName",
  },
  {
    id: "email",
    name: "email",
    label: "Email",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
  },
];

const loginInputElements = [
  {
    id: "email",
    name: "email",
    label: "Email",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
  },
];

const AuthPage = () => {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);
  const [formData, setFormData] = useState<IFormValues>({
    userName: "",
    fullName: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeForm = () => setIsLoginPage((prev) => !prev);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: ThemeColors.BACKGROUND,
        p: 1.5,
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 350,
          width: "100%",
          gap: 2.5,
          p: 2,
        }}
      >
        <Typography
          variant="h1"
          fontSize={35}
          textAlign={"center"}
          fontWeight={"bold"}
          color="primary"
        >
          {isLoginPage ? "Login" : "Signup"}
        </Typography>
        <FormControl
          onSubmit={handleSubmit}
          component={"form"}
          sx={{
            width: "100%",
            display: "flex",
            direction: "row",
            gap: 1.5,
          }}
        >
          {(isLoginPage ? loginInputElements : signUpInputElements).map(
            ({ id, name, label }) => (
              <TextField
                fullWidth
                key={id}
                id={id}
                name={name}
                placeholder={label}
                value={formData[name as keyof IFormValues]}
                variant="outlined"
                size="medium"
                onChange={handleInputOnChange}
              />
            )
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              mt: 1.5,
            }}
          >
            {isLoginPage ? "Login" : "Signup"}
          </Button>
        </FormControl>
        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={2}
          flexWrap={"wrap"}
        >
          <Typography variant="body1" color="primary">
            {isLoginPage ? "I don't have account" : "I already have account"}
          </Typography>
          <Button variant="text" onClick={handleChangeForm}>
            {isLoginPage ? "Signup" : "Login"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AuthPage;
