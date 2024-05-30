"use client";
import Navbar from "@/app/components/Navbar";
import LandingPage from "@/app/components/LandingPage";
import { ThemeProvider } from "@emotion/react";
import theme from "@/materialUI/theme";
export default function Home() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <LandingPage />
      </ThemeProvider>
    </>
  );
}
