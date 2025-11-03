import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sozorock - Rural Health Impact",
  description: "From Insight to Impact in Rural Health - Empowering communities through health research and programs",
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
