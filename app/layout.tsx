import { cn } from "@/lib/utils/general/shadcn";
import { ThemeProvider } from "@/providers/theme-provider";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

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
            <body className={cn("min-h-full flex flex-col", GeistSans.className)}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <NextTopLoader height={4} showSpinner={false} />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
