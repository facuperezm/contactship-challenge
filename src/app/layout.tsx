import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ContactShip AI",
  description: "This is a frontend challenge for contactship.ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-dvh dark bg-gradient-to-br from-[#1E1E1E] to-[#2C2C2C] text-white antialiased",
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
