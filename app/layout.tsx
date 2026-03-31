import type { ReactNode } from "react";
import { Baloo_2, Nunito } from "next/font/google";
import { Providers } from "@/app/providers";
import "./globals.css";

const headingFont = Baloo_2({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"]
});

const bodyFont = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* BASE_APP_ID_PLACEHOLDER */}
        <meta name="base:app_id" content="69cb42d3bc8b6d58d5a97447" />
        {/* TALENT_VERIFICATION_PLACEHOLDER */}
        <meta
          name="talentapp:project_verification"
          content="e2897facf2bc54903763e71ec86252bcd1d52e26c1416f1e6d0653af2437273d10d8eecc322429dfe8e4420d767d45f5872b7157ed828349a50dec2972c6f5cf"
        />
        <title>BaseLuckyWheel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
