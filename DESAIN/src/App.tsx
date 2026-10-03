import { FormEvent, ReactNode, useEffect, useState } from "react"

const photos = {
  hero: "https://images.unsplash.com/photo-1675657144518-025804f1812c?auto=format&fit=crop&w=1800&q=88",
  intro:
    "https://images.unsplash.com/photo-1617357283233-227e9df5966e?auto=format&fit=crop&w=1200&q=85",
  p1: "https://images.unsplash.com/photo-1621501744628-6b0413614492?auto=format&fit=crop&w=1400&q=85",
  p2: "https://images.unsplash.com/photo-1636274088829-58d23b8eb260?auto=format&fit=crop&w=1200&q=85",
  p3: "https://images.unsplash.com/photo-1706763328367-51901a47b328?auto=format&fit=crop&w=1200&q=85",
  interior:
    "https://images.unsplash.com/photo-1766128867730-b10474e59f1b?auto=format&fit=crop&w=1400&q=85",
  detail:
    "https://images.unsplash.com/photo-1617357978159-3f6551e11751?auto=format&fit=crop&w=1200&q=85",
  detail2:
    "https://images.unsplash.com/photo-1675657144217-17d3fbcb8a43?auto=format&fit=crop&w=1400&q=85",
  blog: "https://images.unsplash.com/photo-1617358013737-0f0477036649?auto=format&fit=crop&w=1200&q=85",
}

const nav = [
  ["Beranda", "/"],
  ["Tentang", "/tentang"],
  ["Layanan", "/layanan"],
  ["Portofolio", "/portfolio"],
  ["Katalog", "/katalog"],
  ["Blog", "/blog"],
  ["Kontak", "/kontak"],
]

type LinkProps = {
  to: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

function Link({ to, children, className = "", onClick }: LinkProps) {
  const go = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      to.startsWith("http") ||
      to.startsWith("mailto") ||
      to.startsWith("tel")
    )
      return
    event.preventDefault()
    window.history.pushState({}, "", to)
    window.dispatchEvent(new PopStateEvent("popstate"))
    onClick?.()
  }
  return (
    <a href={to} onClick={go} className={className}>
      {children}
    </a>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  )
}

function MenuIcon({ close = false }: { close?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {close ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11.7a8 8 0 0 1-11.8 7l-4.2 1 1.1-4A8 8 0 1 1 20 11.7Z" />
      <path d="M8.5 8.2c.4 2.8 2.5 5 5.3 5.8l1.4-1.3 2.2.9" />
    </svg>
  )
}

const wa = "https://wa.me/[NOMOR_WHATSAPP]"

function ButtonLink({
  children,
  to = wa,
  secondary = false,
}: {
  children: ReactNode
  to?: string
  secondary?: boolean
}) {
  return (
    <Link to={to} className={`button ${secondary ? "button-secondary" : ""}`}>
      {children}
      <Arrow />
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">R</span>
          <span>
            [ NAMA USAHA ]<small>CONTRACTOR & RENOVATION</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {nav
            .filter((item) => item[0] !== "Katalog")
            .map(([label, url]) => (
              <Link key={url} to={url}>
                {label}
              </Link>
            ))}
        </nav>
        <Link to={wa} className="header-cta">
          Konsultasi WhatsApp <Arrow />
        </Link>
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Buka menu"
          aria-expanded={open}
        >
          <MenuIcon close={open} />
        </button>
      </header>
      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        <div className="drawer-links">
          {nav.map(([label, url], index) => (
            <Link key={url} to={url} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              {label}
            </Link>
          ))}
        </div>
        <ButtonLink>Konsultasi WhatsApp</ButtonLink>
        <p>[ LOKASI ] · Indonesia</p>
      </div>
    </>
  )
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark">R</span>
            <span>[ NAMA USAHA ]</span>
          </div>
          <p>
            [ DESKRIPSI USAHA ] Jasa kontraktor dan renovasi dengan komunikasi
            langsung untuk kebutuhan bangunan Anda.
          </p>
        </div>
        <div>
          <h4>Navigasi</h4>
          {nav.map(([n, u]) => (
            <Link key={u} to={u}>
              {n}
            </Link>
          ))}
        </div>
        <div>
          <h4>Hubungi</h4>
          <a href={wa}>[ NOMOR WHATSAPP ]</a>
          <span>[ LOKASI ]</span>
          <span>[ INSTAGRAM ]</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 [ NAMA USAHA ]</span>
        <span>Bangun dengan arah. Renovasi dengan makna.</span>
      </div>
    </footer>
  )
}

function PublicShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <a className="floating-wa" href={wa} aria-label="Konsultasi via WhatsApp">
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </a>
    </>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  )
}

function SectionHead({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string
  title: string
  action?: ReactNode
}) {
  return (
    <div className="section-head">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  )
}

const projects = [
  {
    title: "[ NAMA PROYEK 01 ]",
    category: "Hunian · Konstruksi",
    location: "[ LOKASI ]",
    image: photos.p1,
  },
  {
    title: "[ NAMA PROYEK 02 ]",
    category: "Hunian · Renovasi",
    location: "[ LOKASI ]",
    image: photos.p2,
  },
  {
    title: "[ NAMA PROYEK 03 ]",
    category: "Bangunan · Renovasi",
    location: "[ LOKASI ]",
    image: photos.p3,
  },
]

const articles = [
  {
    category: "PERENCANAAN",
    title: "Hal yang Perlu Disiapkan Sebelum Memulai Renovasi",
    date: "[ TANGGAL PUBLIKASI ]",
    image: photos.blog,
  },
  {
    category: "MATERIAL",
    title: "Memilih Material Sesuai Kebutuhan dan Karakter Ruang",
    date: "[ TANGGAL PUBLIKASI ]",
    image: photos.interior,
  },
  {
    category: "KONSTRUKSI",
    title: "Memahami Alur Pengerjaan Proyek Bangunan",
    date: "[ TANGGAL PUBLIKASI ]",
    image: photos.detail,
  },
]

