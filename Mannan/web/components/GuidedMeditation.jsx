import React, { useState } from 'react';

const meditations = [
  { title: 'Box Breathing (1 min)', url: 'https://www.youtube.com/embed/tEmt1Znux58' },
  { title: 'Guided Relaxation (2 min)', url: 'https://www.youtube.com/embed/MIr3RsUWrdo' },
];

export default function GuidedMeditation() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="glass card" style={{marginTop:24}}>
      <h3 className="gradient-text">Guided Meditation</h3>
      <div style={{marginBottom:12}}>
        {meditations.map((m, i) => (
          <button key={i} className="btn secondary" onClick={() => setSelected(m)} style={{marginRight:8}}>{m.title}</button>
        ))}
      </div>
      {selected && (
        <div style={{marginTop:12}}>
          <iframe width="320" height="180" src={selected.url} title={selected.title} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>
      )}
    </div>
  );
}
