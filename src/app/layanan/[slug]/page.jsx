import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, MessageCircle, ArrowLeft, ArrowRight, ShieldCheck, Hammer } from 'lucide-react';
import { getServices, getSettings } from '@/lib/db';

export async function generateMetadata({ params }) {
  const services = getServices();
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Layanan Tidak Ditemukan' };

  return {
    title: `${service.title} - Layanan Mitra Bangun Mandiri`,
    description: service.shortDesc,
  };
}

export default function ServiceDetailPage({ params }) {
  const services = getServices();
  const settings = getSettings();
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const otherServices = services.filter((s) => s.slug !== service.slug);
  const whatsapp = settings?.whatsapp || '6282141486171';
  const businessName = settings?.businessName || 'Mitra Bangun Mandiri';
  const waUrl = `https://wa.me/${whatsapp}?text=Halo%20${encodeURIComponent(businessName)},%20saya%20ingin%20konsultasi%20mengenai%20layanan%20${encodeURIComponent(service.title)}.`;

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-brand-navy py-14 sm:py-20 border-b-2 border-brand-accent text-white relative">
        <div className="section-container relative z-10">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Semua Layanan</span>
          </Link>

          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[2px] text-brand-accent mb-2 block">
              {service.subtitle}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {service.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
              {service.shortDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Main Details Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-10">
              {/* Featured Image */}
              <div className="rounded-[4px] overflow-hidden shadow-lg border border-brand-border bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full max-h-[460px] object-cover"
                />
              </div>

              {/* Scope of Work */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark mb-4">
                    Lingkup Pekerjaan yang Ditangani
                  </h2>
                  <p className="text-sm sm:text-base text-brand-body leading-relaxed">
                    Kami mengerjakan pos pekerjaan ini dengan standar tukang terlatih dan spesifikasi material yang disepakati secara terbuka dalam kontrak.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {service.scope.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-[4px] border border-brand-border bg-brand-surface flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-brand-dark">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality & Commitment */}
              <div className="p-8 bg-brand-surface-alt rounded-[4px] border border-brand-border space-y-4">
                <div className="flex items-center gap-3 text-brand-dark font-bold text-lg">
                  <ShieldCheck className="w-6 h-6 text-brand-accent" />
                  <span>Jaminan Kualitas & Pengawasan Langsung</span>
                </div>
                <p className="text-sm text-brand-body leading-relaxed">
                  Kami tidak melempar pekerjaan ke pihak sub-kontraktor lain tanpa pengawasan. Penanggung jawab teknis kami rutin memantau setiap tahapan konstruksi, memeriksa leveling, campuran plesteran, dan pembesian sesuai best practice bangunan ramah gempa dan tahan lama.
                </p>
              </div>
            </div>

            {/* Right Sticky Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* Consultation Card */}
              <div className="bg-brand-surface-alt p-6 sm:p-8 rounded-[4px] border border-brand-border space-y-5 sticky top-28">
                <div className="w-12 h-12 rounded-[4px] bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  <Hammer className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-dark">
                    Butuh Layanan {service.title}?
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-body mt-2 leading-relaxed">
                    Sampaikan kebutuhan spesifik rumah Anda kepada kami untuk estimasi biaya dan konsultasi awal tanpa komitmen.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full py-3.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Konsultasi WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Other Services Navigation */}
              <div className="p-6 bg-white rounded-[4px] border border-brand-border space-y-4">
                <h4 className="text-base font-bold text-brand-dark pb-2 border-b border-brand-border">
                  Layanan Lainnya
                </h4>
                <div className="space-y-2">
                  {otherServices.map((other) => (
                    <Link
                      key={other.id}
                      href={`/layanan/${other.slug}`}
                      className="text-xs font-semibold text-brand-body hover:text-brand-accent flex items-center justify-between p-2 rounded hover:bg-slate-50 transition-colors"
                    >
                      <span>{other.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-accent" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
