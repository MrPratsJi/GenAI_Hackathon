import React, { useEffect, useRef, useState } from 'react'
import MoodWidget from './MoodWidget.jsx'
import ExercisePanel from './ExercisePanel.jsx'
import LoginModal from './LoginModal.jsx'

const API = '/api'

export default function Chat() {
  const [sessionId, setSessionId] = useState(null)
  const [log, setLog] = useState([
    { role:'assistant', text: 'Hi, I’m here with you. What’s on your mind today? (नमस्ते, बताइए आप कैसा महसूस कर रहे हैं?)' }
  ])
  const [input, setInput] = useState('')
  const [lang, setLang] = useState('en')
  const boxRef = useRef(null)
  const [helplines, setHelplines] = useState([])
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    fetch(`${API}/helplines?lang=${lang}`).then(r => r.json()).then(d => setHelplines(d.items || []))
  }, [lang])

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' })
  }, [log])

  useEffect(() => {
    console.log('showLogin state:', showLogin);
  }, [showLogin]);

  async function send() {
    const text = input.trim()
    if (!text) return
    setInput('')
    setLog(l => [...l, { role:'user', text }])
    try {
      const r = await fetch(`${API}/chat`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ sessionId, text, lang })
      })
      const data = await r.json()
      setSessionId(s => s || data.sessionId)
      setLog(l => [...l, { role:'assistant', text: data.reply }])
    } catch {
      setLog(l => [...l, { role:'assistant', text: 'Sorry, I had trouble replying. Try again.' }])
    }
  }

  return (
    <div className="container">
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <div className="glass" style={{padding:16, marginBottom:12, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
            <img src="/icon.png" width="28" height="28" alt="logo"/>
          <strong>Mannan</strong>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <select className="input" value={lang} onChange={e=>setLang(e.target.value)} style={{padding:'8px 10px', background:'#233e5c', color:'#eaf6fb', fontWeight:700, fontSize:18, borderRadius:16, border:'none', boxShadow:'0 2px 12px 0 #00eaff22', outline:'none'}}>
            <option value="en" style={{color:'#233e5c', background:'#eaf6fb'}}>English</option>
            <option value="hi" style={{color:'#233e5c', background:'#eaf6fb'}}>हिन्दी</option>
          </select>
          <MoodWidget />
          <button className="btn" style={{marginLeft:8}} onClick={()=>{
            setShowLogin(true);
            console.log('Login button clicked, opening modal:', showLogin);
          }}>Log In</button>
        </div>
      </div>

      <div className="grid" style={{gridTemplateColumns:'2fr 1fr', gap:18}}>
        <div className="glass card chat-wrap">
          <div ref={boxRef} className="chat-log">
            {log.map((m, i) => (
              <div key={i} className={'msg ' + m.role}>{m.text}</div>
            ))}
          </div>
          <div className="input-row">
            <input
              className="input"
              placeholder={lang==='hi' ? 'अपना संदेश लिखें…' : 'Type your message…'}
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter'){ send() } }}
            />
            <button className="btn" onClick={send}>Send</button>
          </div>
        </div>

        <div className="grid" style={{gridTemplateRows:'auto auto 1fr', gap:18}}>
          <div className="glass card">
            <h3 style={{marginTop:0}}>Quick exercises</h3>
            <ExercisePanel lang={lang} />
          </div>

          <div className="glass card">
            <h3 style={{marginTop:0}}>Crisis helplines</h3>
            <ul style={{margin:0, paddingLeft:18, lineHeight:1.8}}>
              {helplines.map((h, i) => (
                <li key={i}><b>{h.name}</b>: <a href={`tel:${h.phone}`} style={{color:'#93c5fd'}}>{h.phone}</a> <small className="muted">({h.notes})</small></li>
              ))}
            </ul>
            <small className="muted">If you feel unsafe right now, please call immediately.</small>
          </div>

          <div className="glass card">
            <h3 style={{marginTop:0}}>Privacy</h3>
            <p style={{marginTop:6, color:'#cbd5e1'}}>Your messages are not stored on the server in this demo. Avoid sharing personal details. This is not medical advice.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
