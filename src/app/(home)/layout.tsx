import {
  SidebarInset,
  SidebarProvider,
} from "@/components/sidebar/SidebarMain";
import Navbar from "@/components/navbar/Navbar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import type { Metadata } from "next";
import MainWrapper from "@/components/wrappers/MainWrapper";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Share Thought",
  description:
    "Share Thought | a knowledge sharing platform for developers and knowledge seekers",
};

const RootLayout = ({
  login,
  children,
}: Readonly<{
  login: ReactNode;
  children: ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        {login}
        <MainWrapper>{children}</MainWrapper>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
