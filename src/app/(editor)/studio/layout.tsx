import React from "react";
import Navbar from "@/app/(editor)/studio/_components/Navbar";

interface StudioEditorLayoutProps {
  children: React.ReactNode;
}
const StudioEditorLayout = ({ children }: StudioEditorLayoutProps) => {
  return <>{children}</>;
};

export default StudioEditorLayout;
