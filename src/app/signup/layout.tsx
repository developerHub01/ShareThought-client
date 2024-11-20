import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign up | Share Thought",
  description: "Share Thought | signup for creating new account",
};

const SignUpLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <section>{children}</section>;
};

export default SignUpLayout;
