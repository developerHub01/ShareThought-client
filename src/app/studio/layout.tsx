import {
  SidebarInset,
  SidebarProvider,
} from "@/components/sidebar/SidebarMain";
import StudioNavbar from "@/components/navbar/StudioNavbar";
import { StudioSidebar } from "@/components/sidebar/StudioSidebar";
import type { Metadata } from "next";
import MainWrapper from "@/components/wrappers/MainWrapper";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Studio | Share Thought",
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
      <StudioSidebar />
      <SidebarInset>
        <StudioNavbar />
        {login}
        <MainWrapper>{children}</MainWrapper>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
