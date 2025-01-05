import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";

const karla = Karla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full Stack Inventory Management",
  description: "Full Stack Inventory Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
