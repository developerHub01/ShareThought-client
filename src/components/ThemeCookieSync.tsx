"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useTheme } from "next-themes";

const ThemeCookieSync = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    Cookies.set("theme", resolvedTheme);
  }, [resolvedTheme]);

  return null;
};

export default ThemeCookieSync;
