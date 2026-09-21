import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import Site from './Site'
import IntroSplash from './IntroSplash'
import './kinetic.css'

function App() {
  // No storage — useState(true) means splash shows on EVERY page load/refresh
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {/* Landing page always mounted behind the splash */}
      <Site />

      {/* Fixed overlay — disappears after animation or on CTA click */}
      {showSplash && (
        <IntroSplash onDone={() => setShowSplash(false)} />
      )}
    </>
  )
}

const root = document.getElementById('root')
if (!root) throw new Error('The application root is missing')
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
