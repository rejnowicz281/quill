import { cn } from "@/lib/utils/general/shadcn";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "quill"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className="h-full" lang="en">
            <body className={cn("min-h-full flex flex-col", inter.className)}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <NextTopLoader height={4} showSpinner={false} />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