function Home() {
  return (
    <PublicShell>
      <section className="hero">
        <div className="hero-copy">
          <Eyebrow>CONTRACTOR & RENOVATION</Eyebrow>
          <h1>Bangun Ruang Impian Anda, Kami Wujudkan dengan Tepat.</h1>
          <p>
            Jasa kontraktor dan renovasi untuk kebutuhan pembangunan dan
            pengembangan bangunan Anda.
          </p>
          <div className="button-row">
            <ButtonLink>Konsultasi via WhatsApp</ButtonLink>
            <ButtonLink to="/portfolio" secondary>
              Lihat Portofolio
            </ButtonLink>
          </div>
        </div>
        <div className="hero-visual">
          <img src={photos.hero} alt="Arsitektur hunian tropis modern" />
          <div className="image-caption">
            <span>01 / FEATURED</span>
            <span>
              [ NAMA PROYEK ]<br />[ LOKASI ]
            </span>
          </div>
        </div>
        <div className="hero-index">01</div>
      </section>

      <section className="intro section">
        <div className="intro-copy">
          <Eyebrow>PENDEKATAN KAMI</Eyebrow>
          <h2>
            Membangun bukan hanya tentang bentuk, tetapi juga tentang
            kepercayaan.
          </h2>
          <p>
            Kami mendampingi proses pembangunan dengan komunikasi langsung,
            pertimbangan yang matang, dan pengerjaan yang disesuaikan dengan
            kebutuhan setiap ruang.
          </p>
          <Link to="/tentang" className="text-link">
            Kenali cara kerja kami <Arrow />
          </Link>
        </div>
        <div className="intro-visual">
          <img src={photos.intro} alt="Detail fasad bangunan beton modern" />
          <div className="note">
            <b>DETAIL / 01</b>
            <p>
              Setiap keputusan dibicarakan secara jelas, dari kebutuhan awal
              hingga tahap pengerjaan.
            </p>
          </div>
        </div>
      </section>

      <section className="services section dark">
        <SectionHead eyebrow="LAYANAN" title="Layanan yang Kami Kerjakan" />
        <div className="service-list">
          {[
            [
              "01",
              "Jasa Kontraktor",
              "Pembangunan bangunan yang direncanakan sesuai fungsi, kebutuhan, dan konteks ruang.",
              photos.detail,
            ],
            [
              "02",
              "Renovasi Bangunan",
              "Pengembangan dan pembaruan ruang yang lebih relevan dengan kebutuhan penggunanya.",
              photos.interior,
            ],
          ].map(([num, title, desc, image]) => (
            <Link to="/layanan" className="service-row" key={title}>
              <span className="service-number">{num}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="service-image">
                <img src={image} alt="" />
              </div>
              <span className="round-arrow">
                <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="portfolio section">
        <SectionHead
          eyebrow="PORTOFOLIO PILIHAN"
          title="Beberapa Pekerjaan Kami"
          action={
            <ButtonLink to="/portfolio" secondary>
              Lihat Semua Proyek
            </ButtonLink>
          }
        />
        <div className="project-layout">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              featured={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="principles section">
        <div className="principles-title">
          <Eyebrow>PRINSIP KERJA</Eyebrow>
          <h2>Proses yang jelas untuk hasil yang lebih tepat.</h2>
        </div>
        <div className="principle-list">
          {[
            [
              "01",
              "Pengerjaan Terarah",
              "Tahapan kerja disusun agar proses tetap terukur dan mudah dipahami.",
            ],
            [
              "02",
              "Komunikasi Langsung",
              "Diskusi dilakukan langsung, terbuka, dan fokus pada keputusan proyek.",
            ],
            [
              "03",
              "Sesuai Kebutuhan",
              "Solusi dipertimbangkan berdasarkan fungsi, kondisi, dan prioritas Anda.",
            ],
          ].map(([n, t, d]) => (
            <div key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="blog-section section">
        <SectionHead
          eyebrow="JURNAL"
          title="Tips & Informasi Bangunan"
          action={
            <ButtonLink to="/blog" secondary>
              Lihat Semua Artikel
            </ButtonLink>
          }
        />
        <div className="article-grid">
          {articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </section>
      <FinalCTA />
    </PublicShell>
  )
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: typeof projects[0]
  featured?: boolean
}) {
  return (
    <Link
      to="/portfolio/proyek-01"
      className={`project-card ${featured ? "featured" : ""}`}
    >
      <div className="image-wrap">
        <img loading="lazy" src={project.image} alt={`Foto ${project.title}`} />
        <span className="view-project">
          Lihat Proyek <Arrow />
        </span>
      </div>
      <div className="project-meta">
        <div>
          <span>{project.category}</span>
          <h3>{project.title}</h3>
        </div>
        <span>{project.location}</span>
      </div>
    </Link>
  )
}

function ArticleCard({ article }: { article: typeof articles[0] }) {
  return (
    <Link to="/blog/persiapan-renovasi" className="article-card">
      <div className="image-wrap">
        <img loading="lazy" src={article.image} alt="" />
      </div>
      <div className="article-meta">
        <span>{article.category}</span>
        <span>{article.date}</span>
      </div>
      <h3>{article.title}</h3>
      <p>
        Catatan praktis untuk membantu Anda mengambil keputusan yang lebih
        terarah sebelum memulai proyek.
      </p>
      <span className="text-link">
        Baca Artikel <Arrow />
      </span>
    </Link>
  )
}

function FinalCTA() {
  return (
    <section className="final-cta">
      <Eyebrow>MULAI PROYEK ANDA</Eyebrow>
      <h2>Punya rencana membangun atau merenovasi?</h2>
      <p>
        Ceritakan kebutuhan proyek Anda dan konsultasikan langsung melalui
        WhatsApp.
      </p>
      <ButtonLink>Konsultasi via WhatsApp</ButtonLink>
      <span className="cta-outline">R</span>
    </section>
  )
}

function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="page-hero">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{description}</p>
      <span className="page-number">/ 01</span>
    </section>
  )
}

function About() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="TENTANG KAMI"
        title="Membangun dengan komunikasi yang manusiawi."
        description="[ NAMA USAHA ] adalah kontraktor independen yang melayani kebutuhan pembangunan dan renovasi melalui proses yang langsung, jelas, dan personal."
      />
      <section className="about-story section">
        <img src={photos.intro} alt="Detail bangunan modern" />
        <div>
          <Eyebrow>CARA KAMI BEKERJA</Eyebrow>
          <h2>Satu proyek, satu perhatian yang utuh.</h2>
          <p>
            Sebagai usaha yang dikelola secara independen, setiap diskusi dan
            keputusan proyek ditangani secara langsung. Pendekatan ini membantu
            menjaga komunikasi tetap ringkas dan kebutuhan ruang tetap menjadi
            fokus.
          </p>
          <p>[ INFORMASI LATAR BELAKANG USAHA ]</p>
        </div>
      </section>
      <section className="process section dark">
        <SectionHead eyebrow="PROSES" title="Dari percakapan menjadi ruang." />
        <div className="process-grid">
          {[
            "Konsultasi kebutuhan",
            "Survei & perencanaan",
            "Pengerjaan terarah",
            "Serah terima",
          ].map((x, i) => (
            <div>
              <span>0{i + 1}</span>
              <h3>{x}</h3>
              <p>
                Setiap tahap dikomunikasikan agar keputusan dapat diambil dengan
                pertimbangan yang jelas.
              </p>
            </div>
          ))}
        </div>
      </section>
      <FinalCTA />
    </PublicShell>
  )
}

function Services() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="LAYANAN"
        title="Pengerjaan yang dimulai dari kebutuhan ruang."
        description="Dua layanan utama untuk membantu mewujudkan bangunan baru maupun mengembangkan ruang yang sudah ada."
      />
      <section className="service-detail section">
        {[
          [
            "01",
            "Jasa Kontraktor",
            "Pengerjaan konstruksi untuk kebutuhan bangunan baru dengan alur yang terarah sejak konsultasi hingga pelaksanaan.",
            photos.p1,
            [
              "Diskusi kebutuhan dan ruang lingkup",
              "Survei kondisi lokasi",
              "Perencanaan tahapan pekerjaan",
              "Pelaksanaan dan komunikasi progres",
            ],
          ],
          [
            "02",
            "Renovasi Bangunan",
            "Pembaruan fungsi, tampilan, atau susunan ruang pada bangunan yang telah ada.",
            photos.interior,
            [
              "Evaluasi kondisi bangunan",
              "Pembahasan prioritas renovasi",
              "Penyesuaian fungsi dan material",
              "Pelaksanaan bertahap sesuai kebutuhan",
            ],
          ],
        ].map(([num, title, desc, image, list], i) => (
          <article
            className={`service-detail-row ${i % 2 ? "reverse" : ""}`}
            key={title as string}
          >
            <div className="service-detail-image">
              <img src={image as string} alt="" />
              <span>{num as string}</span>
            </div>
            <div>
              <Eyebrow>LAYANAN {num as string}</Eyebrow>
              <h2>{title as string}</h2>
              <p>{desc as string}</p>
              <h4>Ruang lingkup</h4>
              <ul>
                {(list as string[]).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <ButtonLink>Konsultasi via WhatsApp</ButtonLink>
            </div>
          </article>
        ))}
      </section>
      <FinalCTA />
    </PublicShell>
  )
}

function Portfolio() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="PORTOFOLIO"
        title="Ruang yang dikerjakan dengan pertimbangan."
        description="Pilihan pekerjaan konstruksi dan renovasi. Informasi proyek ditampilkan sebagai placeholder hingga data aktual tersedia."
      />
      <section className="archive section">
        <div className="filter-bar">
          <button className="active">Semua</button>
          <button>Konstruksi</button>
          <button>Renovasi</button>
          <button>Hunian</button>
        </div>
        <div className="archive-grid">
          {[...projects, ...projects].map((p, i) => (
            <ProjectCard
              key={i}
              project={{ ...p, title: `[ NAMA PROYEK 0${i + 1} ]` }}
              featured={i === 0}
            />
          ))}
        </div>
      </section>
      <FinalCTA />
    </PublicShell>
  )
}

