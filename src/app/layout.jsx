import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getSettings } from '@/lib/db';

export const metadata = {
  title: 'Mitra Bangun Mandiri - Jasa Kontraktor & Renovasi Bangunan',
  description: 'Jasa kontraktor bangun rumah baru dan renovasi bangunan terpercaya di Jabodetabek. Transparansi RAB, pengerjaan rapi, dan pengawasan langsung.',
};

export default function RootLayout({ children }) {
  const settings = getSettings();

  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-white text-brand-body font-sans antialiased selection:bg-brand-accent selection:text-white">
        <Navbar settings={settings} />
        <main className="flex-grow">{children}</main>
        <Footer settings={settings} />
        <FloatingWhatsApp settings={settings} />
      </body>
    </html>
  );
}
