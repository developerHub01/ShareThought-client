import React from "react";
import { Outlet } from "react-router-dom";
import FullNavbarWithLoginDialog from "./Components/FullNavbarWithLoginDialog";
const App = () => {
  return (
    <>
      <FullNavbarWithLoginDialog />
      <Outlet />
    </>
  );
};

export default App;