function PortfolioDetail() {
  return (
    <PublicShell>
      <section className="detail-hero">
        <div>
          <Eyebrow>HUNIAN · KONSTRUKSI</Eyebrow>
          <h1>[ NAMA PROYEK ]</h1>
          <p>[ LOKASI ] · [ TAHUN ]</p>
        </div>
        <img src={photos.hero} alt="Tampilan utama proyek" />
      </section>
      <section className="project-summary section">
        <div>
          <Eyebrow>RINGKASAN PROYEK</Eyebrow>
          <h2>Ruang yang dirancang untuk kebutuhan penghuninya.</h2>
        </div>
        <p>
          [ DESKRIPSI PROYEK ] Jelaskan konteks, kebutuhan, tantangan, dan
          pendekatan pengerjaan proyek ini berdasarkan informasi aktual.
        </p>
      </section>
      <section className="project-info section">
        <div>
          <span>JENIS PROYEK</span>
          <b>[ KATEGORI ]</b>
        </div>
        <div>
          <span>LOKASI</span>
          <b>[ LOKASI ]</b>
        </div>
        <div>
          <span>TAHUN</span>
          <b>[ TAHUN ]</b>
        </div>
        <div>
          <span>STATUS</span>
          <b>[ STATUS ]</b>
        </div>
      </section>
      <section className="gallery section">
        <img src={photos.p1} alt="Galeri proyek 1" />
        <img src={photos.detail2} alt="Galeri proyek 2" />
        <img src={photos.interior} alt="Galeri proyek 3" />
      </section>
      <section className="related section">
        <SectionHead eyebrow="PROYEK LAINNYA" title="Pekerjaan terkait" />
        <div className="article-grid">
          {projects.slice(1).map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </section>
      <FinalCTA />
    </PublicShell>
  )
}

function Catalog() {
  const items = [
    ["[ NAMA ITEM / LAYANAN 01 ]", "Layanan", photos.p1],
    ["[ NAMA ITEM / LAYANAN 02 ]", "Pilihan Pengerjaan", photos.interior],
    ["[ NAMA ITEM / LAYANAN 03 ]", "Kebutuhan Ruang", photos.detail2],
  ]
  return (
    <PublicShell>
      <PageHero
        eyebrow="KATALOG"
        title="Pilihan layanan untuk kebutuhan yang berbeda."
        description="Jelajahi informasi layanan atau paket pengerjaan. Detail dan cakupan dapat dikonsultasikan langsung."
      />
      <section className="catalog-grid section">
        {items.map(([name, cat, image]) => (
          <article>
            <img src={image} alt="" />
            <div>
              <span>{cat}</span>
              <h2>{name}</h2>
              <p>
                [ DESKRIPSI ITEM ] Informasi ringkas mengenai ruang lingkup dan
                kebutuhan yang dapat dibicarakan lebih lanjut.
              </p>
              <ButtonLink>Konsultasi via WhatsApp</ButtonLink>
            </div>
          </article>
        ))}
      </section>
      <FinalCTA />
    </PublicShell>
  )
}

function Blog() {
  return (
    <PublicShell>
      <PageHero
        eyebrow="JURNAL"
        title="Catatan untuk membangun dengan lebih siap."
        description="Informasi seputar perencanaan, renovasi, material, dan proses konstruksi untuk membantu Anda membuat keputusan."
      />
      <section className="featured-article section">
        <img src={photos.blog} alt="" />
        <div>
          <Eyebrow>ARTIKEL PILIHAN</Eyebrow>
          <span>PERENCANAAN · [ TANGGAL PUBLIKASI ]</span>
          <h2>Hal yang Perlu Disiapkan Sebelum Memulai Renovasi</h2>
          <p>
            Persiapan yang baik membantu proses renovasi berjalan lebih terarah
            dan sesuai dengan kebutuhan utama.
          </p>
          <ButtonLink to="/blog/persiapan-renovasi" secondary>
            Baca Artikel
          </ButtonLink>
        </div>
      </section>
      <section className="archive section">
        <div className="filter-bar">
          <button className="active">Terbaru</button>
          <button>Perencanaan</button>
          <button>Material</button>
          <button>Konstruksi</button>
        </div>
        <div className="article-grid">
          {[...articles, ...articles].map((a, i) => (
            <ArticleCard key={i} article={a} />
          ))}
        </div>
      </section>
      <FinalCTA />
    </PublicShell>
  )
}

function BlogDetail() {
  return (
    <PublicShell>
      <article className="blog-detail">
        <header>
          <Eyebrow>PERENCANAAN</Eyebrow>
          <h1>Hal yang Perlu Disiapkan Sebelum Memulai Renovasi</h1>
          <p>[ TANGGAL PUBLIKASI ] · Waktu baca [ — ]</p>
        </header>
        <img
          className="blog-cover"
          src={photos.blog}
          alt="Detail konstruksi arsitektur"
        />
        <div className="article-body">
          <p className="lead">
            Renovasi yang terarah dimulai sebelum pekerjaan pertama dilakukan.
            Memahami kebutuhan, kondisi ruang, dan prioritas akan membantu
            proses berjalan lebih jelas.
          </p>
          <h2>Mulai dari kebutuhan, bukan tampilan</h2>
          <p>
            Sebelum menentukan material atau gaya, catat masalah utama yang
            ingin diselesaikan. Apakah ruang perlu lebih lega, lebih terang,
            atau memiliki fungsi baru? Urutan kebutuhan ini menjadi dasar dalam
            mengambil keputusan berikutnya.
          </p>
          <blockquote>
            Ruang yang tepat bukan hanya terlihat baik, tetapi bekerja baik
            untuk penggunanya.
          </blockquote>
          <h2>Kenali kondisi bangunan</h2>
          <p>
            Survei kondisi awal membantu memahami batasan dan kemungkinan yang
            tersedia. Bagian struktur, utilitas, pencahayaan, serta sirkulasi
            sebaiknya dilihat sebagai satu kesatuan.
          </p>
          <img src={photos.interior} alt="Interior bangunan modern" />
          <h2>Siapkan ruang untuk berdiskusi</h2>
          <p>
            Sampaikan prioritas, batasan, dan ekspektasi secara terbuka.
            Komunikasi sejak awal akan mempermudah penyusunan lingkup kerja dan
            mengurangi keputusan mendadak saat pengerjaan berlangsung.
          </p>
        </div>
      </article>
      <section className="related section">
        <SectionHead eyebrow="BACA BERIKUTNYA" title="Artikel terkait" />
        <div className="article-grid">
          {articles.slice(1).map((a) => (
            <ArticleCard key={a.title} article={a} />
          ))}
        </div>
      </section>
      <FinalCTA />
    </PublicShell>
  )
}

function Contact() {
  return (
    <PublicShell>
      <section className="contact-page">
        <div>
          <Eyebrow>KONTAK</Eyebrow>
          <h1>Mari bicarakan ruang yang ingin Anda bangun.</h1>
          <p>
            Ceritakan kebutuhan awal Anda. Konsultasi dilakukan langsung melalui
            WhatsApp untuk memahami konteks proyek dengan lebih baik.
          </p>
          <ButtonLink>Konsultasi via WhatsApp</ButtonLink>
        </div>
        <div className="contact-info">
          <div>
            <span>NAMA USAHA</span>
            <b>[ NAMA USAHA ]</b>
          </div>
          <div>
            <span>WHATSAPP</span>
            <b>[ NOMOR WHATSAPP ]</b>
          </div>
          <div>
            <span>LOKASI</span>
            <b>[ LOKASI ]</b>
          </div>
          <div>
            <span>SOSIAL MEDIA</span>
            <b>[ INSTAGRAM ]</b>
          </div>
        </div>
      </section>
      <section className="map-placeholder">
        <span>GOOGLE MAPS</span>
        <b>[ LOKASI / EMBED MAP ]</b>
      </section>
    </PublicShell>
  )
}

function AdminIcon({ type }: { type: string }) {
  const paths: Record<string, ReactNode> = {
    dashboard: (
      <>
        <rect x="4" y="4" width="6" height="6" />
        <rect x="14" y="4" width="6" height="6" />
        <rect x="4" y="14" width="6" height="6" />
        <rect x="14" y="14" width="6" height="6" />
      </>
    ),
    portfolio: (
      <>
        <rect x="3" y="5" width="18" height="14" />
        <path d="m3 16 5-5 4 4 3-3 6 5" />
      </>
    ),
    catalog: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
    blog: (
      <>
        <path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" />
      </>
    ),
    settings: <circle cx="12" cy="12" r="4" />,
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[type] || paths.dashboard}
    </svg>
  )
}

