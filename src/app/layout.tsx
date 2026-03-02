import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import MainProviders from "@/Providers/MainProviders";
import Provider from "@/Providers/Provider";
import { Toaster } from "sonner";
import Header from "@/features/sample-feature/header/Header";
import Sidebar from "@/features/sidebar/Sidebar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "sktch Labs",
  description:
    "Design amazing digital experiences that create more happy in the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <MainProviders>
          <Provider>
            <Header />
            <div className="pt-16 md:pl-64">
              <Sidebar />
              {children}
            </div>
          </Provider>
        </MainProviders>
        <Toaster position="top-right" closeButton />
      </body>
    </html>
  );
}
