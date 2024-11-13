import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
        <main className="w-full h-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