const adminNav = [
  ["Dashboard", "/admin", "dashboard"],
  ["Portfolio", "/admin/portfolio", "portfolio"],
  ["Katalog", "/admin/katalog", "catalog"],
  ["Blog", "/admin/blog", "blog"],
  ["Pengaturan", "/admin/pengaturan", "settings"],
]

function AdminShell({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="admin-shell">
      <aside className={open ? "open" : ""}>
        <div className="admin-brand">
          <span className="brand-mark">R</span>
          <span>
            [ NAMA USAHA ]<small>CONTENT STUDIO</small>
          </span>
        </div>
        <nav>
          {adminNav.map(([n, u, i]) => (
            <Link
              to={u}
              onClick={() => setOpen(false)}
              className={location.pathname === u ? "active" : ""}
            >
              <AdminIcon type={i} />
              {n}
            </Link>
          ))}
        </nav>
        <Link to="/" className="logout">
          Keluar ke situs <Arrow />
        </Link>
      </aside>
      <div className="admin-main">
        <header>
          <button onClick={() => setOpen(!open)} className="admin-menu">
            <MenuIcon close={open} />
          </button>
          <div>
            <span>ADMIN PANEL</span>
            <h1>{title}</h1>
          </div>
          <div className="avatar">AD</div>
        </header>
        {children}
      </div>
    </div>
  )
}

