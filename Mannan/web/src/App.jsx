import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from '/components/Landing.jsx'
import Chat from '/components/Chat.jsx'
import FeatureModalPage from '/components/FeatureModalPage.jsx'
import About from '/components/About.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/feature-modal" element={<FeatureModalPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
