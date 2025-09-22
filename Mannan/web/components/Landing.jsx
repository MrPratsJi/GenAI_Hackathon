import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MoodTracker from './MoodTracker';
import ResourceLibrary from './ResourceLibrary';
import DailyCheckin from './DailyCheckin';
import GuidedMeditation from './GuidedMeditation';
import Chat from './Chat';
import LoginModal from './LoginModal.jsx';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

// Simple Modal Component
function FeatureModal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.65)',
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'auto',
      transition: 'background 0.2s',
    }}>
      <div style={{
        background: 'rgba(18,32,56,0.98)',
        borderRadius: 18,
        padding: '40px 32px',
        minWidth: 340,
        maxWidth: 480,
        color: '#eaf6fb',
        boxShadow: '0 8px 32px 0 #00eaff88',
        position: 'relative',
        zIndex: 1000000,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: 18,
          right: 18,
          background: '#00eaff',
          border: 'none',
          color: '#122038',
          fontSize: 28,
          fontWeight: 900,
          borderRadius: '50%',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px #00eaff44',
        }} aria-label="Close">×</button>
        <h2 style={{ color: '#00eaff', fontWeight: 800, fontSize: '2.2rem', marginBottom: 18, textAlign: 'center' }}>{title}</h2>
        <div style={{ width: '100%' }}>{children}</div>
      </div>
    </div>
  );
}


// Navigation Button Component
function NavButton({ targetId, label, activeColor }) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setIsActive(rect.top <= 120 && rect.bottom > 120);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [targetId]);
  return (
    <button
      onClick={() => document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' })}
      style={{
        background: 'none',
        border: 'none',
        color: isActive ? (activeColor || '#fff') : '#eaf6fb',
        fontWeight: isActive ? 800 : 600,
        fontSize: '1.1rem',
        cursor: 'pointer',
        textDecoration: isActive ? 'underline' : 'none',
        transition: 'color 0.2s',
      }}
    >
      {label}
    </button>
  );
}

