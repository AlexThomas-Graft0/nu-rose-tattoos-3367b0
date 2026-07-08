import { CookieBanner } from "@/components/CookieBanner";
import { Roboto, Poppins, Inconsolata } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

const inconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inconsolata',
});

export const metadata = {
  title: 'Nu Rose Tattoos',
  description: 'Tattoo & piercing studio — custom tattoos all styles, body/ear/nose piercing, tattoo removal.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable} ${inconsolata.variable} bg-surface text-text font-sans antialiased min-h-screen`}>
        {children}
              <CookieBanner />
      </body>
    </html>
  );
}