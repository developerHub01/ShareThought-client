import { createTheme } from "@mui/material";
import { ThemeColors } from "../constants/ThemeColors";

const { primary } = ThemeColors;

export const theme = createTheme({
  palette: {
    primary: {
      main: "#001524",
      ...primary,
    },
  },
  typography: {
    h1: {
      fontSize: "42px",
      fontWeight: 700,
    },
    h2: {
      fontSize: "35px",
      fontWeight: 500,
    },
    h3: {
      fontSize: "25px",
      fontWeight: 400,
    },
    h4: {
      fontSize: "20px",
    },
  },
});
