'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  FolderKanban,
  BookOpen,
  Layers,
  Settings,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  CheckCircle2,
  Save,
  RefreshCw,
  ExternalLink,
  Hammer
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Modals / forms state
  const [editPortfolioModal, setEditPortfolioModal] = useState(null);
  const [editCatalogModal, setEditCatalogModal] = useState(null);
  const [editBlogModal, setEditBlogModal] = useState(null);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setMessage('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Save data to server
  const persistData = async (newData, successMsg = 'Perubahan berhasil disimpan!') => {
    setSaving(true);
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      if (res.ok) {
        setData(newData);
        setMessage(successMsg);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Gagal menyimpan data ke server');
      }
    } catch (err) {
      console.error(err);
      setMessage('Terjadi kesalahan saat menyimpan data');
    } finally {
      setSaving(false);
    }
  };

  // Portfolio Handlers
  const handleSavePortfolio = (item) => {
    const list = [...(data.portfolio || [])];
    if (item.id) {
      const idx = list.findIndex((p) => p.id === item.id);
      if (idx !== -1) {
        list[idx] = item;
      }
    } else {
      const newItem = {
        ...item,
        id: `port-${Date.now()}`,
        slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        published: true,
      };
      list.unshift(newItem);
    }
    const updated = { ...data, portfolio: list };
    persistData(updated, 'Portofolio berhasil disimpan');
    setEditPortfolioModal(null);
  };

  const handleDeletePortfolio = (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus portofolio ini?')) return;
    const list = data.portfolio.filter((p) => p.id !== id);
    persistData({ ...data, portfolio: list }, 'Portofolio berhasil dihapus');
  };

  const handleTogglePublishPortfolio = (id) => {
    const list = data.portfolio.map((p) => (p.id === id ? { ...p, published: !p.published } : p));
    persistData({ ...data, portfolio: list }, 'Status publikasi diperbarui');
  };

  // Catalog Handlers
  const handleSaveCatalog = (item) => {
    const list = [...(data.catalog || [])];
    if (item.id) {
      const idx = list.findIndex((c) => c.id === item.id);
      if (idx !== -1) {
        list[idx] = item;
      }
    } else {
      const newItem = {
        ...item,
        id: `cat-${Date.now()}`,
        published: true,
      };
      list.unshift(newItem);
    }
    const updated = { ...data, catalog: list };
    persistData(updated, 'Katalog berhasil disimpan');
    setEditCatalogModal(null);
  };

  const handleDeleteCatalog = (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus item katalog ini?')) return;
    const list = data.catalog.filter((c) => c.id !== id);
    persistData({ ...data, catalog: list }, 'Item katalog berhasil dihapus');
  };

  const handleTogglePublishCatalog = (id) => {
    const list = data.catalog.map((c) => (c.id === id ? { ...c, published: !c.published } : c));
    persistData({ ...data, catalog: list }, 'Status katalog diperbarui');
  };

  // Blog Handlers
  const handleSaveBlog = (item) => {
    const list = [...(data.blog || [])];
    if (item.id) {
      const idx = list.findIndex((b) => b.id === item.id);
      if (idx !== -1) {
        list[idx] = item;
      }
    } else {
      const newItem = {
        ...item,
        id: `blog-${Date.now()}`,
        slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        published: true,
      };
      list.unshift(newItem);
    }
    const updated = { ...data, blog: list };
    persistData(updated, 'Artikel berhasil disimpan');
    setEditBlogModal(null);
  };

  const handleDeleteBlog = (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    const list = data.blog.filter((b) => b.id !== id);
    persistData({ ...data, blog: list }, 'Artikel berhasil dihapus');
  };

  const handleTogglePublishBlog = (id) => {
    const list = data.blog.map((b) => (b.id === id ? { ...b, published: !b.published } : b));
    persistData({ ...data, blog: list }, 'Status artikel diperbarui');
  };

  // Settings Handler
  const handleSaveSettings = (e) => {
    e.preventDefault();
    persistData(data, 'Pengaturan website berhasil diperbarui!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-surface">
        <div className="flex items-center gap-3 text-brand-accent font-semibold">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Memuat Sistem Panel Pengelola...</span>
        </div>
      </div>
    );
  }

  const portfolioCount = data?.portfolio?.length || 0;
  const catalogCount = data?.catalog?.length || 0;
  const blogCount = data?.blog?.length || 0;

  return (
    <div className="min-h-screen bg-[#F6F7FB] flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-brand-navy border-b-2 border-brand-accent text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-brand-accent flex items-center justify-center text-white">
            <Hammer className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white leading-none">
              Panel Pengelola Konten
            </h1>
            <span className="text-[10px] text-brand-accent uppercase font-bold tracking-wider">
              {data?.settings?.businessName || 'Mitra Bangun Mandiri'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {message && (
            <div className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{message}</span>
            </div>
          )}

          <Link
            href="/"
            target="_blank"
            className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors border border-white/20 px-3 py-1.5 rounded"
          >
            <span>Buka Website Publik</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white border-r border-brand-border p-4 space-y-1.5 shrink-0">
          {[
            { id: 'dashboard', label: 'Ringkasan Dashboard', icon: LayoutDashboard },
            { id: 'portfolio', label: `Portofolio Proyek (${portfolioCount})`, icon: FolderKanban },
            { id: 'catalog', label: `Katalog Material (${catalogCount})`, icon: Layers },
            { id: 'blog', label: `Artikel & Blog (${blogCount})`, icon: BookOpen },
            { id: 'settings', label: 'Pengaturan Kontak & Profil', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-[3px] text-xs font-bold uppercase tracking-wider transition-colors text-left ${
                  active
                    ? 'bg-brand-accent text-white shadow-sm'
                    : 'text-brand-dark hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Pane */}
        <main className="flex-grow p-6 sm:p-8 max-w-6xl">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-brand-dark">Ringkasan Konten Website</h2>
                <p className="text-xs sm:text-sm text-brand-body mt-1">
                  Kelola seluruh data portofolio, spesifikasi katalog, artikel tips bangunan, dan identitas kontak Anda.
                </p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[4px] border border-brand-border shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                      Total Portofolio
                    </span>
                    <h3 className="text-3xl font-black text-brand-dark mt-1">{portfolioCount}</h3>
                    <button
                      onClick={() => setActiveTab('portfolio')}
                      className="text-xs font-semibold text-brand-accent hover:underline mt-2 block"
                    >
                      Kelola Portofolio →
                    </button>
                  </div>
                  <div className="w-12 h-12 rounded bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <FolderKanban className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[4px] border border-brand-border shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                      Total Katalog
                    </span>
                    <h3 className="text-3xl font-black text-brand-dark mt-1">{catalogCount}</h3>
                    <button
                      onClick={() => setActiveTab('catalog')}
                      className="text-xs font-semibold text-brand-accent hover:underline mt-2 block"
                    >
                      Kelola Katalog →
                    </button>
                  </div>
                  <div className="w-12 h-12 rounded bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <Layers className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[4px] border border-brand-border shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                      Total Artikel
                    </span>
                    <h3 className="text-3xl font-black text-brand-dark mt-1">{blogCount}</h3>
                    <button
                      onClick={() => setActiveTab('blog')}
                      className="text-xs font-semibold text-brand-accent hover:underline mt-2 block"
                    >
                      Kelola Artikel →
                    </button>
                  </div>
                  <div className="w-12 h-12 rounded bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <BookOpen className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-[4px] border border-brand-border shadow-sm space-y-4">
                <h3 className="text-base font-bold text-brand-dark">Aksi Cepat Tambah Konten</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setEditPortfolioModal({
                        title: '',
                        category: 'Renovasi Bangunan',
                        location: '',
                        year: '2025',
                        image: '/images/desain/hero.jpg',
                        summary: '',
                        description: '',
                        scope: '',
                      });
                      setActiveTab('portfolio');
                    }}
                    className="btn-primary px-4 py-2.5 text-xs uppercase flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Proyek Baru</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditCatalogModal({
                        title: '',
                        category: 'Struktur & Pondasi',
                        image: '/images/desain/p1.jpg',
                        description: '',
                        specification: '',
                      });
                      setActiveTab('catalog');
                    }}
                    className="btn-secondary px-4 py-2.5 text-xs uppercase flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Item Katalog</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditBlogModal({
                        title: '',
                        category: 'Tips Renovasi',
                        image: '/images/desain/blog.jpg',
                        author: 'Ir. Hendra Pratama',
                        summary: '',
                        content: '',
                      });
                      setActiveTab('blog');
                    }}
                    className="btn-secondary px-4 py-2.5 text-xs uppercase flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tulis Artikel Baru</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark">Kelola Portofolio Proyek</h2>
                  <p className="text-xs text-brand-body">
                    Dokumentasikan proyek yang selesai dikerjakan untuk ditampilkan di website.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditPortfolioModal({
                      title: '',
                      category: 'Renovasi Bangunan',
                      location: '',
                      year: '2025',
                      image: '/images/desain/hero.jpg',
                      summary: '',
                      description: '',
                      scope: '',
                    })
                  }
                  className="btn-primary px-4 py-2.5 text-xs uppercase flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Proyek</span>
                </button>
              </div>

              {/* Table / List */}
              <div className="bg-white rounded-[4px] border border-brand-border shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-surface border-b border-brand-border text-[11px] font-bold uppercase tracking-wider text-brand-dark">
                      <th className="p-3.5">Gambar</th>
                      <th className="p-3.5">Judul Proyek</th>
                      <th className="p-3.5">Kategori</th>
                      <th className="p-3.5">Lokasi / Tahun</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-xs">
                    {(data.portfolio || []).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5">
                          <img
                            src={item.image}
                            alt=""
                            className="w-14 h-10 object-cover rounded border border-brand-border"
                          />
                        </td>
                        <td className="p-3.5 font-bold text-brand-dark max-w-xs">{item.title}</td>
                        <td className="p-3.5">{item.category}</td>
                        <td className="p-3.5 text-brand-muted">
                          {item.location} ({item.year})
                        </td>
                        <td className="p-3.5">
                          <button
                            onClick={() => handleTogglePublishPortfolio(item.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold uppercase ${
                              item.published !== false
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {item.published !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{item.published !== false ? 'Tayang' : 'Draft'}</span>
                          </button>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => setEditPortfolioModal(item)}
                            className="p-1.5 text-brand-dark hover:text-brand-accent"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePortfolio(item.id)}
                            className="p-1.5 text-rose-600 hover:text-rose-800"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CATALOG */}
          {activeTab === 'catalog' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark">Kelola Katalog Pekerjaan & Material</h2>
                  <p className="text-xs text-brand-body">
                    Daftar spesifikasi acuan dan jenis pekerjaan bangunan.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditCatalogModal({
                      title: '',
                      category: 'Struktur & Pondasi',
                      image: '/images/desain/p1.jpg',
                      description: '',
                      specification: '',
                    })
                  }
                  className="btn-primary px-4 py-2.5 text-xs uppercase flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Item</span>
                </button>
              </div>

              <div className="bg-white rounded-[4px] border border-brand-border shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-surface border-b border-brand-border text-[11px] font-bold uppercase tracking-wider text-brand-dark">
                      <th className="p-3.5">Gambar</th>
                      <th className="p-3.5">Nama Item</th>
                      <th className="p-3.5">Kategori</th>
                      <th className="p-3.5">Spesifikasi Acuan</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-xs">
                    {(data.catalog || []).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5">
                          <img
                            src={item.image}
                            alt=""
                            className="w-14 h-10 object-cover rounded border border-brand-border"
                          />
                        </td>
                        <td className="p-3.5 font-bold text-brand-dark max-w-xs">{item.title}</td>
                        <td className="p-3.5">{item.category}</td>
                        <td className="p-3.5 text-brand-muted max-w-xs truncate">{item.specification}</td>
                        <td className="p-3.5">
                          <button
                            onClick={() => handleTogglePublishCatalog(item.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold uppercase ${
                              item.published !== false
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {item.published !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{item.published !== false ? 'Tayang' : 'Draft'}</span>
                          </button>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => setEditCatalogModal(item)}
                            className="p-1.5 text-brand-dark hover:text-brand-accent"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCatalog(item.id)}
                            className="p-1.5 text-rose-600 hover:text-rose-800"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: BLOG */}
          {activeTab === 'blog' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-brand-dark">Kelola Artikel & Tips Bangunan</h2>
                  <p className="text-xs text-brand-body">
                    Tulis edukasi seputar tips renovasi, pemilihan material, dan panduan struktur.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setEditBlogModal({
                      title: '',
                      category: 'Tips Renovasi',
                      image: '/images/desain/blog.jpg',
                      author: 'Ir. Hendra Pratama',
                      summary: '',
                      content: '',
                    })
                  }
                  className="btn-primary px-4 py-2.5 text-xs uppercase flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tulis Artikel Baru</span>
                </button>
              </div>

              <div className="bg-white rounded-[4px] border border-brand-border shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-surface border-b border-brand-border text-[11px] font-bold uppercase tracking-wider text-brand-dark">
                      <th className="p-3.5">Gambar</th>
                      <th className="p-3.5">Judul Artikel</th>
                      <th className="p-3.5">Kategori</th>
                      <th className="p-3.5">Tanggal</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-xs">
                    {(data.blog || []).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5">
                          <img
                            src={item.image}
                            alt=""
                            className="w-14 h-10 object-cover rounded border border-brand-border"
                          />
                        </td>
                        <td className="p-3.5 font-bold text-brand-dark max-w-xs">{item.title}</td>
                        <td className="p-3.5">{item.category}</td>
                        <td className="p-3.5 text-brand-muted">{item.date}</td>
                        <td className="p-3.5">
                          <button
                            onClick={() => handleTogglePublishBlog(item.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold uppercase ${
                              item.published !== false
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {item.published !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{item.published !== false ? 'Tayang' : 'Draft'}</span>
                          </button>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => setEditBlogModal(item)}
                            className="p-1.5 text-brand-dark hover:text-brand-accent"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(item.id)}
                            className="p-1.5 text-rose-600 hover:text-rose-800"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-brand-dark">Pengaturan Kontak & Profil Kontraktor</h2>
                <p className="text-xs text-brand-body">
                  Ubah nama usaha, nomor WhatsApp konsultasi, alamat, dan deskripsi hero website.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-[4px] border border-brand-border shadow-sm space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1">
                      Nama Usaha Kontraktor
                    </label>
                    <input
                      type="text"
                      value={data.settings.businessName || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...data.settings, businessName: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1">
                      Nama Pemilik / Penanggung Jawab
                    </label>
                    <input
                      type="text"
                      value={data.settings.ownerName || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...data.settings, ownerName: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1">
                      Nomor WhatsApp (Format: 628xxx)
                    </label>
                    <input
                      type="text"
                      value={data.settings.whatsapp || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...data.settings, whatsapp: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1">
                      Telepon Tampilan
                    </label>
                    <input
                      type="text"
                      value={data.settings.phone || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...data.settings, phone: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={data.settings.email || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...data.settings, email: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1">
                      Jam Kerja / Operasional
                    </label>
                    <input
                      type="text"
                      value={data.settings.workingHours || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...data.settings, workingHours: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1">
                    Alamat Workshop / Kantor
                  </label>
                  <input
                    type="text"
                    value={data.settings.address || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...data.settings, address: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1">
                    Headline Utama Hero
                  </label>
                  <input
                    type="text"
                    value={data.settings.heroHeadline || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...data.settings, heroHeadline: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-1">
                    Deskripsi Ringkas Hero
                  </label>
                  <textarea
                    rows={3}
                    value={data.settings.heroDescription || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...data.settings, heroDescription: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-brand-border rounded-[3px] focus:outline-none focus:border-brand-accent"
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-brand-border flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary px-8 py-3 text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: EDIT / ADD PORTFOLIO */}
      {editPortfolioModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-brand-dark">
              {editPortfolioModal.id ? 'Edit Portofolio Proyek' : 'Tambah Portofolio Proyek'}
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-brand-dark mb-1">Nama Proyek *</label>
                <input
                  type="text"
                  value={editPortfolioModal.title}
                  onChange={(e) => setEditPortfolioModal({ ...editPortfolioModal, title: e.target.value })}
                  placeholder="Contoh: Renovasi Rumah Tinggal 2 Lantai"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-brand-dark mb-1">Kategori</label>
                  <select
                    value={editPortfolioModal.category}
                    onChange={(e) => setEditPortfolioModal({ ...editPortfolioModal, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="Renovasi Bangunan">Renovasi Bangunan</option>
                    <option value="Bangun Rumah Baru">Bangun Rumah Baru</option>
                    <option value="Peningkatan Struktur">Peningkatan Struktur</option>
                    <option value="Pekerjaan Fasad & Atap">Pekerjaan Fasad & Atap</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-brand-dark mb-1">Tahun</label>
                  <input
                    type="text"
                    value={editPortfolioModal.year}
                    onChange={(e) => setEditPortfolioModal({ ...editPortfolioModal, year: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">Lokasi Proyek</label>
                <input
                  type="text"
                  value={editPortfolioModal.location}
                  onChange={(e) => setEditPortfolioModal({ ...editPortfolioModal, location: e.target.value })}
                  placeholder="Contoh: Bintaro, Tangerang Selatan"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">URL Gambar Utama</label>
                <input
                  type="text"
                  value={editPortfolioModal.image}
                  onChange={(e) => setEditPortfolioModal({ ...editPortfolioModal, image: e.target.value })}
                  placeholder="/images/desain/hero.jpg"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">Ringkasan Singkat</label>
                <textarea
                  rows={2}
                  value={editPortfolioModal.summary}
                  onChange={(e) => setEditPortfolioModal({ ...editPortfolioModal, summary: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat untuk preview card..."
                  className="w-full px-3 py-2 border rounded"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">Deskripsi Lengkap Pengerjaan</label>
                <textarea
                  rows={4}
                  value={editPortfolioModal.description}
                  onChange={(e) => setEditPortfolioModal({ ...editPortfolioModal, description: e.target.value })}
                  placeholder="Ulasan detail pelaksanaan proyek..."
                  className="w-full px-3 py-2 border rounded"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">Cakupan Pekerjaan (Scope)</label>
                <input
                  type="text"
                  value={editPortfolioModal.scope}
                  onChange={(e) => setEditPortfolioModal({ ...editPortfolioModal, scope: e.target.value })}
                  placeholder="Contoh: Pondasi, Dak Bondek, Fasad, Finishing Granit"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setEditPortfolioModal(null)}
                className="px-4 py-2 border rounded text-xs font-semibold text-brand-body hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                onClick={() => handleSavePortfolio(editPortfolioModal)}
                className="btn-primary px-6 py-2 text-xs uppercase"
              >
                Simpan Proyek
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD CATALOG */}
      {editCatalogModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] max-w-xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-brand-dark">
              {editCatalogModal.id ? 'Edit Item Katalog' : 'Tambah Item Katalog'}
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-brand-dark mb-1">Nama Item Pekerjaan *</label>
                <input
                  type="text"
                  value={editCatalogModal.title}
                  onChange={(e) => setEditCatalogModal({ ...editCatalogModal, title: e.target.value })}
                  placeholder="Contoh: Dak Lantai Beton SNI"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">Kategori</label>
                <select
                  value={editCatalogModal.category}
                  onChange={(e) => setEditCatalogModal({ ...editCatalogModal, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="Struktur & Pondasi">Struktur & Pondasi</option>
                  <option value="Atap & Plafon">Atap & Plafon</option>
                  <option value="Finishing Lantai">Finishing Lantai</option>
                  <option value="Eksterior">Eksterior</option>
                  <option value="Proteksi Bangunan">Proteksi Bangunan</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">URL Gambar</label>
                <input
                  type="text"
                  value={editCatalogModal.image}
                  onChange={(e) => setEditCatalogModal({ ...editCatalogModal, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">Deskripsi Pengerjaan</label>
                <textarea
                  rows={3}
                  value={editCatalogModal.description}
                  onChange={(e) => setEditCatalogModal({ ...editCatalogModal, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">Spesifikasi Acuan</label>
                <input
                  type="text"
                  value={editCatalogModal.specification}
                  onChange={(e) => setEditCatalogModal({ ...editCatalogModal, specification: e.target.value })}
                  placeholder="Contoh: Wiremesh M8, Beton Ready Mix K-250"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setEditCatalogModal(null)}
                className="px-4 py-2 border rounded text-xs font-semibold text-brand-body hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                onClick={() => handleSaveCatalog(editCatalogModal)}
                className="btn-primary px-6 py-2 text-xs uppercase"
              >
                Simpan Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD BLOG */}
      {editBlogModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-brand-dark">
              {editBlogModal.id ? 'Edit Artikel' : 'Tulis Artikel Baru'}
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-brand-dark mb-1">Judul Artikel *</label>
                <input
                  type="text"
                  value={editBlogModal.title}
                  onChange={(e) => setEditBlogModal({ ...editBlogModal, title: e.target.value })}
                  placeholder="Judul artikel tips bangunan..."
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-brand-dark mb-1">Kategori</label>
                  <select
                    value={editBlogModal.category}
                    onChange={(e) => setEditBlogModal({ ...editBlogModal, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="Tips Renovasi">Tips Renovasi</option>
                    <option value="Struktur Bangunan">Struktur Bangunan</option>
                    <option value="Material & Finishing">Material & Finishing</option>
                    <option value="Panduan Biaya (RAB)">Panduan Biaya (RAB)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-brand-dark mb-1">Penulis</label>
                  <input
                    type="text"
                    value={editBlogModal.author}
                    onChange={(e) => setEditBlogModal({ ...editBlogModal, author: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">URL Gambar Utama</label>
                <input
                  type="text"
                  value={editBlogModal.image}
                  onChange={(e) => setEditBlogModal({ ...editBlogModal, image: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">Ringkasan / Excerpt</label>
                <textarea
                  rows={2}
                  value={editBlogModal.summary}
                  onChange={(e) => setEditBlogModal({ ...editBlogModal, summary: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-brand-dark mb-1">Isi Konten Artikel</label>
                <textarea
                  rows={6}
                  value={editBlogModal.content}
                  onChange={(e) => setEditBlogModal({ ...editBlogModal, content: e.target.value })}
                  placeholder="Tulis paragraf artikel di sini..."
                  className="w-full px-3 py-2 border rounded"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setEditBlogModal(null)}
                className="px-4 py-2 border rounded text-xs font-semibold text-brand-body hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                onClick={() => handleSaveBlog(editBlogModal)}
                className="btn-primary px-6 py-2 text-xs uppercase"
              >
                Simpan Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
