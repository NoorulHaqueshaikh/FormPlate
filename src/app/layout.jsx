import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


export const metadata = {
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default: "FormPlate: Ready-to-Use Online Form Templates | Collect Submissions Instantly",
    template: "%s | FormPlate",
  },

  description:
    "Create structured online forms instantly. Generate a shareable link and collect organized submissions in your dashboard — no form building required.",

  openGraph: {
    title: "FormPlate — Structured Form Collection Platform",
    description:
      "Use ready-made form workflows to collect consistent data without designing forms.",
    url: "https://yourdomain.com",
    siteName: "FormPlate",
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
