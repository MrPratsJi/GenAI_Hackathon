import React, { useState } from 'react';

export default function DailyCheckin() {
  const [gratitude, setGratitude] = useState('');
  const [journal, setJournal] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="glass card" style={{marginTop:24}}>
      <h3 className="gradient-text">Daily Check-in</h3>
      {submitted ? (
        <div>
          <p>Thank you for checking in! 🌱</p>
          <p><b>Gratitude:</b> {gratitude}</p>
          <p><b>Journal:</b> {journal}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom:8}}>
            <label>One thing you’re grateful for today:</label><br/>
            <input className="input" value={gratitude} onChange={e => setGratitude(e.target.value)} required />
          </div>
          <div style={{marginBottom:8}}>
            <label>How are you feeling right now?</label><br/>
            <textarea className="input" value={journal} onChange={e => setJournal(e.target.value)} required />
          </div>
          <button className="btn" type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
