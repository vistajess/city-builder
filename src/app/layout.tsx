import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { HouseContextProvider } from "../contexts/house-context";
import "../styles/globals.css";
import Providers from "./providers";

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
          <Providers>{children}</Providers>
        </HouseContextProvider>
      </body>
    </html>
  );
}
