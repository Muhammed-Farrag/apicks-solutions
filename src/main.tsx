import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import Site from './Site'
import IntroSplash from './IntroSplash'
import './kinetic.css'

// Reset URL query parameters and scroll position on reload so refresh ALWAYS starts at Splash and routes to Home
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
  if (window.location.search || window.location.hash) {
    window.history.replaceState({}, '', window.location.pathname)
  }
  window.scrollTo(0, 0)
}

function App() {
  // No storage — useState(true) means splash shows on EVERY page load/refresh
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashDone = () => {
    window.scrollTo(0, 0)
    if (document.documentElement) document.documentElement.scrollTop = 0
    if (document.body) document.body.scrollTop = 0
    setShowSplash(false)
  }

  return (
    <>
      {/* Landing page always mounted behind the splash */}
      <Site />

      {/* Fixed overlay — disappears after user presses Explore Leads */}
      {showSplash && (
        <IntroSplash onDone={handleSplashDone} />
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
