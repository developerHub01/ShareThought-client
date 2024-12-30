"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { ReactNode } from "react";

interface CreateChannelProviderProps {
  children: ReactNode;
}

const CreateChannelProvider = ({ children }: CreateChannelProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default CreateChannelProvider;
