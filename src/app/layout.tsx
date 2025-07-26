import { ThemeProvider } from "@/app/_providers/theme.provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

const headerFont = localFont({
  src: "./../../public/fonts/header-font.woff2",
  variable: "--header-font",
  display: "swap",
});

const bodyFont = Nunito({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  variable: "--body-font",
})

export const metadata: Metadata = {
  title: "J&L",
  description: "Fotitos y recuerdos de nuestra vida",
  authors: [
    {
      name: "Joshua",
      url: "https://instagram.com/el_.joshua"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${headerFont.variable} ${bodyFont.variable} antialiased`}
      >
        <ThemeProvider
          defaultTheme="sytem"
          attribute="class"
          enableSystem
        >
          <TooltipProvider>
            <>
              {children}
              <Toaster
                richColors
                visibleToasts={10}
              />
            </>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
