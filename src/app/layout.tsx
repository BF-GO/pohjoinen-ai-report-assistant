import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pohjoinen Marketing Report Assistant",
  description:
    "A working prototype that turns mock monthly marketing metrics into a management-ready AI report draft.",
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
