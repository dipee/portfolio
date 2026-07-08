import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { getAsset } from "@/lib/assets";
import { siteConfig } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const photo = await getAsset("photo");
  const photoSrc = photo
    ? `${siteConfig.photoPath}?t=${photo.updatedAt.getTime()}`
    : null;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      siteConfig.name,
      "Full-Stack Developer",
      "Portfolio",
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "Django",
      "Spring Boot",
      "Python",
      "Docker",
      "AWS",
      "PostgreSQL",
    ],
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      type: "website",
    },
    ...(photoSrc ? { icons: { icon: photoSrc } } : {}),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
      </head>
      <body className="bg-surface text-on-surface font-body min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
