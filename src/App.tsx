import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  CircleHelp,
  Download,
  Image as ImageIcon,
  Menu,
  Monitor,
  Sparkles,
  WandSparkles,
  X,
  Zap,
  Heart,
  Clock3,
  SlidersHorizontal,
  Layers3,
  Palette,
  Laptop,
} from 'lucide-react'

import './styles.css'

const DOWNLOAD_URL =
  'https://github.com/prazwal7-cell/AuraWall-Downloads/releases/download/v0.1.0/AuraWall_0.1.0_x64-setup.exe'

const VERSION = '0.1.0'

type Page =
  | 'home'
  | 'features'
  | 'ai-studio'
  | 'gallery'
  | 'downloads'
  | 'support'
  | 'about'
  | 'privacy'
  | 'terms'

type LinkFunction = (
  target: Page,
  label: ReactNode,
  className?: string
) => ReactNode

const wallpapers = [
  {
    title: 'Beyond the Peaks',
    category: 'Nature',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    description:
      'A dramatic mountain landscape for a calm, focused desktop.',
  },
  {
    title: 'Quiet Geometry',
    category: 'Abstract',
    image:
      'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?auto=format&fit=crop&w=1200&q=85',
    description:
      'Color, shape, and movement in a clean abstract composition.',
  },
  {
    title: 'Into the Blue',
    category: 'Ocean',
    image:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=85',
    description:
      'A refreshing ocean view with a sense of open space.',
  },
  {
    title: 'After the Rain',
    category: 'Nature',
    image:
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=85',
    description: 'Soft light across a peaceful landscape.',
  },
  {
    title: 'Infinite Distance',
    category: 'Space',
    image:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=85',
    description: 'A glimpse into the scale and beauty of the cosmos.',
  },
  {
    title: 'Open Horizons',
    category: 'Minimal',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
    description: 'A quiet composition with room for your desktop.',
  },
]

const featureItems = [
  {
    icon: ImageIcon,
    title: 'Wallpaper discovery',
    text: 'Browse a curated collection of desktop backgrounds across visual categories, from landscapes to abstract artwork.',
  },
  {
    icon: Heart,
    title: 'Favorites',
    text: 'Save wallpapers you like and return to your personal favorites whenever you want.',
  },
  {
    icon: Clock3,
    title: 'Recently viewed',
    text: 'Quickly revisit wallpapers you have opened recently without searching for them again.',
  },
  {
    icon: Download,
    title: 'Download wallpapers',
    text: 'Download wallpaper images to your computer for use wherever you need them.',
  },
  {
    icon: Monitor,
    title: 'Set as desktop wallpaper',
    text: 'Apply a selected wallpaper directly to your Windows desktop from the AuraWall application.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Sort and filter',
    text: 'Explore the collection using available category, sorting, and resolution filters.',
  },
  {
    icon: WandSparkles,
    title: 'AI Studio',
    text: 'Create original wallpaper concepts from text prompts using the integrated AI Studio experience.',
  },
  {
    icon: Layers3,
    title: 'Saved AI creations',
    text: 'Keep your generated images and prompts together in your local AI creations collection.',
  },
]

const faqs: [string, string][] = [
  [
    'What is AuraWall?',
    'AuraWall is a Windows desktop wallpaper application for discovering, saving, downloading, and setting wallpapers, with an integrated AI Studio for creating personalized wallpaper images.',
  ],
  [
    'Which operating system is supported?',
    'The current release is built for Windows desktop. Check the release information for the installer and any updated compatibility notes.',
  ],
  [
    'How do I install AuraWall?',
    'Download the Windows installer from the Downloads page, open the downloaded installer, and follow the installation prompts shown by Windows.',
  ],
  [
    'How do I create an AI wallpaper?',
    'Open AI Studio in AuraWall, describe the image you want in the prompt field, and start generation. When the image is ready, preview it and use the available save, download, or set-wallpaper actions.',
  ],
  [
    'Where are my AI creations saved?',
    'AuraWall stores saved AI creations locally in the application using IndexedDB. They are not stored in an AuraWall online account.',
  ],
  [
    'Do I need an AuraWall account?',
    'The current application does not require an AuraWall account to use its core features.',
  ],
  [
    'Can I use my own wallpaper images?',
    'The current website describes the features available in the AuraWall application. Support for importing personal image files is not advertised here unless it is added to a future release.',
  ],
  [
    'Where can I get help?',
    'For support, use the contact channel published by the AuraWall team when it becomes available. Until then, consult the installation and troubleshooting information on this page.',
  ],
]

