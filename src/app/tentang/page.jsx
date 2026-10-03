import React from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageCircle, ShieldCheck, Hammer, Users, Award, FileText } from 'lucide-react';
import { getSettings } from '@/lib/db';

export const metadata = {
  title: 'Tentang Kontraktor - Mitra Bangun Mandiri',
  description: 'Profil kontraktor independen profesional untuk bangun rumah baru dan renovasi hunian di Jabodetabek.',
};

export default function AboutPage() {
  const settings = getSettings();
  const businessName = settings?.businessName || 'Mitra Bangun Mandiri';
  const whatsapp = settings?.whatsapp || '6282141486171';
  const waUrl = `https://wa.me/${whatsapp}?text=Halo%20${encodeURIComponent(businessName)},%20saya%20ingin%20berkenalan%20dan%20konsultasi%20proyek%20renovasi.`;

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-brand-navy py-16 sm:py-20 border-b-2 border-brand-accent text-white relative">
        <div className="section-container relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[3px] text-brand-accent mb-2 block">
            Mengenal Lebih Dekat
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Tentang Kami
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Dedikasi membangun dan merenovasi hunian idaman dengan prinsip kejujuran, transparansi biaya, dan pengerjaan rapi.
          </p>
        </div>
      </section>

      {/* Main Narrative & Visuals */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Overlapping (matching reference) */}
            <div className="lg:col-span-6 relative pb-10 sm:pb-12">
              <div className="relative rounded-[6px] overflow-hidden shadow-lg border border-brand-border max-w-[85%]">
                <img
                  src="/images/desain/intro.jpg"
                  alt="Tentang Kontraktor"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              <div className="absolute right-0 bottom-0 w-[55%] rounded-[6px] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/desain/detail2.jpg"
                  alt="Pengawasan Lapangan"
                  className="w-full h-52 sm:h-64 object-cover"
                />
              </div>

              <div className="absolute top-6 right-8 bg-brand-accent text-white px-5 py-3 rounded-[4px] shadow-lg">
                <span className="block text-xs uppercase tracking-widest font-medium text-white/80">Karakter</span>
                <span className="block text-lg font-bold">Terpercaya</span>
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="section-subtitle">Profil Usaha</span>
                <h2 className="section-title">{businessName}</h2>
              </div>

              <p className="text-base text-brand-body leading-relaxed">
                {settings?.aboutShort ||
                  'Mitra Bangun Mandiri adalah jasa kontraktor perorangan profesional yang fokus pada pembangunan dan renovasi hunian dengan pendekatan yang rapi, transparan, dan bertanggung jawab.'}
              </p>

              <p className="text-sm text-brand-body leading-relaxed">
                {settings?.aboutLong ||
                  'Berawal dari pengalaman lapangan bertahun-tahun dalam konstruksi hunian pribadi, kami hadir memberikan alternatif kontraktor yang komunikatif dan terpercaya. Kami memahami bahwa rumah adalah aset dan tempat tinggal berharga bagi setiap keluarga. Oleh karena itu, setiap proyek kami tangani dengan pengawasan langsung, penggunaan material sesuai spesifikasi, dan laporan progres berkala kepada pemilik rumah.'}
              </p>

              <div className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-3.5 text-xs uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Hubungi Kami via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars of Work */}
      <section className="py-16 sm:py-24 bg-brand-surface-alt border-t border-b border-brand-border">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-subtitle">Prinsip Kerja Kami</span>
            <h2 className="section-title">Nilai & Komitmen Kami</h2>
            <p className="text-sm sm:text-base text-brand-body mt-3">
              Fondasi integritas yang kami pegang teguh di setiap proyek pembangunan dan renovasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FileText,
                title: 'Transparansi RAB',
                desc: 'Rincian volume, material, dan harga dipaparkan secara terbuka tanpa biaya tersembunyi.',
              },
              {
                icon: Users,
                title: 'Komunikasi Terbuka',
                desc: 'Diskusi langsung dengan kontraktor tanpa birokrasi, cepat merespons revisi dan masukan.',
              },
              {
                icon: Hammer,
                title: 'Pengerjaan Presisi',
                desc: 'Tukang berpengalaman dengan kontrol kualitas harian agar kerapian pengerjaan terjaga.',
              },
              {
                icon: ShieldCheck,
                title: 'Garansi Pasca Serah Terima',
                desc: 'Masa pemeliharaan untuk memastikan tidak ada keluhan kebocoran atau masalah struktur.',
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-[4px] shadow-card border border-brand-border card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-[4px] bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-brand-dark mb-2">{pillar.title}</h4>
                    <p className="text-xs text-brand-body leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
