import React, { useState } from 'react';

const moods = [
  { label: '😊', value: 'happy' },
  { label: '😐', value: 'neutral' },
  { label: '😔', value: 'sad' },
  { label: '😠', value: 'angry' },
  { label: '😰', value: 'anxious' },
];

export default function MoodTracker() {
  const [history, setHistory] = useState([]);
  const [todayMood, setTodayMood] = useState(null);

  const selectMood = (mood) => {
    setTodayMood(mood);
    setHistory([...history, { date: new Date().toLocaleDateString(), mood }]);
  };

  return (
    <div className="glass card" style={{marginTop:24}}>
      <h3 className="gradient-text">Mood Tracker</h3>
      <div style={{display:'flex', gap:10, marginBottom:12}}>
        {moods.map(m => (
          <button key={m.value} className="btn secondary" onClick={() => selectMood(m.value)}>{m.label}</button>
        ))}
      </div>
      <div>
        <strong>History:</strong>
        <ul style={{paddingLeft:18}}>
          {history.map((h, i) => (
            <li key={i}>{h.date}: {h.mood}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
