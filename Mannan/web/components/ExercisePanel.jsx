import React, { useEffect, useState } from 'react'

export default function ExercisePanel({ lang='en' }) {
  const [items, setItems] = useState([])
  const [active, setActive] = useState(null)

  useEffect(() => {
    fetch(`/api/exercises?lang=${lang}`)
      .then(r => r.json())
      .then(d => {
        setItems(d.items || [])
        setActive(null)
      })
  }, [lang])

  return (
    <div>
      <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
        {items.map(it => (
          <button key={it.id} className="btn secondary" onClick={()=>setActive(it)}>
            {it.title}
          </button>
        ))}
      </div>

      {active && (
        <div style={{marginTop:12, padding:12, border:'1px dashed rgba(255,255,255,0.2)', borderRadius:12}}>
          <b>{active.title}</b>
          {active.steps && <ol style={{lineHeight:1.8}}>{active.steps.map((s,i)=><li key={i}>{s}</li>)}</ol>}
          {active.list && <ul style={{lineHeight:1.8}}>{active.list.map((s,i)=><li key={i}>{s}</li>)}</ul>}
          {active.template && <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(active.template, null, 2)}</pre>}
          {active.prompt && <p>{active.prompt}</p>}
        </div>
      )}
    </div>
  )
}
