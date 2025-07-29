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
  title: "Sistem Persuratan Desa Sodong Basari",
  description:
    "Dikembangkan oleh TIM KKN PPM Universitas Gadjah Mada Periode 2 (Juni-Agustus) 2025",
  icons: {
    icon: [
      { url: "/logo-sodong.ico" },
      { url: "/logo-sodong.png", type: "image/png" },
    ],
    apple: [{ url: "/logo-sodong.png" }],
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
