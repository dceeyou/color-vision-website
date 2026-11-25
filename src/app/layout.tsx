import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "Color Vision — Design That Matters.",
  description:
    "Color Vision is an independent design studio based in Sri Lanka, helping ambitious businesses turn ideas into clear brands, digital products, and meaningful experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={interTight.variable}>
      <body className={`antialiased min-h-screen bg-[#08090D] text-[#F4F2ED] ${interTight.className}`}>
        <div className="noise-overlay" />
        <div className="tech-grid" />

        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
