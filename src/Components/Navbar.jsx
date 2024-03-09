import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { Fragment, useState } from "react";

const Navbar = ({ logo, navItems }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerToggle = () => setOpenDrawer((prev) => !prev);

  console.log(navItems);
  return (
    <>
      <AppBar position="sticky" color="primary" component={"nav"}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              mr: 2,
              display: { sm: "none" },
            }}
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            {logo}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }}>Login</Button>
            {navItems.map(({ text, route, callBack }, i) => (
              <Fragment key={`${text}-${i + 1}`}>
                {route ? (
                  <Button sx={{ color: "#fff" }} href={route}>
                    {text}
                  </Button>
                ) : (
                  <Button onClick={callBack} sx={{ color: "#fff" }}>
                    {text}
                  </Button>
                )}
              </Fragment>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        component={"nav"}
        container={document.body}
        variant="temporary"
        open={openDrawer}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: 220 },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            ShareThought
          </Typography>
          <Divider />
          <List>
            {navItems.map(({ text, route, callBack }, i) => (
              <ListItem key={`${text}-${i + 1}`} disablePadding>
                {route ? (
                  <ListItemButton href={route} sx={{ textAlign: "center" }}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                ) : (
                  <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={callBack}
                  >
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
