'use client'
import localFont from "next/font/local";
import "./globals.css";
import NavbarComponent from "./components/NavbarComponent";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
// import AuthProvider from "./components/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-60`}
      >
        <Toaster />
        <hr />
        {/* <AuthProvider> */}
        <SessionProvider>{children}</SessionProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
