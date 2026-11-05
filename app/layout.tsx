import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MenuFi | لوحة التحكم",
  description: "إدارة مطعمك بكل سهولة",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#F3F4F6] dark:bg-[#121010] text-gray-900 dark:text-gray-100 font-sans">
        {children}
      </body>
    </html>
  );
}
