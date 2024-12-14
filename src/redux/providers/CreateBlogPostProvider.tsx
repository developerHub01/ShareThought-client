"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { ReactNode } from "react";

interface SignUpProviderProps {
  children: ReactNode;
}

const CreateBlogPostProvider = ({ children }: SignUpProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default CreateBlogPostProvider;
