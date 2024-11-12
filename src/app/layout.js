'use client';

import localFont from "next/font/local";
import "./globals.css";
import NavbarComponent from "./components/NavbarComponent";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

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
      <head>
        <title>TexBot</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-60`}
      >
        <Toaster />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
