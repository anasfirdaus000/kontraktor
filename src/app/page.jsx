import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Hammer,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  Home,
  Layers,
  Compass,
  Paintbrush,
  Calendar,
  MapPin,
  Star
} from 'lucide-react';
import {
  getSettings,
  getServices,
  getPortfolio,
  getBlog,
  getTestimonials
} from '@/lib/db';
import HeroSlideshow from '@/components/HeroSlideshow';

export default function HomePage() {
  const settings = getSettings();
  const services = getServices();
  const portfolio = getPortfolio();
  const blog = getBlog();
  const testimonials = getTestimonials();

  const businessName = settings?.businessName || 'Mitra Bangun Mandiri';
  const whatsapp = settings?.whatsapp || '6282141486171';
  const waUrl = `https://wa.me/${whatsapp}?text=Halo%20${encodeURIComponent(businessName)},%20saya%20ingin%20konsultasi%20mengenai%20proyek%20bangun/renovasi.`;

  return (
    <div className="w-full">
      {/* 1. FULL-WIDTH HERO SLIDESHOW WITH KEN BURNS ZOOM IN & OUT */}
      <HeroSlideshow settings={settings} />

      {/* 2. THREE HIGHLIGHT FEATURES ROW (Floating Overlap matching reference) */}
      <section className="relative -mt-10 sm:-mt-12 z-20">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1 */}
            <div className="bg-white p-7 rounded-[4px] shadow-card border border-brand-border/80 card-hover flex flex-col justify-between">
              <div className="w-12 h-12 rounded-[4px] bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-4">
                <Hammer className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-lg font-bold text-brand-dark mb-2">Pengerjaan Terarah</h5>
                <p className="text-sm text-brand-body leading-relaxed">
                  Setiap tahapan kerja dipandu oleh gambar denah dan susunan jadwal kerja yang jelas sehingga progres selalu terukur.
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-7 rounded-[4px] shadow-card border border-brand-border/80 card-hover flex flex-col justify-between">
              <div className="w-12 h-12 rounded-[4px] bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-lg font-bold text-brand-dark mb-2">Komunikasi Langsung</h5>
                <p className="text-sm text-brand-body leading-relaxed">
                  Konsultasi dan koordinasi dilakukan langsung dengan penanggung jawab konstruksi, tanpa perantara yang memperlambat respon.
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-7 rounded-[4px] shadow-card border border-brand-border/80 card-hover flex flex-col justify-between">
              <div className="w-12 h-12 rounded-[4px] bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-lg font-bold text-brand-dark mb-2">Perhatian pada Detail</h5>
                <p className="text-sm text-brand-body leading-relaxed">
                  Mulai dari kelurusan dinding, kerapian nat keramik/granit, hingga kerapian pemipaan dikerjakan dengan standar presisi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT / PROFIL SECTION matching reference layout (overlapping images + text) */}
      <section className="py-20 md:py-28 bg-white" id="profil">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Overlapping Images matching reference */}
            <div className="lg:col-span-6 relative pb-10 sm:pb-12">
              <div className="relative rounded-[6px] overflow-hidden shadow-lg border border-brand-border max-w-[85%]">
                <img
                  src="/images/desain/intro.jpg"
                  alt="Tentang Kontraktor"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute right-0 bottom-0 w-[55%] rounded-[6px] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/desain/detail2.jpg"
                  alt="Pengerjaan Lapangan"
                  className="w-full h-52 sm:h-64 object-cover"
                />
              </div>

              {/* "Berpengalaman" Badge matching reference */}
              <div className="absolute top-6 right-8 sm:right-16 bg-brand-accent text-white px-5 py-3 rounded-[4px] shadow-lg">
                <span className="block text-xs uppercase tracking-widest font-medium text-white/80">Karakter</span>
                <span className="block text-lg font-bold">Terpercaya</span>
              </div>
            </div>

            {/* Right: Text and Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="section-subtitle">Tentang Kami</span>
                <h2 className="section-title">
                  {businessName}
                </h2>
              </div>

              <p className="text-brand-body leading-relaxed">
                {settings?.aboutShort ||
                  'Mitra Bangun Mandiri adalah jasa kontraktor perorangan profesional yang fokus pada pembangunan dan renovasi hunian dengan pendekatan yang rapi, transparan, dan bertanggung jawab.'}
              </p>

              <p className="text-brand-body leading-relaxed text-sm">
                Kami memahami bahwa merenovasi atau membangun rumah adalah investasi besar bagi keluarga. Dengan pengalaman praktis bertahun-tahun di bidang konstruksi hunian, kami hadir dengan prinsip kerja yang jujur, keterbukaan rincian material, dan komitmen penyelesaian pekerjaan sampai tuntas.
              </p>

              {/* Value Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  'Rencana Anggaran Biaya (RAB) Rinci',
                  'Pengawasan Harian Lapangan',
                  'Material Sesuai Kesepakatan',
                  'Konsultasi Denah & Desain',
                  'Garansi Pemeliharaan Pasca Selesai',
                  'Tenaga Tukang Terampil & Rapi',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm font-medium text-brand-dark">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/tentang"
                  className="btn-primary px-7 py-3 text-xs uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <span>Selengkapnya Tentang Kami</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION matching reference layout */}
      <section className="py-20 md:py-28 bg-brand-surface-alt border-t border-b border-brand-border" id="layanan">
        <div className="section-container">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-subtitle">Layanan Kami</span>
            <h2 className="section-title">Simak Daftar Layanan Kami</h2>
            <p className="text-brand-body text-sm sm:text-base mt-3">
              Solusi komprehensif untuk pembangunan hunian baru dan renovasi bangunan dengan standar kualitas terbaik.
            </p>
          </div>

          {/* Service Cards Grid (6 cards matching reference) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id || index}
                className="bg-white rounded-[4px] overflow-hidden shadow-card border border-brand-border/70 card-hover flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-brand-navy/80 text-white text-[11px] font-semibold uppercase px-2.5 py-1 rounded-[2px] backdrop-blur-sm">
                    Layanan {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-brand-dark mb-2 hover:text-brand-accent transition-colors">
                      <Link href={`/layanan/${service.slug}`}>{service.title}</Link>
                    </h3>
                    <p className="text-sm text-brand-body leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="pt-2 border-t border-brand-border/50">
                    <Link
                      href={`/layanan/${service.slug}`}
                      className="text-xs font-bold uppercase tracking-wider text-brand-accent hover:text-brand-accent-hover inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Center Button */}
          <div className="text-center mt-12">
            <Link
              href="/layanan"
              className="btn-primary px-8 py-3.5 text-xs uppercase tracking-wider inline-flex items-center gap-2"
            >
              <span>Lihat Semua Detail Layanan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PORTFOLIO / GALLERY SECTION matching reference layout */}
      <section className="py-20 md:py-28 bg-white" id="galeri">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="section-subtitle">Dokumentasi Proyek</span>
              <h2 className="section-title">Galeri Portofolio</h2>
            </div>
            <Link
              href="/portofolio"
              className="text-sm font-bold text-brand-accent hover:text-brand-accent-hover inline-flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>Lihat Semua Proyek</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid of Projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="group relative rounded-[4px] overflow-hidden shadow-card border border-brand-border bg-slate-100 h-72 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/60 to-transparent opacity-85 group-hover:opacity-95 transition-opacity p-6 flex flex-col justify-end text-white">
                  <div className="text-xs uppercase tracking-wider text-brand-accent font-semibold mb-1">
                    {item.category}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                      {item.location}
                    </span>
                    <span>•</span>
                    <span>{item.year}</span>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/20 flex items-center justify-between">
                    <Link
                      href={`/portofolio/${item.slug}`}
                      className="text-xs font-semibold uppercase tracking-wider text-white hover:text-brand-accent inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Lihat Rincian Proyek</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER (Navy Dark matching reference id: a47e96c) */}
      <section className="py-16 md:py-20 bg-brand-navy text-white relative overflow-hidden border-t-2 border-brand-accent">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(66,34,220,0.25),transparent_60%)] pointer-events-none" />

        <div className="section-container relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <span className="text-xs sm:text-sm uppercase tracking-[3px] font-bold text-brand-accent block">
            Konsultasi Sekarang
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
            TUNGGU APA LAGI?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Segera konsultasikan rencana pembangunan atau renovasi rumah Anda. Kami siap membantu membuat perkiraan anggaran (RAB) dan perencanaan yang transparan.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-3.5 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Konsultasi via WhatsApp</span>
            </a>
            <Link
              href="/kontak"
              className="btn-outline-white px-8 py-3.5 text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>Hubungi Kami</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION matching reference id: ff14abc */}
      <section className="py-20 md:py-28 bg-brand-surface-alt border-b border-brand-border">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Header */}
            <div className="lg:col-span-4 space-y-4">
              <span className="section-subtitle">Pengalaman Klien</span>
              <h2 className="section-title">Testimoni</h2>
              <p className="text-sm text-brand-body leading-relaxed">
                Simak pengalaman nyata dari pemilik hunian yang telah mempercayakan proyek pembangunan dan renovasi kepada kami.
              </p>
              <div className="pt-2">
                <Link
                  href="/kontak"
                  className="btn-primary px-6 py-2.5 text-xs uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <span>Kontak Kami</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Testimonial Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testi) => (
                <div
                  key={testi.id}
                  className="bg-white p-6 rounded-[4px] shadow-card border border-brand-border flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(testi.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="text-xs sm:text-sm text-brand-body italic leading-relaxed">
                      "{testi.text}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="pt-4 mt-4 border-t border-brand-border/60 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent font-bold text-xs shrink-0">
                      {testi.name.charAt(0)}
                    </div>
                    <div>
                      <h6 className="text-xs font-bold text-brand-dark leading-tight">{testi.name}</h6>
                      <span className="text-[11px] text-brand-muted">{testi.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. BLOG / ARTICLES SECTION matching reference id: 2e84fc9 */}
      <section className="py-20 md:py-28 bg-white" id="artikel">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-subtitle">Artikel Kami</span>
            <h2 className="section-title">Informasi & Artikel Terbaru</h2>
            <p className="text-brand-body text-sm sm:text-base mt-3">
              Kumpulan tips seputar perencanaan anggaran, pemilihan material bangunan, dan panduan renovasi rumah.
            </p>
          </div>

          {/* 3 Articles Grid matching reference */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blog.slice(0, 3).map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-[4px] overflow-hidden shadow-card border border-brand-border card-hover flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-3 bg-white/90 text-brand-dark text-[11px] font-semibold px-2.5 py-1 rounded-[2px] shadow-sm backdrop-blur-sm">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs text-brand-muted mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                      <span>{article.date}</span>
                    </div>
                    <h4 className="text-base font-bold text-brand-dark leading-snug hover:text-brand-accent transition-colors">
                      <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                    </h4>
                    <p className="text-xs sm:text-sm text-brand-body leading-relaxed line-clamp-3 mt-2">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-brand-border/60">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="text-xs font-bold uppercase tracking-wider text-brand-accent hover:text-brand-accent-hover inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="btn-primary px-8 py-3.5 text-xs uppercase tracking-wider inline-flex items-center gap-2"
            >
              <span>Lihat Semua Artikel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
