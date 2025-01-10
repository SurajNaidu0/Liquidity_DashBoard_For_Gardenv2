import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Liquidity Dashboard",
  description:
    "DashBoard to track the liquidity across all chain in garden v2 beta version",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased px-4 sm:p-8 max-w-[90rem] mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
