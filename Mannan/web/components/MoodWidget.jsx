import React, { useState } from 'react'

export default function MoodWidget() {
  const [score, setScore] = useState(3)

  async function save(n) {
    setScore(n)
    try {
      await fetch('/api/mood', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ score:n })
      })
    } catch {
      // no-op for demo
    }
  }

  return (
    <div style={{display:'flex', alignItems:'center', gap:8}}>
      <small className="muted">Mood:</small>
      {[1,2,3,4,5].map(n => (
        <button
          key={n}
          onClick={()=>save(n)}
          className="btn secondary"
          style={{padding:'6px 10px', opacity: n===score?1:0.7}}
        >
          {n}
        </button>
      ))}
    </div>
  )
}
