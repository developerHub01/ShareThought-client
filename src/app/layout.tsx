import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeCookieSync from "@/components/ThemeCookieSync";

const openSans = Open_Sans({
  variable: "--font-open_sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["italic", "normal"],
  subsets: ["latin", "greek"],
});

export const metadata: Metadata = {
  title: "Share Thought",
  description:
    "Learn and share your knowledge to all. Learning should be fun and free",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} antialiased overflow-x-hidden font-[--font-open_sans] min-h-screen`}
        style={{
          fontFamily: "var(--font-open_sans)",
        }}
      >
        <ThemeProvider
          attribute="class"
          // defaultTheme="system"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <>
            <ThemeCookieSync />
            {children}
            <Toaster />
          </>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
