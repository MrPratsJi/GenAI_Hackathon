import React from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from './Chat';
import MoodTracker from './MoodTracker';
import DailyCheckin from './DailyCheckin';
import GuidedMeditation from './GuidedMeditation';
import ResourceLibrary from './ResourceLibrary';

function getFeatureContent(feature) {
  switch (feature) {
    case 'chat':
      return <Chat />;
    case 'mood':
      return <MoodTracker />;
    case 'selfhelp':
      return <DailyCheckin />;
    case 'resources':
      return <ResourceLibrary />;
    case 'activities':
      return <GuidedMeditation />;
    case 'confidential':
      return <div style={{color:'#eaf6fb', fontSize:'1.15rem'}}>Your conversations are private and secure.</div>;
    default:
      return <div style={{color:'#eaf6fb'}}>Feature not found.</div>;
  }
}

export default function FeatureModalPage() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const feature = params.get('feature');
  const featureTitles = {
    chat: 'Empathetic Chat',
    mood: 'Mood Tracker',
    selfhelp: 'Self-help Tools',
    resources: 'Resource Library',
    activities: 'Interactive Activities',
    confidential: 'Confidentiality',
  };

  return (
    <div
      style={{
        overflow: 'auto',
        padding: 0,
        minHeight: '100vh',
        background: '#162032',
        color: '#fff',
      }}
    >
      <button onClick={() => navigate('/')}
        style={{position:'fixed',top:32,left:32,padding:'14px 32px',borderRadius:18,background:'linear-gradient(90deg, #00eaff 0%, #3a8dde 100%)',color:'#fff',fontWeight:800,fontSize:22,border:'none',boxShadow:'0 2px 24px 0 #00eaff88',cursor:'pointer',zIndex:10001}}>Back to Home</button>
      <div
        style={{
          background: 'rgba(18,32,56,0.98)',
          borderRadius: 32,
          padding: '56px 64px',
          width: '80vw',
          maxWidth: '1100px',
          color: '#eaf6fb',
          boxShadow: '0 12px 48px 0 #00eaff88',
          position: 'relative',
          margin: '40px auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2
          style={{
            color: '#00eaff',
            fontWeight: 900,
            fontSize: '3.2rem',
            marginBottom: 18,
            textAlign: 'center',
            letterSpacing: '2px',
            textShadow: '0 2px 24px #00eaff55',
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
          }}
        >
          {featureTitles[feature] || 'Feature'}
        </h2>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <div style={{ width: '100%' }}>{getFeatureContent(feature)}</div>
        </div>
      </div>
    </div>
  );
}
