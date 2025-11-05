import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The SozoRock Foundation — Advancing Equity, Systems, and Resilience",
  description: "The SozoRock® Foundation is a New York–based nonprofit that advances health equity, education access, and systems resilience through community programs, policy research, and digital innovation.",
   icons: {
    icon: "/favicon.png", // /favicon.ico is the path to the file in the public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
          <div className="min-h-screen">
              <Header />
              {children}
          </div>
      </body>
    </html>
  );
}
