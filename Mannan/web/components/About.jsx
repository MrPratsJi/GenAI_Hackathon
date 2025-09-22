import React from "react";

export default function About() {
  return (
    <div style={{maxWidth:700,margin:'120px auto 0',padding:32,background:'rgba(18,32,56,0.92)',borderRadius:18,color:'#eaf6fb',boxShadow:'0 8px 32px 0 #00eaff33'}}>
      <h1 style={{color:'#00eaff',fontWeight:800,fontSize:'2.5rem',marginBottom:18}}>About Us</h1>
      <p style={{fontSize:'1.15rem',marginBottom:24}}>
        <b>Mannan</b> is a youth mental wellness platform built with Google Cloud’s Generative AI. Our mission is to provide confidential, empathetic support and guidance for students and young people facing stress, stigma, or exam pressure.
      </p>
      <h2 style={{color:'#3a8dde',fontWeight:700,fontSize:'1.5rem',marginBottom:12}}>Our Team</h2>
      <ul style={{listStyle:'none',padding:0,fontSize:'1.1rem',lineHeight:1.7}}>
        <li><b>Pratyush Gupta</b> – Team Lead & AI Developer</li>
        <li><b>Shrasti Jaiswal</b> – Product Designer & Frontend</li>
        <li><b>Aryan Singh</b> – Backend & Cloud Integration</li>
      </ul>
      <h2 style={{color:'#3a8dde',fontWeight:700,fontSize:'1.5rem',margin:'32px 0 12px'}}>Contact</h2>
      <p>Email: <a href="mailto:info@mannan.ai" style={{color:'#00eaff'}}>pratyushg2001@gmail.com</a></p>
    </div>
  );
}
