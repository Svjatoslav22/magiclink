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
  title: "ПриватБанк - Вхід до системи",
  description: "Безпечний вхід до особистого кабінету ПриватБанку",
  icons: {
    icon: [
      {
        url: "https://static.privatbank.ua/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "https://static.privatbank.ua/resources/logo/logo-32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: {
      url: "https://static.privatbank.ua/resources/logo/logo-180.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
