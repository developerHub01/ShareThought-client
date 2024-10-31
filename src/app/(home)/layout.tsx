import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Thought",
  description:
    "Share Thought | a knowledge sharing platform for developers and knowledge seekers",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <h1>Header from main route</h1>
      {children}
    </>
  );
};

export default RootLayout;
