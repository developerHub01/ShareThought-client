import React from "react";
import Navbar from "@/app/(editor)/studio/_components/Navbar";

interface StudioEditorLayoutProps {
  children: React.ReactNode;
}
const StudioEditorLayout = ({ children }: StudioEditorLayoutProps) => {
  return (
    <section className="h-screen overflow-hidden flex flex-col">
      <Navbar />
      {children}
    </section>
  );
};

export default StudioEditorLayout;
