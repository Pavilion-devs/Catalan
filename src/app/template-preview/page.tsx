'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import './template.css'

// Declare global types for GSAP and Lenis
declare global {
  interface Window {
    gsap: typeof import('gsap')
    ScrollTrigger: unknown
    Lenis: new (options: LenisOptions) => LenisInstance
    lenis: LenisInstance
  }
}

interface LenisOptions {
  duration?: number
  easing?: (t: number) => number
  direction?: 'vertical' | 'horizontal'
  gestureDirection?: 'vertical' | 'horizontal'
  smooth?: boolean
  mouseMultiplier?: number
  smoothTouch?: boolean
  touchMultiplier?: number
}

interface LenisInstance {
  raf: (time: number) => void
  on: (event: string, callback: () => void) => void
  stop: () => void
  start: () => void
  scrollTo: (target: Element | number) => void
}

export default function TemplatePreviewPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scriptsLoaded, setScriptsLoaded] = useState(0)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const initialized = useRef(false)

  // Initialize animations after all scripts are loaded
  useEffect(() => {
    if (scriptsLoaded < 3 || initialized.current) return
    initialized.current = true

    const gsap = window.gsap
    const ScrollTrigger = window.ScrollTrigger
    const Lenis = window.Lenis

    if (!gsap || !ScrollTrigger || !Lenis) return

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    window.lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', (ScrollTrigger as { update: () => void }).update)
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Loading Animation
    const tlLoader = gsap.timeline()

    tlLoader
      .to('.loader-bar', {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
      })
      .to('.loader', {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      })
      .from(
        '.hero-img',
        {
          scale: 1.2,
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .to(
        '.hero-line span',
        {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
        },
        '-=1'
      )

    // Parallax Effect for Hero Image
    gsap.to('.hero-img', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Marquee Animation
    let currentScroll = 0
    let isScrollingDown = true

    const tween = gsap
      .to('.marquee-track', { xPercent: -50, repeat: -1, duration: 10, ease: 'linear' })
      .totalProgress(0.5)

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > currentScroll) {
        isScrollingDown = true
      } else {
        isScrollingDown = false
      }

      gsap.to(tween, { timeScale: isScrollingDown ? 1 : -1 })

      currentScroll = window.pageYOffset
    })

    // Reveal Text on Scroll (About Section)
    const revealTexts = document.querySelectorAll('.reveal-text')
    revealTexts.forEach((text) => {
      gsap.fromTo(
        text,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
          },
        }
      )
    })

    // Image Reveal in About
    gsap.fromTo(
      '.reveal-image-wrapper img',
      { scale: 1.4 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.reveal-image-wrapper',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )

    // Horizontal Scroll for Work Section (Desktop Only)
    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      const sections = gsap.utils.toArray('.project-card')
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.work',
          pin: true,
          scrub: 1,
          end: '+=3000',
        },
      })
    })

    // Footer Reveal Animation
    gsap.from('.footer-cta span', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    gsap.from('.footer-col', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.footer-grid',
        start: 'top 90%',
      },
    })

    // Magnetic button effect
    const menuBtn = menuBtnRef.current
    if (menuBtn) {
      menuBtn.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = menuBtn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(menuBtn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
        })
      })

      menuBtn.addEventListener('mouseleave', () => {
        gsap.to(menuBtn, { x: 0, y: 0, duration: 0.3 })
      })
    }

    // Cleanup
    return () => {
      // ScrollTrigger cleanup handled by GSAP
    }
  }, [scriptsLoaded])

  const toggleMenu = () => {
    const gsap = window.gsap
    const lenis = window.lenis

    if (!gsap || !lenis) return

    if (!isMenuOpen) {
      // Open Menu
      gsap.to('.menu-overlay', {
        visibility: 'visible',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 0.8,
        ease: 'power4.inOut',
      })
      gsap.to('.menu-link span', {
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.4,
      })
      lenis.stop()
    } else {
      // Close Menu
      gsap.to('.menu-link span', {
        y: '100%',
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.in',
      })
      gsap.to('.menu-overlay', {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        duration: 0.6,
        ease: 'power4.inOut',
        delay: 0.3,
        onComplete: () => {
          gsap.set('.menu-overlay', { visibility: 'hidden' })
        },
      })
      lenis.start()
    }
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetSection = document.querySelector(targetId)

    if (isMenuOpen) toggleMenu()

    if (targetSection && window.lenis) {
      setTimeout(() => {
        window.lenis.scrollTo(targetSection)
      }, 500)
    }
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetSection = document.querySelector(targetId)
    if (targetSection && window.lenis) {
      window.lenis.scrollTo(targetSection)
    }
  }

  const toggleServiceAccordion = (e: React.MouseEvent<HTMLDivElement>) => {
    const gsap = window.gsap
    if (!gsap) return

    const item = e.currentTarget
    const details = item.querySelector('.service-details')
    const icon = item.querySelector('.service-icon')
    const isOpen = item.classList.contains('open')

    // Close others
    document.querySelectorAll('.service-item').forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains('open')) {
        const otherDetails = otherItem.querySelector('.service-details')
        const otherIcon = otherItem.querySelector('.service-icon')
        gsap.to(otherDetails, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.out' })
        gsap.to(otherIcon, { rotation: 0, duration: 0.4 })
        otherItem.classList.remove('open')
      }
    })

    if (!isOpen) {
      gsap.to(details, { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out' })
      gsap.to(icon, { rotation: 45, duration: 0.4 })
      item.classList.add('open')
    } else {
      gsap.to(details, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.out' })
      gsap.to(icon, { rotation: 0, duration: 0.4 })
      item.classList.remove('open')
    }
  }

  const handleBackToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0)
    }
  }

  return (
    <>
      {/* External Scripts */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        onLoad={() => setScriptsLoaded((prev) => prev + 1)}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
        onLoad={() => setScriptsLoaded((prev) => prev + 1)}
      />
      <Script
        src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js"
        onLoad={() => setScriptsLoaded((prev) => prev + 1)}
      />

      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600;800&family=Playfair+Display:ital@1&display=swap"
        rel="stylesheet"
      />

      <div
        className="template-page"
        style={{
          backgroundColor: 'var(--bg-color)',
          color: 'var(--text-color)',
          fontFamily: "'Manrope', sans-serif",
          overflowX: 'hidden',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {/* Loader */}
        <div className="loader">
          <div className="loader-text">ARCHETYPE</div>
          <div className="loader-bar"></div>
        </div>

        {/* Nav */}
        <nav>
          <div className="logo">ARCHETYPE.</div>
          <button ref={menuBtnRef} className="menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </nav>

        {/* Menu Overlay */}
        <div className="menu-overlay">
          <div className="menu-links">
            <a href="#hero" className="menu-link" onClick={(e) => handleMenuLinkClick(e, '#hero')}>
              <span>Home</span>
            </a>
            <a href="#work" className="menu-link" onClick={(e) => handleMenuLinkClick(e, '#work')}>
              <span>Work</span>
            </a>
            <a href="#about" className="menu-link" onClick={(e) => handleMenuLinkClick(e, '#about')}>
              <span>Studio</span>
            </a>
            <a href="#contact" className="menu-link" onClick={(e) => handleMenuLinkClick(e, '#contact')}>
              <span>Contact</span>
            </a>
          </div>
          <div className="menu-info">
            <p>Tokyo, Japan</p>
            <p>est. 2024</p>
          </div>
        </div>

        {/* Main Content */}
        <main id="smooth-wrapper">
          <div id="smooth-content">
            {/* Hero */}
            <section className="hero" id="hero">
              <img
                src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2068&auto=format&fit=crop"
                alt="Brutalist Architecture"
                className="hero-img"
              />
              <h1 className="hero-title">
                <span className="hero-line">
                  <span>Designing</span>
                </span>
                <span className="hero-line">
                  <span className="serif-italic">The</span> Future
                </span>
                <span className="hero-line">
                  <span>Archetype</span>
                </span>
              </h1>
              <div className="scroll-indicator">
                <div className="scroll-line"></div>
                <span>Scroll to explore</span>
              </div>
            </section>

            {/* Marquee */}
            <section className="marquee-section">
              <div className="marquee-track">
                <span>Sustainable Design</span> • <span>Urban Planning</span> •{' '}
                <span>Interior Architecture</span> • <span>Landscape</span> •{' '}
                <span>Sustainable Design</span> • <span>Urban Planning</span> •{' '}
                <span>Interior Architecture</span> • <span>Landscape</span>
              </div>
            </section>

            {/* About */}
            <section className="about" id="about">
              <div className="about-sticky">
                <span className="section-label">Manifesto</span>
                <p className="big-text">
                  We don&apos;t just build structures.
                  <br />
                  We sculpt <span className="serif-italic">ecosystems</span>.
                </p>
              </div>
              <div>
                <p className="about-desc reveal-text">
                  Archetype represents a paradigm shift in spatial dynamics. Merging raw brutalist
                  principles with organic sustainability, we create spaces that breathe. Our work
                  challenges the conventional boundaries between the built environment and the
                  natural world.
                </p>
                <p className="about-desc reveal-text">
                  Every line drawn, every material selected, serves a dual purpose: aesthetic
                  dominance and ecological harmony. Welcome to the new standard.
                </p>
                <div
                  style={{ marginTop: '4rem', height: '300px', background: '#ccc', overflow: 'hidden' }}
                  className="reveal-image-wrapper"
                >
                  <img
                    src="https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=1974&auto=format&fit=crop"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    alt="Detail"
                  />
                </div>
              </div>
            </section>

            {/* Work (Horizontal Scroll) */}
            <section className="work" id="work">
              <div className="work-header">
                <span className="section-label">Selected Works</span>
                <h2>
                  Recent <span className="serif-italic">Monoliths</span>
                </h2>
              </div>
              <div className="horizontal-container">
                <div className="horizontal-wrapper">
                  {/* Project 1 */}
                  <div className="project-card">
                    <img
                      src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2724&auto=format&fit=crop"
                      alt="House 1"
                    />
                    <div className="project-info">
                      <span>The Void House</span>
                      <span className="project-num">01</span>
                    </div>
                  </div>
                  {/* Project 2 */}
                  <div className="project-card">
                    <img
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                      alt="House 2"
                    />
                    <div className="project-info">
                      <span>Kyoto Silence</span>
                      <span className="project-num">02</span>
                    </div>
                  </div>
                  {/* Project 3 */}
                  <div className="project-card">
                    <img
                      src="https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=2070&auto=format&fit=crop"
                      alt="House 3"
                    />
                    <div className="project-info">
                      <span>Concrete Peak</span>
                      <span className="project-num">03</span>
                    </div>
                  </div>
                  {/* Project 4 */}
                  <div className="project-card">
                    <img
                      src="https://images.unsplash.com/photo-1522050212171-61b01dd24579?q=80&w=2080&auto=format&fit=crop"
                      alt="House 4"
                    />
                    <div className="project-info">
                      <span>Nordic Light</span>
                      <span className="project-num">04</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Services / Capabilities */}
            <section className="services" id="services">
              <span className="section-label">Capabilities</span>

              <div className="service-item" onClick={toggleServiceAccordion}>
                <div className="service-header">
                  <h3>Residential</h3>
                  <div className="service-icon">+</div>
                </div>
                <div className="service-details">
                  <div className="service-text-wrapper">
                    <p>
                      Crafting intimate sanctuaries that balance privacy with openness. We focus on
                      natural light, thermal comfort, and material honesty to create homes that age
                      gracefully and connect inhabitants to their surroundings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="service-item" onClick={toggleServiceAccordion}>
                <div className="service-header">
                  <h3>Commercial</h3>
                  <div className="service-icon">+</div>
                </div>
                <div className="service-details">
                  <div className="service-text-wrapper">
                    <p>
                      Redefining workspaces and retail environments. We design for flow,
                      productivity, and brand identity, using structural expression to create
                      memorable client experiences that stand out in the urban jungle.
                    </p>
                  </div>
                </div>
              </div>

              <div className="service-item" onClick={toggleServiceAccordion}>
                <div className="service-header">
                  <h3>Renovation</h3>
                  <div className="service-icon">+</div>
                </div>
                <div className="service-details">
                  <div className="service-text-wrapper">
                    <p>
                      Breathing new life into existing bones. We respect historical context while
                      injecting modern utility, creating a dialogue between the past and the future
                      through adaptive reuse and sustainable retrofitting.
                    </p>
                  </div>
                </div>
              </div>

              <div className="service-item" onClick={toggleServiceAccordion}>
                <div className="service-header">
                  <h3>Urban Planning</h3>
                  <div className="service-icon">+</div>
                </div>
                <div className="service-details">
                  <div className="service-text-wrapper">
                    <p>
                      Macro-scale thinking for micro-scale living. We analyze traffic patterns,
                      sunlight data, and community needs to design resilient urban pockets that
                      foster social interaction and ecological diversity.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer id="contact">
              <div className="footer-top">
                <div className="section-label" style={{ marginBottom: '1rem' }}>
                  Let&apos;s Talk
                </div>
                <div className="footer-cta">
                  <span>Let&apos;s Build</span>
                  <span className="serif-italic" style={{ color: 'var(--accent-color)', display: 'block' }}>
                    Legacies
                  </span>
                </div>
              </div>

              <div className="footer-grid">
                <div className="footer-col">
                  <h4>Headquarters</h4>
                  <div style={{ fontSize: '1.1rem', lineHeight: 1.5, color: 'var(--secondary-color)' }}>
                    Minato City, Akasaka
                    <br />
                    Tokyo 107-0052
                    <br />
                    Japan
                  </div>
                  <div style={{ marginTop: '1.5rem' }}>
                    <a href="mailto:hello@archetype.com" style={{ textDecoration: 'underline' }}>
                      hello@archetype.com
                    </a>
                  </div>
                </div>

                <div className="footer-col">
                  <h4>Socials</h4>
                  <div className="footer-links">
                    <a href="#">Instagram</a>
                    <a href="#">LinkedIn</a>
                    <a href="#">Twitter/X</a>
                    <a href="#">Behance</a>
                  </div>
                </div>

                <div className="footer-col">
                  <h4>Sitemap</h4>
                  <div className="footer-links">
                    <a
                      href="#hero"
                      className="smooth-scroll-link"
                      onClick={(e) => handleSmoothScroll(e, '#hero')}
                    >
                      Home
                    </a>
                    <a
                      href="#about"
                      className="smooth-scroll-link"
                      onClick={(e) => handleSmoothScroll(e, '#about')}
                    >
                      Studio
                    </a>
                    <a
                      href="#work"
                      className="smooth-scroll-link"
                      onClick={(e) => handleSmoothScroll(e, '#work')}
                    >
                      Work
                    </a>
                    <a
                      href="#services"
                      className="smooth-scroll-link"
                      onClick={(e) => handleSmoothScroll(e, '#services')}
                    >
                      Services
                    </a>
                  </div>
                </div>

                <div className="footer-col">
                  <h4>Newsletter</h4>
                  <p style={{ marginBottom: '1.5rem', color: 'var(--secondary-color)', fontSize: '0.9rem' }}>
                    Join our community for updates on sustainable architecture.
                  </p>
                  <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="Email Address" />
                    <button type="submit">→</button>
                  </form>
                </div>
              </div>

              <div className="footer-bottom">
                <div>© 2024 Archetype Inc. All Rights Reserved.</div>
                <div>
                  <a href="#">Privacy Policy</a> &nbsp; / &nbsp; <a href="#">Terms</a>
                </div>
                <button className="back-to-top" onClick={handleBackToTop}>
                  Back to Top ↑
                </button>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </>
  )
}
