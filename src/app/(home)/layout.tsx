import {
  SidebarInset,
  SidebarProvider,
} from "@/components/sidebar/SidebarMain";
import Navbar from "@/components/navbar/Navbar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import type { Metadata } from "next";
import MainWrapper from "@/components/wrappers/MainWrapper";

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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <MainWrapper>{children}</MainWrapper>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
