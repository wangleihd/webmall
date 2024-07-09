import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

import "@/styles/globals.css";
import "@/styles/antd-overrides.css";

export const metadata: Metadata = {
  title: "FTAnails",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
			<GoogleAnalytics gaId="G-WNPBNMJSN8" />
      <body>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}
