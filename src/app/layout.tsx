import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New, Ms_Madi, Train_One } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const trainOne = Train_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-train-one",
  display: "swap",
});

const msMadi = Ms_Madi({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ms-madi",
  display: "swap",
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen-kaku",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "エヒメノタネ",
    template: "%s | エヒメノタネ",
  },
  description:
    "愛媛の食・人・暮らし・自然をひろい、あなたの心に小さな種を届けるオウンドメディア。",
  metadataBase: new URL("https://himetane.com"),
  openGraph: {
    siteName: "エヒメノタネ",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${zenKakuGothicNew.variable} ${msMadi.variable} ${trainOne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-zen-kaku)] bg-white text-stone-800">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
