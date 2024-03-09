import React, { useState } from "react";
import Navbar from "./Navbar";
import LoginDialog from "../LoginDialog";

const navItems = [
  {
    text: "Home",
    route: "/",
  },
  {
    text: "About",
    route: "/about",
  },
  {
    text: "Contact",
    route: "/contact",
  },
];

const FullNavbarWithLoginDialog = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const toggleLoginDialog = () => {
    setOpenLoginDialog((prev) => !prev);
  };
  const fullNavItems = [
    ...navItems,
    {
      text: "Login",
      callBack: toggleLoginDialog,
    },
  ];
  return (
    <>
      <Navbar logo="ShareThought" navItems={fullNavItems} />
      <LoginDialog
        openLoginDialog={openLoginDialog}
        toggleLoginDialog={toggleLoginDialog}
      />
    </>
  );
};

export default FullNavbarWithLoginDialog;