export default function Landing({ onStart }) {

  const [activeFeature, setActiveFeature] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Handler for navbar navigation
  const handleNavClick = (section) => {
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const features = [
    { key: 'chat', title: 'Empathetic Chat', detail: 'Warm, stigma-free responses for students. Powered by Google Cloud Vertex AI.' },
    { key: 'mood', title: 'Mood Tracker', detail: 'See small changes over time with gentle nudges and visual mood graphs.' },
    { key: 'selfhelp', title: 'Self-help Tools', detail: 'Breathing, reframing, journaling. Simple and effective.' },
    { key: 'resources', title: 'Resource Library', detail: 'Curated articles, videos, and helplines for youth mental wellness.' },
    { key: 'activities', title: 'Interactive Activities', detail: 'Daily check-ins, gratitude journaling, and guided meditations.' },
    { key: 'confidential', title: 'Confidentiality', detail: 'Your conversations are private and secure.' },
  ];
  // Animation variants for nav and hero
  const navAnim = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };
  const [openFeature, setOpenFeature] = useState(null);

  return (
    <>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      {/* Navbar - increased height and only navbar/hero visible initially */}
      <motion.nav
        className="navbar-glass"
        variants={navAnim}
        initial="initial"
        animate="animate"
        style={{
          width: '100%',
          background: 'rgba(18,32,56,0.92)',
          borderBottom: '1.5px solid rgba(0,234,255,0.12)',
          boxShadow: '0 2px 16px 0 #00eaff22',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
        }}
      >
        <div className="navbar-content" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 48px',
          height: '96px',
        }}>
          <div className="navbar-logo" style={{
            fontWeight: 900,
            fontSize: '2.3rem',
            color: '#00eaff',
            letterSpacing: '2px',
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
          }}>MANNAN</div>
          <div className="navbar-links" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}>
            <NavButton targetId="hero" label="Home" activeColor="#00eaff" />
            <NavButton targetId="how" label="How it works?" />
            <NavButton targetId="features" label="Features" />
            <NavButton targetId="about" label="About Us" />
            <NavButton targetId="resources" label="Resources" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginLeft: '24px' }}>
            {!user ? (
              <button style={{ background: 'rgba(255,255,255,0.08)', color: '#00eaff', fontWeight: 700, fontSize: '1.18rem', borderRadius: '18px', padding: '10px 24px', border: '1.5px solid #00eaff', cursor: 'pointer', transition: 'background 0.2s, color 0.2s' }} onClick={()=>setShowLogin(true)}>Log in</button>
            ) : (
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #00eaff 0%, #3a8dde 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 22, boxShadow: '0 2px 12px 0 #00eaff44' }}>
                {user.email.charAt(0).toUpperCase()}
              </div>
            )}
            <button className="btn navbar-explore" style={{ background: 'linear-gradient(90deg, #00eaff 0%, #3a8dde 100%)', color: '#fff', fontWeight: 700, fontSize: '1.18rem', borderRadius: '18px', padding: '12px 36px', boxShadow: '0 2px 16px 0 #00eaff55', border: 'none', cursor: 'pointer', transition: 'transform 0.18s, box-shadow 0.18s' }} onClick={()=>navigate('/about')}>Explore</button>
          </div>
        </div>
      </motion.nav>
      {/* Hero Section */}
      <motion.section
        id="hero"
        className="glass hero-section"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          marginTop: '120px',
          marginBottom: '0',
          maxWidth: '700px',
          textAlign: 'center',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.24)',
          color: '#eaf6fb',
        }}
      >
        <h1 className="hero-title" style={{ color: '#7fd1e8', textShadow: '0 2px 16px #00eaff33', fontWeight: 800, fontSize: '4rem', marginBottom: '18px' }}>Mannan</h1>
        <div className="hero-subtitle" style={{ color: '#b2c7d9', fontSize: '2rem', marginBottom: '24px' }}>
          Built with Google Cloud’s Generative AI for Youth Mental Wellness
        </div>
        <div style={{ color: '#eaf6fb', fontSize: 22, marginBottom: 36, maxWidth: 600, margin: '0 auto', lineHeight: 1.5 }}>
          An AI-powered, confidential, and empathetic mental wellness solution that supports and guides youth in overcoming stigma and accessing help.<br/>
          Meet <b style={{ color: '#00bcd4' }}>Mannan</b>, your private companion for stressful days, exam jitters, or when you just need someone to listen.<br/>
          No judgments. Simple steps. English या हिन्दी—आपकी पसंद।
        </div>
      </motion.section>
      {/* How it works Section */}
      <motion.section
        id="how"
        className="glass"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ marginTop: 64, maxWidth: 900, textAlign: 'center', color: '#eaf6fb', padding: '40px 32px' }}
      >
        <h2 style={{ color: '#00eaff', fontWeight: 800, fontSize: '2.2rem', marginBottom: 18 }}>How it works?</h2>
        <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.15rem', lineHeight: 1.7 }}>
          <li>1. Confidential chat with Mannan for support and guidance.</li>
          <li>2. Track your mood and progress visually.</li>
          <li>3. Access self-help tools and curated resources.</li>
          <li>4. Participate in daily check-ins and guided meditations.</li>
          <li>5. All conversations are private and secure.</li>
        </ul>
      </motion.section>
      {/* Features Section */}
      <motion.section
        id="features"
        className="glass"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ marginTop: 48, maxWidth: 900, textAlign: 'center', color: '#eaf6fb', padding: '40px 32px' }}
      >
        <h2 style={{ color: '#00eaff', fontWeight: 800, fontSize: '2.2rem', marginBottom: 18 }}>Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', marginTop: 24 }}>
          {/* Empathetic Chat */}
          <div style={{ background: 'rgba(0,234,255,0.08)', borderRadius: 18, padding: 24, cursor: 'pointer', transition: 'box-shadow 0.2s' }}
            onClick={() => {
              const url = `${window.location.origin}/feature-modal?feature=chat`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            tabIndex={0}
            role="button"
            aria-label="Open Empathetic Chat"
            onKeyPress={e => { if (e.key === 'Enter') {
              const url = `${window.location.origin}/feature-modal?feature=chat`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}}
          >
            <h3 style={{ color: '#00eaff', fontWeight: 700 }}>Empathetic Chat</h3>
            <p>Warm, stigma-free responses for students. Powered by Google Cloud Vertex AI.</p>
          </div>
          {/* Mood Tracker */}
          <div style={{ background: 'rgba(0,234,255,0.08)', borderRadius: 18, padding: 24, cursor: 'pointer', transition: 'box-shadow 0.2s' }}
            onClick={() => {
              const url = `${window.location.origin}/feature-modal?feature=mood`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            tabIndex={0}
            role="button"
            aria-label="Open Mood Tracker"
            onKeyPress={e => { if (e.key === 'Enter') {
              const url = `${window.location.origin}/feature-modal?feature=mood`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}}
          >
            <h3 style={{ color: '#00eaff', fontWeight: 700 }}>Mood Tracker</h3>
            <p>See small changes over time with gentle nudges and visual mood graphs.</p>
          </div>
          {/* Self-help Tools */}
          <div style={{ background: 'rgba(0,234,255,0.08)', borderRadius: 18, padding: 24, cursor: 'pointer', transition: 'box-shadow 0.2s' }}
            onClick={() => {
              const url = `${window.location.origin}/feature-modal?feature=selfhelp`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            tabIndex={0}
            role="button"
            aria-label="Open Self-help Tools"
            onKeyPress={e => { if (e.key === 'Enter') {
              const url = `${window.location.origin}/feature-modal?feature=selfhelp`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}}
          >
            <h3 style={{ color: '#00eaff', fontWeight: 700 }}>Self-help Tools</h3>
            <p>Breathing, reframing, journaling. Simple and effective.</p>
          </div>
          {/* Resource Library */}
          <div style={{ background: 'rgba(0,234,255,0.08)', borderRadius: 18, padding: 24, cursor: 'pointer', transition: 'box-shadow 0.2s' }}
            onClick={() => {
              const url = `${window.location.origin}/feature-modal?feature=resources`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            tabIndex={0}
            role="button"
            aria-label="Open Resource Library"
            onKeyPress={e => { if (e.key === 'Enter') {
              const url = `${window.location.origin}/feature-modal?feature=resources`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}}
          >
            <h3 style={{ color: '#00eaff', fontWeight: 700 }}>Resource Library</h3>
            <p>Curated articles, videos, and helplines for youth mental wellness.</p>
          </div>
          {/* Interactive Activities */}
          <div style={{ background: 'rgba(0,234,255,0.08)', borderRadius: 18, padding: 24, cursor: 'pointer', transition: 'box-shadow 0.2s' }}
            onClick={() => {
              const url = `${window.location.origin}/feature-modal?feature=activities`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            tabIndex={0}
            role="button"
            aria-label="Open Interactive Activities"
            onKeyPress={e => { if (e.key === 'Enter') {
              const url = `${window.location.origin}/feature-modal?feature=activities`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}}
          >
            <h3 style={{ color: '#00eaff', fontWeight: 700 }}>Interactive Activities</h3>
            <p>Daily check-ins, gratitude journaling, and guided meditations.</p>
          </div>
          {/* Confidentiality */}
          <div style={{ background: 'rgba(0,234,255,0.08)', borderRadius: 18, padding: 24, cursor: 'pointer', transition: 'box-shadow 0.2s' }}
            onClick={() => {
              const url = `${window.location.origin}/feature-modal?feature=confidential`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            tabIndex={0}
            role="button"
            aria-label="Open Confidentiality"
            onKeyPress={e => { if (e.key === 'Enter') {
              const url = `${window.location.origin}/feature-modal?feature=confidential`;
              window.open(url, '_blank', 'noopener,noreferrer');
            }}}
          >
            <h3 style={{ color: '#00eaff', fontWeight: 700 }}>Confidentiality</h3>
            <p>Your conversations are private and secure.</p>
          </div>
      {/* Feature Modal */}
      <FeatureModal
        open={!!openFeature}
        onClose={() => setOpenFeature(null)}
        title={
          openFeature === 'chat' ? 'Empathetic Chat' :
          openFeature === 'mood' ? 'Mood Tracker' :
          openFeature === 'selfhelp' ? 'Self-help Tools' :
          openFeature === 'resources' ? 'Resource Library' :
          openFeature === 'activities' ? 'Interactive Activities' :
          openFeature === 'confidential' ? 'Confidentiality' : ''
        }
      >
        {openFeature === 'chat' && (
          <div>
            <Chat />
          </div>
        )}
        {openFeature === 'mood' && (
          <div>
            {/* Replace with actual mood tracker UI */}
            <p>Track your mood and progress visually.</p>
          </div>
        )}
        {openFeature === 'selfhelp' && (
          <div>
            {/* Replace with actual self-help tools UI */}
            <p>Access breathing, reframing, and journaling tools.</p>
          </div>
        )}
        {openFeature === 'resources' && (
          <div>
            {/* Replace with actual resource library UI */}
            <p>Browse curated articles, videos, and helplines.</p>
          </div>
        )}
        {openFeature === 'activities' && (
          <div>
            {/* Replace with actual activities UI */}
            <p>Participate in daily check-ins, gratitude journaling, and guided meditations.</p>
          </div>
        )}
        {openFeature === 'confidential' && (
          <div>
            {/* Replace with actual confidentiality info UI */}
            <p>Your conversations are private and secure.</p>
          </div>
        )}
      </FeatureModal>
        </div>
        </motion.section>
        {/* About Us Section */}
        <motion.section
          id="about"
          className="glass"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ marginTop: 48, maxWidth: 900, textAlign: 'center', color: '#eaf6fb', padding: '40px 32px' }}
        >
          <h2 style={{ color: '#00eaff', fontWeight: 800, fontSize: '2.2rem', marginBottom: 18 }}>About Us</h2>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.7 }}>
            Mannan is a youth mental wellness initiative built with Google Cloud’s Generative AI. Our mission is to empower students to overcome stigma, access help, and build resilience through confidential support, self-help tools, and curated resources. We believe in creating safe spaces for youth to thrive emotionally and mentally.
          </p>
        </motion.section>
        {/* Resources Section */}
        <motion.section
          id="resources"
          className="glass"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ marginTop: 48, maxWidth: 900, textAlign: 'center', color: '#eaf6fb', padding: '40px 32px', marginBottom: 64 }}
        >
          <h2 style={{ color: '#00eaff', fontWeight: 800, fontSize: '2.2rem', marginBottom: 18 }}>Resources</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', marginTop: 24 }}>
            <div style={{ background: 'rgba(0,234,255,0.08)', borderRadius: 18, padding: 24 }}>
              <h3 style={{ color: '#00eaff', fontWeight: 700 }}>Articles</h3>
              <p>Read expert articles on youth mental health, wellness, and self-care.</p>
            </div>
            <div style={{ background: 'rgba(0,234,255,0.08)', borderRadius: 18, padding: 24 }}>
              <h3 style={{ color: '#00eaff', fontWeight: 700 }}>Videos</h3>
              <p>Watch inspiring stories and practical guides for emotional wellbeing.</p>
            </div>
            <div style={{ background: 'rgba(0,234,255,0.08)', borderRadius: 18, padding: 24 }}>
              <h3 style={{ color: '#00eaff', fontWeight: 700 }}>Helplines</h3>
              <p>Access confidential helplines for immediate support and guidance.</p>
            </div>
          </div>
        </motion.section>
    </>
  );
  }
