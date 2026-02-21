'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '3.2x', label: 'Avg. Performance Boost' },
  { value: '120+', label: 'Projects Delivered' },
  { value: '50ms', label: 'Avg. Response Time' },
]

const HEADLINE = 'W E L C O M E  I T Z F I Z Z'

export default function HeroSection() {
  const sectionRef    = useRef(null)
  const headlineRef   = useRef(null)
  const statsRef      = useRef(null)
  const carRef        = useRef(null)
  const overlayRef    = useRef(null)
  const scrollHintRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // ── 1. LOAD ANIMATION ─────────────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Headline characters stagger up from below
    tl.from('.headline-char', {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.04,
    })

    // Stats slide up one by one
    tl.from('.stat-item', {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
    }, '-=0.4')

    // Divider line grows from left
    tl.from('.divider', {
      scaleX: 0,
      duration: 1,
      transformOrigin: 'left center',
    }, '-=0.5')

    // Car slides in from the right on load
    tl.from(carRef.current, {
      x: 300,
      opacity: 0,
      duration: 1.4,
      ease: 'power4.out',
    }, '-=0.8')

    // Scroll hint fades in last
    tl.from(scrollHintRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.6,
    }, '-=0.2')


    // ── 2. SCROLL-DRIVEN ANIMATION ────────────────────────────────────
    // scrub: 2.5 = silky smooth lag behind scroll
    // end: +=200% = longer scroll = slower, more cinematic feel
    const scrollAnim = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 2.5,
        pin: true,
        anticipatePin: 1,
        fastScrollEnd: true,
      },
    })

    // Car drifts left with gentle ease — feels physical and weighty
    scrollAnim.to(carRef.current, {
      x: '-50vw',
      scale: 0.9,
      opacity: 0.08,
      ease: 'power1.inOut',
      duration: 1,
    })

    // Headline floats upward and fades out
    scrollAnim.to(headlineRef.current, {
      y: -80,
      opacity: 0,
      ease: 'power1.inOut',
      duration: 1,
    }, 0)

    // Stats fade out slightly after headline
    scrollAnim.to(statsRef.current, {
      y: -50,
      opacity: 0,
      ease: 'power1.inOut',
      duration: 1,
    }, 0.1)

    // Overlay darkens gradually as you scroll
    scrollAnim.to(overlayRef.current, {
      opacity: 0.85,
      ease: 'none',
      duration: 1,
    }, 0)

    // Cleanup when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Dark overlay — becomes more opaque as you scroll */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 10,
          background: 'rgba(0,0,0,0)',
        }}
      />

      {/* ── Top navigation bar ── */}
      <div style={{
        position: 'relative',
        zIndex: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem',
      }}>
        <span style={{
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Studio
        </span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Work', 'About', 'Contact'].map(item => (
            <span
              key={item}
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
                opacity: 0.6,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main headline ── */}
      <div ref={headlineRef} style={{ position: 'relative', zIndex: 20, padding: '0 2rem' }}>
        <h1
          className="headline"
          style={{ fontSize: 'clamp(2rem, 7vw, 8rem)', color: 'var(--text)' }}
        >
          {HEADLINE.split('').map((char, i) => (
            <span key={i} className="headline-char">
              {char}
            </span>
          ))}
        </h1>
        <p style={{
          marginTop: '1rem',
          fontSize: '0.7rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Scroll to Experience
        </p>
      </div>

      {/* ── Car image — the main scroll-animated element ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        <img
          ref={carRef}
          src="/car.png"
          alt="Hero car"
          style={{
            width: '70vw',
            maxWidth: '900px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 20px 60px rgba(200,255,0,0.15))',
          }}
        />
      </div>

      {/* ── Bottom stats section ── */}
      <div ref={statsRef} style={{ position: 'relative', zIndex: 20, paddingBottom: '2.5rem' }}>
        <div className="divider" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          padding: '0 2rem',
        }}>
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="stat-item"
              style={{
                padding: '0.5rem 1rem 0.5rem 0',
                borderRight: i < STATS.length - 1 ? '1px solid #222' : 'none',
                paddingLeft: i > 0 ? '1rem' : 0,
              }}
            >
              <div
                className="stat-number"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1 }}
              >
                {stat.value}
              </div>
              <div style={{
                marginTop: '0.3rem',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator at bottom center ── */}
      <div
        ref={scrollHintRef}
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{
          fontSize: '0.6rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Scroll
        </span>
        <div style={{
          width: '1px',
          height: '2rem',
          background: '#222',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'var(--accent)',
            animation: 'scrollLine 1.5s ease-in-out infinite',
          }} />
        </div>
      </div>
    </section>
  )
}