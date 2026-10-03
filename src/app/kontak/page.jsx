'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: 'Renovasi Rumah',
    location: '',
    message: '',
  });

  const whatsappNumber = '6282141486171';

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Halo Mitra Bangun Mandiri,\n\nNama: ${formData.name}\nNomor Telepon: ${formData.phone}\nJenis Proyek: ${formData.projectType}\nLokasi Proyek: ${formData.location}\n\nPesan / Kebutuhan:\n${formData.message}`;
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="w-full">
      {/* Header Banner */}
      <section className="bg-brand-navy py-16 sm:py-20 border-b-2 border-brand-accent text-white relative">
        <div className="section-container relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[3px] text-brand-accent mb-2 block">
            Terhubung Bersama Kami
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Kontak & Konsultasi
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            Sampaikan ide hunian impian atau rencana renovasi rumah Anda. Kami siap memberikan masukan teknis dan estimasi rancangan anggaran biaya.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Information Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="section-subtitle">Saluran Komunikasi</span>
                <h2 className="section-title">Informasi Kontak</h2>
                <p className="text-sm text-brand-body mt-2 leading-relaxed">
                  Kami selalu terbuka untuk berdiskusi baik melalui WhatsApp, telepon, maupun survey langsung ke lokasi rumah Anda.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="p-5 bg-brand-surface rounded-[4px] border border-brand-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[4px] bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-brand-dark">Telepon & WhatsApp</h5>
                    <p className="text-xs text-brand-muted mt-0.5">Respon cepat setiap hari kerja</p>
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-brand-accent hover:underline block mt-1"
                    >
                      0821-4148-6171
                    </a>
                  </div>
                </div>

                <div className="p-5 bg-brand-surface rounded-[4px] border border-brand-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[4px] bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-brand-dark">Email Resmi</h5>
                    <p className="text-xs text-brand-muted mt-0.5">Untuk pengiriman dokumen denah / file RAB</p>
                    <a
                      href="mailto:konsultasi@mitrabangunmandiri.com"
                      className="text-sm font-semibold text-brand-accent hover:underline block mt-1"
                    >
                      konsultasi@mitrabangunmandiri.com
                    </a>
                  </div>
                </div>

                <div className="p-5 bg-brand-surface rounded-[4px] border border-brand-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[4px] bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-brand-dark">Wilayah Layanan</h5>
                    <p className="text-xs text-brand-muted mt-0.5">
                      Jl. Bougenville No. 18, Jakarta Selatan
                    </p>
                    <p className="text-xs text-brand-dark font-medium mt-1">
                      Melayani area: Jakarta, Tangerang, Tangsel, Depok, Bekasi, dan Bogor.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-brand-surface rounded-[4px] border border-brand-border flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[4px] bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-brand-dark">Jam Operasional</h5>
                    <p className="text-xs text-brand-body mt-1">
                      Senin - Sabtu: 08.00 - 17.00 WIB<br />
                      (Hari Minggu / Libur Nasional dapat diatur dengan perjanjian sebelumnya)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Request Form */}
            <div className="lg:col-span-7 bg-brand-surface-alt p-8 sm:p-10 rounded-[4px] border border-brand-border shadow-card">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-accent block mb-1">
                  Formulir Konsultasi Langsung
                </span>
                <h3 className="text-2xl font-bold text-brand-dark">
                  Kirim Rincian Rencana Proyek
                </h3>
                <p className="text-xs sm:text-sm text-brand-body mt-1">
                  Isi form berikut untuk langsung terhubung ke WhatsApp kami dengan format pesan yang terstruktur.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Bapak Hendra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1">
                      Nomor WhatsApp / HP *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1">
                      Jenis Kebutuhan Pekerjaan
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
                    >
                      <option value="Bangun Rumah Baru">Bangun Rumah Baru</option>
                      <option value="Renovasi Rumah Total">Renovasi Rumah Total</option>
                      <option value="Peningkatan Lantai 2 / Dak">Peningkatan Lantai 2 / Dak</option>
                      <option value="Perbaikan Fasad & Tampak Depan">Perbaikan Fasad & Tampak Depan</option>
                      <option value="Perbaikan Atap Bocor / Waterproofing">Perbaikan Atap Bocor / Waterproofing</option>
                      <option value="Desain Denah & Hitung RAB">Desain Denah & Hitung RAB</option>
                      <option value="Lainnya">Kebutuhan Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1">
                      Lokasi Rumah / Tanah
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Bintaro Sektor 7 / BSD"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1">
                    Ceritakan Rencana / Keluhan Bangunan *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Contoh: Saya ingin merenovasi rumah 1 lantai menjadi 2 lantai, luas tanah 90m2. Mohon info estimasi biaya dan jadwal survey..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Kirim Pesan via WhatsApp Sekarang</span>
                </button>

                <p className="text-[11px] text-brand-muted text-center">
                  Data Anda aman dan hanya digunakan untuk keperluan konsultasi proyek konstruksi.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
