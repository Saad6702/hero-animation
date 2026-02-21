import HeroSection from './components/HeroSection'

export default function Home() {
  return (
    <main>
      {/* ── Animated Hero Section ── */}
      <HeroSection />

      {/* ── Content below fold (gives space to scroll into) ── */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10rem 2rem',
        background: '#0a0a0a',
      }}>
        <p style={{
          fontSize: '0.7rem',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: '#555',
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: '1.5rem',
        }}>
          — What we do
        </p>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(3rem, 10vw, 10rem)',
          fontFamily: "'Bebas Neue', sans-serif",
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '0.05em',
          color: '#f0f0f0',
        }}>
          WE BUILD<br />
          <span style={{ color: '#c8ff00' }}>EXPERIENCES</span>
        </h2>
        <p style={{
          marginTop: '2rem',
          textAlign: 'center',
          maxWidth: '36rem',
          fontSize: '0.9rem',
          lineHeight: 1.8,
          color: '#555',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          From concept to pixel-perfect execution — we craft digital experiences
          that move people. Literally.
        </p>
      </section>
    </main>
  )
}