function AdminLogin() {
  const submit = (e: FormEvent) => {
    e.preventDefault()
    window.history.pushState({}, "", "/admin")
    window.dispatchEvent(new PopStateEvent("popstate"))
  }
  return (
    <div className="login-page">
      <div className="login-visual">
        <Link to="/" className="brand">
          <span className="brand-mark">R</span>
          <span>[ NAMA USAHA ]</span>
        </Link>
        <div>
          <Eyebrow>ADMIN STUDIO</Eyebrow>
          <h1>Kelola cerita di balik setiap ruang.</h1>
        </div>
        <span>CONTRACTOR & RENOVATION</span>
      </div>
      <form onSubmit={submit} className="login-form">
        <div>
          <span>PORTAL ADMIN</span>
          <h2>Selamat datang kembali.</h2>
          <p>Masuk untuk mengelola konten website.</p>
        </div>
        <label>
          Email
          <input type="email" placeholder="nama@email.com" required />
        </label>
        <label>
          Password
          <input type="password" placeholder="Masukkan password" required />
        </label>
        <button className="button" type="submit">
          Masuk ke Dashboard <Arrow />
        </button>
        <Link to="/">Kembali ke website</Link>
      </form>
    </div>
  )
}

function AdminDashboard() {
  return (
    <AdminShell title="Dashboard">
      <div className="admin-content">
        <section className="admin-welcome">
          <div>
            <p>Selamat datang kembali</p>
            <h2>Kelola konten dan tampilkan pekerjaan terbaik Anda.</h2>
          </div>
          <span>[ TANGGAL HARI INI ]</span>
        </section>
        <section className="stats">
          {[
            ["Total Proyek", "—", "portfolio"],
            ["Total Katalog", "—", "catalog"],
            ["Total Artikel", "—", "blog"],
          ].map(([x, n, icon]) => (
            <div>
              <AdminIcon type={icon} />
              <span>{x}</span>
              <b>{n}</b>
              <small>Data belum tersedia</small>
            </div>
          ))}
        </section>
        <section className="quick">
          <div className="admin-section-head">
            <div>
              <span>AKSI CEPAT</span>
              <h2>Mulai tambahkan konten</h2>
            </div>
          </div>
          <div>
            {[
              ["Tambah Proyek", "/admin/portfolio", "portfolio"],
              ["Tambah Katalog", "/admin/katalog", "catalog"],
              ["Tulis Artikel", "/admin/blog", "blog"],
            ].map(([x, u, icon]) => (
              <Link to={u}>
                <AdminIcon type={icon} />
                <span>
                  {x}
                  <small>Buat konten baru</small>
                </span>
                <Arrow />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  )
}

type ManagementProps = { type: "Portfolio" | "Katalog" | "Blog" }

function Management({ type }: ManagementProps) {
  const configs = {
    Portfolio: {
      button: "Tambah Proyek",
      labels: ["[ NAMA PROYEK ]", "Konstruksi", "[ LOKASI ]"],
      image: photos.p1,
    },
    Katalog: {
      button: "Tambah Katalog",
      labels: ["[ NAMA ITEM ]", "Layanan", "—"],
      image: photos.interior,
    },
    Blog: {
      button: "Tulis Artikel",
      labels: ["[ JUDUL ARTIKEL ]", "Perencanaan", "[ TANGGAL ]"],
      image: photos.blog,
    },
  }[type]
  const [form, setForm] = useState(false)
  return (
    <AdminShell title={type}>
      <div className="admin-content">
        <div className="management-head">
          <div>
            <span>MANAJEMEN KONTEN</span>
            <h2>{type}</h2>
            <p>
              Kelola, perbarui, dan publikasikan konten {type.toLowerCase()}.
            </p>
          </div>
          <button className="button" onClick={() => setForm(!form)}>
            {form ? "Kembali ke Daftar" : configs.button}
            <Arrow />
          </button>
        </div>
        {form ? (
          <ContentForm type={type} />
        ) : (
          <>
            <div className="admin-tools">
              <input placeholder={`Cari ${type.toLowerCase()}...`} />
              <select aria-label="Filter status">
                <option>Semua status</option>
                <option>Terbit</option>
                <option>Draft</option>
              </select>
            </div>
            <div className="admin-table">
              <div className="table-head">
                <span>Konten</span>
                <span>Kategori</span>
                <span>Informasi</span>
                <span>Status</span>
                <span>Aksi</span>
              </div>
              {[1, 2, 3].map((i) => (
                <div className="table-row">
                  <img src={configs.image} alt="" />
                  <div className="mobile-record">
                    <b>
                      {configs.labels[0]} 0{i}
                    </b>
                    <small>Diperbarui [ TANGGAL ]</small>
                  </div>
                  <span>{configs.labels[1]}</span>
                  <span>{configs.labels[2]}</span>
                  <span className="status">{i === 3 ? "Draft" : "Terbit"}</span>
                  <div className="row-actions">
                    <button>Edit</button>
                    <button>Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminShell>
  )
}

function ContentForm({ type }: ManagementProps) {
  const isBlog = type === "Blog",
    isPortfolio = type === "Portfolio"
  return (
    <form className="content-form" onSubmit={(e) => e.preventDefault()}>
      <section>
        <div className="form-section-title">
          <span>01</span>
          <div>
            <h3>Informasi utama</h3>
            <p>Lengkapi informasi dasar konten.</p>
          </div>
        </div>
        <div className="form-grid">
          <label>
            {isBlog ? "Judul Artikel" : isPortfolio ? "Judul Proyek" : "Nama"}
            <input
              placeholder={`Masukkan ${
                isBlog ? "judul artikel" : isPortfolio ? "judul proyek" : "nama"
              }`}
            />
          </label>
          {isBlog && (
            <label>
              Slug
              <input placeholder="judul-artikel" />
            </label>
          )}
          <label>
            Kategori
            <select>
              <option>Pilih kategori</option>
            </select>
          </label>
          {isPortfolio && (
            <>
              <label>
                Lokasi
                <input placeholder="[ LOKASI ]" />
              </label>
              <label>
                Tahun
                <input placeholder="[ TAHUN ]" />
              </label>
            </>
          )}
          {isBlog && (
            <label>
              Tanggal Publikasi
              <input type="date" />
            </label>
          )}
          <label className="full">
            Deskripsi / Konten
            {isBlog ? (
              <div className="editor">
                <div>
                  <button type="button">
                    <b>B</b>
                  </button>
                  <button type="button">
                    <i>I</i>
                  </button>
                  <button type="button">H2</button>
                  <button type="button">List</button>
                </div>
                <textarea placeholder="Tulis isi artikel..." />
              </div>
            ) : (
              <textarea placeholder="Tulis deskripsi..." />
            )}
          </label>
        </div>
      </section>
      <section>
        <div className="form-section-title">
          <span>02</span>
          <div>
            <h3>Media</h3>
            <p>Unggah gambar berkualitas untuk konten.</p>
          </div>
        </div>
        <label className="upload">
          <input type="file" accept="image/*" />
          <AdminIcon type="portfolio" />
          <b>
            {isBlog
              ? "Unggah thumbnail"
              : isPortfolio
                ? "Unggah featured image"
                : "Unggah gambar"}
          </b>
          <span>JPG, PNG, WEBP</span>
        </label>
        {isPortfolio && (
          <label className="upload small">
            <input type="file" multiple accept="image/*" />
            <b>Tambah gambar galeri</b>
          </label>
        )}
      </section>
      <section>
        <div className="form-section-title">
          <span>03</span>
          <div>
            <h3>Publikasi</h3>
            <p>Atur status konten.</p>
          </div>
        </div>
        <label>
          Status
          <select>
            <option>Draft</option>
            <option>Terbit</option>
          </select>
        </label>
      </section>
      <div className="form-actions">
        <button type="button" className="button button-secondary">
          Simpan Draft
        </button>
        <button className="button">
          Publikasikan <Arrow />
        </button>
      </div>
    </form>
  )
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const update = () => {
      setPath(window.location.pathname)
      window.scrollTo({ top: 0, behavior: "instant" })
    }
    addEventListener("popstate", update)
    return () => removeEventListener("popstate", update)
  }, [])
  if (path === "/tentang") return <About />
  if (path === "/layanan") return <Services />
  if (path === "/portfolio") return <Portfolio />
  if (path.startsWith("/portfolio/")) return <PortfolioDetail />
  if (path === "/katalog") return <Catalog />
  if (path === "/blog") return <Blog />
  if (path.startsWith("/blog/")) return <BlogDetail />
  if (path === "/kontak") return <Contact />
  if (path === "/admin/login") return <AdminLogin />
  if (path === "/admin/portfolio") return <Management type="Portfolio" />
  if (path === "/admin/katalog") return <Management type="Katalog" />
  if (path === "/admin/blog") return <Management type="Blog" />
  if (path.startsWith("/admin")) return <AdminDashboard />
  return <Home />
}

export default App
