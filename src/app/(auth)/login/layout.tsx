import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Log in | Share Thought",
  description: "Share Thought | login for creating new account",
};

const LoginUpLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <>{children}</>;
};

export default LoginUpLayout;
