import {
  SidebarInset,
  SidebarProvider,
} from "@/components/sidebar/SidebarMain";
import Navbar from "@/components/navbar/Navbar";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <main className="w-full h-full p-2 md:p-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
