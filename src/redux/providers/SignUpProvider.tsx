"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { ReactNode } from "react";

interface SignUpProviderProps {
  children: ReactNode;
}

const SignUpProvider = ({ children }: SignUpProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default SignUpProvider;