function getPageFromPath(): Page {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  const routes: Record<string, Page> = {
    '/': 'home',
    '/features': 'features',
    '/ai-studio': 'ai-studio',
    '/gallery': 'gallery',
    '/downloads': 'downloads',
    '/support': 'support',
    '/about': 'about',
    '/privacy': 'privacy',
    '/terms': 'terms',
  }

  return routes[path] || 'home'
}

function pageTitle(page: Page): string {
  const titles: Record<Page, string> = {
    home: 'A new perspective',
    features: 'Features',
    'ai-studio': 'AI Studio',
    gallery: 'Gallery',
    downloads: 'Downloads',
    support: 'Help & Support',
    about: 'About',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
  }

  return titles[page]
}

function App() {
  const [page, setPage] = useState<Page>(getPageFromPath)
  const [menuOpen, setMenuOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(0)

  useEffect(() => {
    const onPopState = () => {
      setPage(getPageFromPath())
      setMenuOpen(false)
      window.scrollTo(0, 0)
    }

    window.addEventListener('popstate', onPopState)

    return () => {
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  useEffect(() => {
    document.title = `${pageTitle(page)} | AuraWall`
  }, [page])

  function navigate(next: Page) {
    const path = next === 'home' ? '/' : `/${next}`

    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path)
    }

    setPage(next)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const link: LinkFunction = (target, label, className = '') => (
    <a
      href={target === 'home' ? '/' : `/${target}`}
      className={className}
      onClick={(event) => {
        event.preventDefault()
        navigate(target)
      }}
    >
      {label}
    </a>
  )

  const navItems: [Page, string][] = [
    ['features', 'Features'],
    ['ai-studio', 'AI Studio'],
    ['gallery', 'Gallery'],
    ['downloads', 'Downloads'],
    ['support', 'Support'],
    ['about', 'About'],
  ]

  return (
    <main>
      <header className="site-header">
        {link(
          'home',
          <>
            <img
              className="aurawall-logo"
              src="/assets/aurawall-logo.png"
              alt=""
            />
            <span>
              Aura<span className="brand-light">Wall</span>
            </span>
          </>,
          'brand'
        )}

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {navItems.map(([target, label]) => (
            <ReactLink
              key={target}
              target={target}
              label={label}
              link={link}
            />
          ))}

          {link(
            'downloads',
            <>
              Get AuraWall <ArrowUpRight size={15} />
            </>,
            'nav-download'
          )}
        </nav>
      </header>

      {page === 'home' && <Home link={link} />}
      {page === 'features' && <Features link={link} />}
      {page === 'ai-studio' && <AIStudio link={link} />}
      {page === 'gallery' && <Gallery />}
      {page === 'downloads' && <Downloads />}
      {page === 'support' && (
        <Support faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
      )}
      {page === 'about' && <About />}
      {page === 'privacy' && <LegalPrivacy />}
      {page === 'terms' && <LegalTerms />}

      <footer className="site-footer">
        <div className="footer-top">
          {link(
            'home',
            <>
              <img
                className="aurawall-logo"
                src="/assets/aurawall-logo.png"
                alt=""
              />
              <span>
                Aura<span className="brand-light">Wall</span>
              </span>
            </>,
            'brand footer-brand'
          )}

          <p>
            A little more inspiration
            <br />
            in every view.
          </p>

          <div className="footer-links">
            {navItems.map(([target, label]) => (
              <ReactLink
                key={target}
                target={target}
                label={label}
                link={link}
              />
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} AuraWall. All rights reserved.
          </span>

          <span className="company-credit">
            A PRODUCT BY
            <img
              className="cygnus-logo"
              src="/assets/cygnus-tech-logo.png"
              alt="Cygnus Tech"
            />
            <b>CYGNUS TECH</b>
          </span>

          <div className="legal-links">
            {link('privacy', 'Privacy')}
            {link('terms', 'Terms')}
          </div>
        </div>
      </footer>
    </main>
  )
}

function ReactLink({
  target,
  label,
  link,
}: {
  target: Page
  label: ReactNode
  link: LinkFunction
}) {
  return <>{link(target, label)}</>
}

function PageIntro({
  kicker,
  title,
  description,
}: {
  kicker: string
  title: ReactNode
  description: string
}) {
  return (
    <section className="page-intro">
      <div className="section-kicker">{kicker}</div>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}

function Home({ link }: { link: LinkFunction }) {
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-glow" />

        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            YOUR DESKTOP, REIMAGINED
          </div>

          <h1>
            Make your
            <br />
            <span>screen yours.</span>
          </h1>

          <p className="hero-copy">
            Discover wallpapers that inspire you. Create something original.
            Give your desktop a little more personality with AuraWall.
          </p>

          <div className="hero-actions">
            {link(
              'downloads',
              <>
                Discover AuraWall <ArrowRight size={17} />
              </>,
              'button button-primary'
            )}

            {link(
              'features',
              <>
                Explore features <ArrowDown size={16} />
              </>,
              'button button-quiet'
            )}
          </div>

          <div className="hero-note">
            <span className="status-dot" />
            Built for Windows
            <span className="note-divider">·</span>
            A product by Cygnus Tech
          </div>
        </div>

        <div className="hero-art">
          <div className="art-frame">
            <img
              src={wallpapers[3].image}
              alt="Sunlight falling over a misty mountain landscape"
            />
            <div className="art-shade" />

            <div className="art-caption">
              <span>01 / FIND YOUR VIEW</span>
              <span>WALLPAPER COLLECTION</span>
            </div>
          </div>

          <div className="floating-chip">
            <span className="chip-icon">
              <Sparkles size={15} />
            </span>

            <span>
              <b>Made to inspire</b>
              <small>Every time you look</small>
            </span>
          </div>
        </div>

        <div className="hero-bottom">
          <span>01 — A NEW PERSPECTIVE</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
      </section>

      <section className="intro-section">
        <div className="section-kicker">
          MEET AURAWALL <span>✳</span>
        </div>

        <div className="intro-grid">
          <h2>
            A better view
            <br />
            starts <em>here.</em>
          </h2>

          <div className="intro-copy">
            <p>
              Your desktop is a space you return to every day. AuraWall brings
              wallpaper discovery, personal collections, direct desktop
              application, and AI-assisted creation together in one focused
              Windows experience.
            </p>

            <span className="byline">
              AN ORIGINAL PRODUCT FROM <b>CYGNUS TECH</b>
            </span>
          </div>
        </div>
      </section>

      <section className="home-detail section-pad">
        <div className="section-heading">
          <div>
            <div className="section-kicker">MORE THAN A BACKGROUND</div>
            <h2>
              Your desktop,
              <br />
              <em>your space.</em>
            </h2>
          </div>

          <p className="section-lead">
            Explore, collect, and create wallpapers with tools designed to
            make personalizing your desktop straightforward.
          </p>
        </div>

        <div className="feature-grid">
          {featureItems.slice(0, 3).map((item, index) => (
            <FeatureCard key={item.title} item={item} index={index} />
          ))}
        </div>

        <div className="center-action">
          {link(
            'features',
            <>
              Explore all features <ArrowRight size={16} />
            </>,
            'text-link'
          )}
        </div>
      </section>

      <section className="home-gallery">
        <div className="section-heading">
          <div>
            <div className="section-kicker">A LITTLE INSPIRATION</div>
            <h2>
              Find your <em>everyday.</em>
            </h2>
          </div>

          {link(
            'gallery',
            <>
              View gallery <ArrowUpRight size={16} />
            </>,
            'text-link'
          )}
        </div>

        <WallpaperGrid items={wallpapers.slice(0, 3)} />
      </section>

      <section className="home-ai">
        <div className="ai-visual">
          <div className="ai-image-main">
            <img src={wallpapers[4].image} alt="Star-filled universe" />
          </div>

          <div className="ai-image-small">
            <img src={wallpapers[5].image} alt="Mountain landscape" />
          </div>

          <div className="ai-stamp">
            <Sparkles size={17} />
            <span>
              IMAGINE
              <br />
              WHAT'S NEXT
            </span>
          </div>
        </div>

        <div className="ai-copy">
          <div className="section-kicker">YOUR IDEAS, YOUR WALLPAPER</div>

          <h2>
            Meet your
            <br />
            <em>AI artist.</em>
          </h2>

          <p>
            Describe a scene, mood, or visual idea and explore an original
            wallpaper created through AuraWall AI Studio.
          </p>

          {link(
            'ai-studio',
            <>
              Discover AI Studio <ArrowUpRight size={17} />
            </>,
            'text-link'
          )}
        </div>
      </section>

      <section className="download-section">
        <div className="download-glow" />
        <div className="section-kicker">READY FOR A FRESH VIEW?</div>

        <h2>
          Your desktop.
          <br />
          <em>Your atmosphere.</em>
        </h2>

        <p>Bring a little more inspiration to your everyday screen.</p>

        {link(
          'downloads',
          <>
            Explore downloads <ArrowRight size={17} />
          </>,
          'button button-primary download-button'
        )}

        <span className="download-caption">
          <Zap size={13} /> Windows desktop application
        </span>
      </section>
    </>
  )
}

function FeatureCard({
  item,
  index,
}: {
  item: (typeof featureItems)[number]
  index: number
}) {
  const Icon = item.icon

  return (
    <article className="feature-card">
      <div className="feature-top">
        <span>0{index + 1}</span>
        <Icon size={21} strokeWidth={1.5} />
      </div>

      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <div className="feature-line" />
    </article>
  )
}

function Features({ link }: { link: LinkFunction }) {
  return (
    <>
      <PageIntro
        kicker="THE AURAWALL EXPERIENCE"
        title={
          <>
            Thoughtfully made.
            <br />
            <em>Easy to explore.</em>
          </>
        }
        description="A closer look at the tools that bring wallpaper discovery, personal organization, and AI-assisted creativity together in AuraWall for Windows."
      />

      <section className="content-section">
        <div className="feature-grid feature-grid-wide">
          {featureItems.map((item, index) => (
            <FeatureCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className="split-info">
        <div>
          <div className="section-kicker">A FOCUSED WORKFLOW</div>
          <h2>
            From discovery
            <br />
            to <em>desktop.</em>
          </h2>
        </div>

        <div className="prose">
          <p>
            Browse the available collection, open a wallpaper to take a closer
            look, and use the app's controls to save it, download it, or set it
            as your desktop background.
          </p>

          <p>
            Favorites and recently viewed items help you keep track of images
            you want to revisit. Sorting and resolution filters make it easier
            to narrow down the collection.
          </p>

          {link(
            'downloads',
            <>
              Get AuraWall <ArrowRight size={16} />
            </>,
            'text-link'
          )}
        </div>
      </section>
    </>
  )
}

function AIStudio({ link }: { link: LinkFunction }) {
  return (
    <>
      <PageIntro
        kicker="CREATIVITY, BUILT IN"
        title={
          <>
            Your ideas.
            <br />
            <em>Your wallpaper.</em>
          </>
        }
        description="AuraWall AI Studio brings text-guided image creation into your desktop wallpaper workflow. Start with an idea and shape a visual that feels like yours."
      />

      <section className="ai-detail">
        <div className="ai-visual">
          <div className="ai-image-main">
            <img src={wallpapers[4].image} alt="Cosmic wallpaper inspiration" />
          </div>

          <div className="ai-image-small">
            <img
              src={wallpapers[5].image}
              alt="Landscape wallpaper inspiration"
            />
          </div>

          <div className="ai-stamp">
            <Sparkles size={17} />
            <span>
              IMAGINE
              <br />
              WHAT'S NEXT
            </span>
          </div>
        </div>

        <div className="prose">
          <h2>How the creative flow works</h2>

          <ol className="numbered-list">
            <li>
              <b>Describe your idea.</b>
              <span>
                Write a prompt describing the subject, setting, atmosphere,
                colors, and style you want to explore.
              </span>
            </li>

            <li>
              <b>Generate an image.</b>
              <span>
                Send your prompt through AuraWall AI Studio and wait for the
                image generation to complete.
              </span>
            </li>

            <li>
              <b>Preview your result.</b>
              <span>
                Review the generated image before deciding what to do with it.
              </span>
            </li>

            <li>
              <b>Keep or use your creation.</b>
              <span>
                Use the available controls to download, set as wallpaper, or
                save your creation in the app.
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className="content-section tinted">
        <div className="section-heading">
          <div>
            <div className="section-kicker">MAKE YOUR PROMPTS CLEAR</div>
            <h2>
              A little detail
              <br />
              <em>goes a long way.</em>
            </h2>
          </div>
        </div>

        <div className="three-columns">
          <article>
            <Palette />
            <h3>Describe the scene</h3>
            <p>
              Say what should appear in the image: a mountain lake, a
              futuristic city, a quiet forest, or an abstract composition.
            </p>
          </article>

          <article>
            <Sparkles />
            <h3>Set the atmosphere</h3>
            <p>
              Add mood, lighting, color palette, weather, time of day, or other
              visual details that help communicate your idea.
            </p>
          </article>

          <article>
            <Monitor />
            <h3>Think desktop</h3>
            <p>
              Mention that you want a wallpaper composition, and consider
              where desktop icons and windows may sit on the screen.
            </p>
          </article>
        </div>
      </section>

      <section className="split-info">
        <div>
          <div className="section-kicker">YOUR CREATIONS</div>
          <h2>
            Keep the ideas
            <br />
            <em>you love.</em>
          </h2>
        </div>

        <div className="prose">
          <p>
            AuraWall's AI creations collection stores saved images and their
            prompt details locally on your device using IndexedDB. The current
            app does not require an AuraWall account to keep this local
            collection.
          </p>

          <p>
            AI image generation relies on an online service, so a working
            internet connection is required when you request a new image.
            Prompts are sent to the service that processes the generation
            request.
          </p>

          {link(
            'privacy',
            <>
              Read the privacy information <ArrowRight size={16} />
            </>,
            'text-link'
          )}
        </div>
      </section>
    </>
  )
}

function WallpaperGrid({
  items,
}: {
  items: typeof wallpapers
}) {
  return (
    <div className="wallpaper-grid">
      {items.map((wallpaper, index) => (
        <article className="wallpaper-card" key={wallpaper.title}>
          <img
            src={wallpaper.image}
            alt={wallpaper.title}
            loading="lazy"
          />

          <div className="wallpaper-overlay" />

          <div className="wallpaper-info">
            <span>{wallpaper.category}</span>
            <h3>{wallpaper.title}</h3>
            <p>{wallpaper.description}</p>
          </div>

          <span className="wallpaper-number">0{index + 1}</span>
        </article>
      ))}
    </div>
  )
}

function Gallery() {
  const [filter, setFilter] = useState('All')

  const categories = [
    'All',
    'Nature',
    'Abstract',
    'Ocean',
    'Space',
    'Minimal',
  ]

  const visible =
    filter === 'All'
      ? wallpapers
      : wallpapers.filter((item) => item.category === filter)

  return (
    <>
      <PageIntro
        kicker="VISUAL INSPIRATION"
        title={
          <>
            A collection of
            <br />
            <em>different worlds.</em>
          </>
        }
        description="A small preview of the visual directions and categories represented in the AuraWall experience. The in-app collection may evolve over time."
      />

      <section className="content-section">
        <div className="filter-row">
          {categories.map((category) => (
            <button
              key={category}
              className={
                filter === category ? 'filter-chip active' : 'filter-chip'
              }
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <WallpaperGrid items={visible} />

        <p className="gallery-disclaimer">
          Preview imagery is provided for website presentation. Availability
          and image details inside the AuraWall application may differ.
        </p>
      </section>
    </>
  )
}

function Downloads() {
  return (
    <>
      <PageIntro
        kicker="GET STARTED"
        title={
          <>
            A fresh view is
            <br />
            <em>within reach.</em>
          </>
        }
        description="Download AuraWall for Windows and explore wallpaper discovery, personal collections, desktop wallpaper controls, and AI Studio in one application."
      />

      <section className="download-detail">
        <div className="download-card">
          <div className="download-card-icon">
            <Laptop size={30} />
          </div>

          <div className="section-kicker">CURRENT WINDOWS RELEASE</div>

          <h2>
            AuraWall <em>{VERSION}</em>
          </h2>

          <p>Windows desktop installer</p>

          <a className="button button-primary" href={DOWNLOAD_URL}>
            <Download size={17} />
            Download installer
            <ArrowDown size={16} />
          </a>

          <span className="download-caption">
            Installer hosted on GitHub Releases
          </span>
        </div>

        <div className="prose">
          <h2>Installation guide</h2>

          <ol className="numbered-list">
            <li>
              <b>Download the installer.</b>
              <span>
                Select the download button to get the Windows installer from
                the AuraWall release page.
              </span>
            </li>

            <li>
              <b>Open the downloaded file.</b>
              <span>
                Locate the installer in your Downloads folder and open it.
              </span>
            </li>

            <li>
              <b>Follow the Windows prompts.</b>
              <span>
                Review the prompts displayed by Windows and continue if you
                trust the source and wish to install AuraWall.
              </span>
            </li>

            <li>
              <b>Launch AuraWall.</b>
              <span>
                Open the application and start exploring wallpapers and AI
                Studio.
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className="content-section tinted">
        <div className="section-heading">
          <div>
            <div className="section-kicker">RELEASE INFORMATION</div>
            <h2>
              Version <em>{VERSION}</em>
            </h2>
          </div>
        </div>

        <div className="release-grid">
          <div>
            <b>Platform</b>
            <span>Windows desktop</span>
          </div>

          <div>
            <b>Package</b>
            <span>64-bit Windows installer</span>
          </div>

          <div>
            <b>Release channel</b>
            <span>GitHub Releases</span>
          </div>

          <div>
            <b>Version</b>
            <span>{VERSION}</span>
          </div>
        </div>

        <p className="small-note">
          System requirements and detailed change history will be published
          here as verified release information becomes available. Always use
          the official AuraWall download link.
        </p>
      </section>
    </>
  )
}

function Support({
  faqOpen,
  setFaqOpen,
}: {
  faqOpen: number | null
  setFaqOpen: (value: number | null) => void
}) {
  return (
    <>
      <PageIntro
        kicker="WE'RE HERE TO HELP"
        title={
          <>
            Get to know
            <br />
            <em>AuraWall.</em>
          </>
        }
        description="Find answers to common questions about installing AuraWall, using its wallpaper tools, and exploring AI Studio."
      />

      <section className="content-section support-layout">
        <div>
          <div className="section-kicker">FREQUENTLY ASKED QUESTIONS</div>
          <h2>
            Good to
            <br />
            <em>know.</em>
          </h2>
          <p className="section-lead">
            Choose a question to expand its answer.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <article className="faq-item" key={question}>
              <button
                onClick={() =>
                  setFaqOpen(faqOpen === index ? null : index)
                }
                aria-expanded={faqOpen === index}
              >
                <span>{question}</span>

                <ChevronRight
                  className={
                    faqOpen === index
                      ? 'faq-chevron open'
                      : 'faq-chevron'
                  }
                  size={18}
                />
              </button>

              {faqOpen === index && <p>{answer}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="support-note">
        <CircleHelp size={25} />

        <div>
          <h3>Still need help?</h3>
          <p>
            A dedicated support email and additional help resources can be
            added here before public launch. We have intentionally not
            displayed an unverified contact address.
          </p>
        </div>
      </section>
    </>
  )
}

function About() {
  return (
    <>
      <PageIntro
        kicker="A PRODUCT BY CYGNUS TECH"
        title={
          <>
            A more personal
            <br />
            <em>desktop experience.</em>
          </>
        }
        description="AuraWall is a Windows desktop product created to make wallpaper discovery and personalization feel simple, expressive, and accessible."
      />

      <section className="split-info about-split">
        <div className="company-logo-panel">
          <img
            src="/assets/cygnus-tech-logo.png"
            alt="Cygnus Tech logo"
          />
          <span>CYGNUS TECH</span>
          <small>BUILDING DIGITAL EXPERIENCES</small>
        </div>

        <div className="prose">
          <h2>Meet the team behind AuraWall</h2>

          <p>
            Cygnus Tech is the technology brand behind AuraWall. AuraWall is
            presented as a focused desktop product, with room to grow
            alongside future tools and experiences.
          </p>

          <p>
            The product direction brings together a curated wallpaper
            experience, practical desktop controls, and AI-assisted creativity
            in one Windows application.
          </p>

          <p>
            As AuraWall evolves, this website will serve as its home for
            product information, release updates, documentation, and support
            resources.
          </p>
        </div>
      </section>

      <section className="content-section tinted">
        <div className="section-kicker">OUR PRODUCT PRINCIPLES</div>

        <div className="three-columns">
          <article>
            <Sparkles />
            <h3>Inspiration</h3>
            <p>
              Make it easier to discover visual ideas and bring personality to
              the desktop.
            </p>
          </article>

          <article>
            <Monitor />
            <h3>Practicality</h3>
            <p>
              Keep everyday wallpaper actions together in a clear desktop
              experience.
            </p>
          </article>

          <article>
            <Zap />
            <h3>Creativity</h3>
            <p>
              Make space for personal expression through AI-assisted wallpaper
              creation.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}

function LegalPrivacy() {
  return (
    <>
      <PageIntro
        kicker="LEGAL INFORMATION"
        title={
          <>
            Privacy <em>Policy.</em>
          </>
        }
        description="Learn how AuraWall handles information when you visit our website or use its features."
      />

      <section className="legal-content prose">
        <p>
          <b>Last updated: November 6, 2026</b>
        </p>

        <h2>1. Introduction</h2>
        <p>
          AuraWall is a wallpaper application developed by Cygnus Tech.
          This Privacy Policy explains the information that may be processed
          when you visit the AuraWall website or use AuraWall features.
        </p>

        <h2>2. Information you provide</h2>
        <p>
          When you use AI Studio, the text prompt you submit is transmitted
          to our AI generation infrastructure for processing. The request
          is handled through Cloudflare infrastructure and its AI services.
          Avoid including passwords, financial information, or other
          sensitive personal information in your prompts.
        </p>

        <h2>3. Information stored on your device</h2>
        <p>
          AuraWall uses local storage technologies to support application
          features such as favorites, recently viewed wallpapers, and saved
          AI creations.
        </p>
        <p>
          Depending on the feature, locally stored information may include
          wallpaper identifiers, generated images, AI prompts, and creation
          dates. AI creations are stored using IndexedDB. Other application
          preferences may use localStorage.
        </p>
        <p>
          These features do not require an AuraWall account. Local data
          remains on your device unless it is removed through the
          application or cleared from its local application storage.
        </p>

        <h2>4. Third-party services</h2>
        <p>
          AuraWall uses third-party infrastructure and resources to provide
          certain features. These may include:
        </p>
        <ul>
          <li>
            Cloudflare infrastructure for processing AI generation requests.
          </li>
          <li>
            Unsplash for demonstration imagery used on the website.
          </li>
          <li>
            Google Fonts for website typography.
          </li>
        </ul>
        <p>
          When your browser connects to these services, they may receive
          technical information such as your IP address, browser information,
          and connection data. Their processing of information is governed
          by their respective privacy policies and terms.
        </p>

        <h2>5. Data sharing and advertising</h2>
        <p>
          Information may be processed by third-party service providers
          where necessary to operate website resources and application
          features. The handling of information by those providers is
          subject to their applicable policies and agreements.
        </p>
        <p>
          Any future analytics, advertising, or additional third-party
          integrations will require this policy to be reviewed and updated
          to accurately describe the information involved.
        </p>

        <h2>6. Data retention and deletion</h2>
        <p>
          Information stored locally by AuraWall can generally be removed
          by deleting the relevant items within the application or clearing
          the application's local storage.
        </p>
        <p>
          Information transmitted to third-party services may be retained
          according to those providers' applicable retention policies.
          Consult the relevant provider policies for further details.
        </p>

        <h2>7. Security</h2>
        <p>
          We aim to use appropriate measures to protect the information
          processed through AuraWall. However, no internet transmission
          or electronic storage method can be guaranteed to be completely
          secure.
        </p>

        <h2>8. Changes to this policy</h2>
        <p>
          This Privacy Policy may be updated when AuraWall introduces new
          features, services, or changes to its data practices. The updated
          date will be displayed at the beginning of this page.
        </p>

        <h2>9. Contact</h2>
        <p>
          For privacy-related questions, contact information will be
          provided here before public release.
        </p>
      </section>
    </>
  )
}

function LegalTerms() {
  return (
    <>
      <PageIntro
        kicker="LEGAL INFORMATION"
        title={
          <>
            Terms of <em>Use.</em>
          </>
        }
        description="Please review these terms before using AuraWall and its features."
      />

      <section className="legal-content prose">
        <p>
          <b>Last updated: November 6, 2026</b>
        </p>

        <h2>1. Introduction</h2>
        <p>
          AuraWall is a Windows desktop wallpaper application developed
          by Cygnus Tech. These Terms of Use describe general conditions
          for accessing and using the AuraWall website and application.
        </p>

        <h2>2. Acceptable use</h2>
        <p>
          You agree to use AuraWall responsibly and in accordance with
          applicable laws. You must not use its features to create,
          distribute, or otherwise use content in ways that violate
          applicable laws or the rights of others.
        </p>

        <h2>3. Wallpapers and third-party content</h2>
        <p>
          AuraWall may display or provide images and other materials
          originating from third-party sources. Such materials may be
          subject to separate copyright protections, licenses, and
          usage conditions.
        </p>
        <p>
          Downloading an image through AuraWall does not automatically
          grant ownership of that image or permission to redistribute
          it, sell it, or use it commercially. Users are responsible
          for checking applicable licenses and permissions.
        </p>

        <h2>4. AI-generated content</h2>
        <p>
          AuraWall AI Studio provides tools for generating wallpaper
          images from user-submitted text prompts. Generation depends
          on third-party AI infrastructure and network availability.
        </p>
        <p>
          AI-generated results may be inaccurate, unexpected, similar
          to existing works, or unsuitable for particular purposes.
          Results are not guaranteed to be unique or free from
          third-party rights.
        </p>
        <p>
          Users are responsible for reviewing generated content and
          ensuring that their intended use complies with applicable
          laws and intellectual property rights.
        </p>

        <h2>5. Intellectual property</h2>
        <p>
          AuraWall's original branding, website design, application
          interface, and associated materials are owned by or used
          under permission by their respective rights holders.
        </p>
        <p>
          Third-party names, logos, images, and materials remain the
          property of their respective owners.
        </p>

        <h2>6. Availability and updates</h2>
        <p>
          We may update, modify, suspend, or discontinue application
          features and website services as development progresses.
          Online features may depend on third-party services that
          are outside our direct control.
        </p>

        <h2>7. Disclaimer</h2>
        <p>
          AuraWall is provided subject to applicable consumer protection
          laws and other legal requirements. No statement in these terms
          is intended to exclude rights or protections that cannot
          legally be excluded.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          Any limitation of liability applicable to AuraWall will be
          subject to mandatory laws and consumer rights in the
          jurisdiction concerned. Nothing in these terms excludes
          liability where such exclusion is prohibited by law.
        </p>

        <h2>9. Changes to these terms</h2>
        <p>
          These Terms of Use may be updated as AuraWall develops.
          Material changes will be reflected on this page with an
          updated revision date.
        </p>

        <h2>10. Contact</h2>
        <p>
          Official support and legal contact information will be
          published here before public release.
        </p>
      </section>
    </>
  )
}

export default App