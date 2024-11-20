import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SH | Setting",
  description: "ShareThought account Settings",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default RootLayout;
