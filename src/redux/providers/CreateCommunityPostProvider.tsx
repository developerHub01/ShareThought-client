"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { ReactNode } from "react";

interface CreateCommunityPostProviderProps {
  children: ReactNode;
}

const CreateCommunityPostProvider = ({
  children,
}: CreateCommunityPostProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default CreateCommunityPostProvider;
