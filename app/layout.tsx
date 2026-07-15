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
  metadataBase: new URL("https://portfolio-jsh-xi.vercel.app"),
  title: "정소현 Portfolio | Frontend Developer",
  description: "복잡한 사용자 흐름을 정리하고 반복되는 문제를 시스템으로 바꾸는 프론트엔드 개발자 정소현의 포트폴리오",
  openGraph: {
    title: "정소현 Portfolio | Frontend Developer",
    description: "사용자 경험과 팀의 생산성을 함께 개선하는 프론트엔드 개발자 정소현의 포트폴리오",
    url: "https://portfolio-jsh-xi.vercel.app",
    siteName: "정소현 Frontend Portfolio",
    images: [
      {
        url: "/images/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "정소현 Frontend Developer Portfolio",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "정소현 Portfolio | Frontend Developer",
    description: "사용자 경험과 팀의 생산성을 함께 개선하는 프론트엔드 개발자 정소현의 포트폴리오",
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
