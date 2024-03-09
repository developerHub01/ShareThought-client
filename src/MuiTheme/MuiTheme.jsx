import { createTheme } from "@mui/material";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

const LinkBehaviour = forwardRef((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour,
      },
    },
  },
});
export default theme;
