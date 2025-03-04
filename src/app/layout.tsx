import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import MainHeader from "@/src/components/layout/main-header/main-header";
import Providers from "./providers";
import { HouseContextProvider } from "../contexts/house-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "City Builder",
  description: "City builder that dynamically constructs houses based on input data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HouseContextProvider>
          <MainHeader />
          <Providers>{children}</Providers>
        </HouseContextProvider>
      </body>
    </html>
  );
}
