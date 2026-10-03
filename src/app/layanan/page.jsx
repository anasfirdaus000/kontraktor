import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, MessageCircle, Hammer, Layers, ShieldCheck, Home, Compass, Paintbrush } from 'lucide-react';
import { getServices, getSettings } from '@/lib/db';

export const metadata = {
  title: 'Layanan Konstruksi & Renovasi - Mitra Bangun Mandiri',
  description: 'Daftar layanan jasa kontraktor bangun baru dan renovasi bangunan terpercaya dengan pengerjaan presisi dan transparansi RAB.',
};

export default function ServicesPage() {
  const services = getServices();
  const settings = getSettings();
  const whatsapp = settings?.whatsapp || '6282141486171';
  const waUrl = `https://wa.me/${whatsapp}?text=Halo%20Mitra%20Bangun%20Mandiri,%20saya%20ingin%20konsultasi%20layanan%20konstruksi/renovasi.`;

  const workSteps = [
    {
      step: '01',
      title: 'Konsultasi & Survey Lokasi',
      desc: 'Mendiskusikan kebutuhan ruang, menganalisis kondisi fisik eksisting di lokasi, serta mengukur dimensi lahan/bangunan.',
    },
    {
      step: '02',
      title: 'Perencanaan Denah & RAB Rinci',
      desc: 'Menyusun alternatif denah dan Rencana Anggaran Biaya (RAB) itemized yang memuat volume material dan ongkos kerja secara transparan.',
    },
    {
      step: '03',
      title: 'Kesepakatan & Jadwal Kerja',
      desc: 'Penandatanganan Surat Perjanjian Kerja (SPK) bersama jadwal kerja (timeline kurva S) yang disepakati kedua belah pihak.',
    },
    {
      step: '04',
      title: 'Pengerjaan & Pengawasan Berkala',
      desc: 'Pelaksanaan konstruksi oleh tukang berpengalaman dengan supervisi harian langsung dan laporan progres foto berkala kepada pemilik rumah.',
    },
    {
      step: '05',
      title: 'Serah Terima & Garansi Pemeliharaan',
      desc: 'Pemeriksaan bersama (checklist serah terima kunci) dan jaminan masa pemeliharaan untuk memastikan kepuasan pemilik hunian.',
    },
  ];

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-brand-navy py-16 sm:py-20 border-b-2 border-brand-accent text-white relative">
        <div className="section-container relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[3px] text-brand-accent mb-2 block">
            Cakupan Pekerjaan Kami
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Layanan Kontraktor & Renovasi
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Menyediakan solusi menyeluruh untuk pembangunan rumah baru, renovasi tata ruang, hingga perkuatan struktur hunian Anda.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id || index}
                className="bg-white rounded-[4px] overflow-hidden shadow-card border border-brand-border card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-brand-navy/90 text-white text-[11px] font-semibold uppercase px-2.5 py-1 rounded-[2px] backdrop-blur-sm">
                      Layanan {index + 1}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider block mb-1">
                        {service.subtitle}
                      </span>
                      <h3 className="text-xl font-bold text-brand-dark hover:text-brand-accent transition-colors">
                        <Link href={`/layanan/${service.slug}`}>{service.title}</Link>
                      </h3>
                    </div>

                    <p className="text-sm text-brand-body leading-relaxed">
                      {service.shortDesc}
                    </p>

                    {/* Scope Bullets */}
                    <div className="space-y-2 pt-2 border-t border-brand-border/60">
                      {service.scope.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-brand-dark font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/layanan/${service.slug}`}
                    className="btn-primary w-full py-2.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>Rincian Layanan & Lingkup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="py-16 sm:py-24 bg-brand-surface-alt border-t border-b border-brand-border">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-subtitle">Alur Pengerjaan</span>
            <h2 className="section-title">5 Tahapan Kerja Transparan</h2>
            <p className="text-sm sm:text-base text-brand-body mt-3">
              Proses kerja terstruktur dari awal konsultasi hingga serah terima kunci agar hasil sesuai harapan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {workSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-[4px] shadow-card border border-brand-border relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-black text-brand-accent/30 block mb-3 font-mono">
                    {step.step}
                  </span>
                  <h4 className="text-base font-bold text-brand-dark mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-brand-body leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-16 text-center">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3.5 text-xs uppercase tracking-wider inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Jadwalkan Survey & Konsultasi</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
