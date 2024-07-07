import type { Metadata } from "next";
import { GoogleTagManager } from '@next/third-parties/google'
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

import "@/styles/globals.css";
import "@/styles/antd-overrides.css";

export const metadata: Metadata = {
  title: "Ftanails",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
			<GoogleTagManager gtmId="G-WNPBNMJSN8" />
      <body>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}
