import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sohyun-portfolio.vercel.app"),
  title: "정소현 Portfolio | Frontend Developer",
  description: "3D 인터랙티브 포트폴리오 - 우주 공간을 탐험하며 저를 알아가세요",
  openGraph: {
    title: "정소현 Portfolio | Frontend Developer",
    description: "3D 인터랙티브 포트폴리오 - 우주 공간을 탐험하며 저를 알아가세요",
    images: [
      {
        url: "/images/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "정소현 Portfolio | Frontend Developer",
    description: "3D 인터랙티브 포트폴리오 - 우주 공간을 탐험하며 저를 알아가세요",
    images: ["/images/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
