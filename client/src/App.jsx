import {
  validatePostcode,
  validateAddressDetails
} from './validation.js'
import { useState } from 'react'
import './App.css'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '')

function App() {
  const [postcode, setPostcode] = useState('')
  const [address, setAddress] = useState('')
  const [fullName, setFullName] = useState('')
  const [purpose, setPurpose] = useState('Delivery')
  const [searchState, setSearchState] = useState('idle')
  const [message, setMessage] = useState('')
  const [health, setHealth] = useState('unknown')
  const [menuOpen, setMenuOpen] = useState(false)

  async function checkBackend() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`)
      if (!response.ok) throw new Error('Backend unavailable')
      setHealth('online')
    } catch {
      setHealth('offline')
    }
  }

async function handleSearch(event) {
  event.preventDefault()

  const result = validatePostcode(postcode)

  if (!result.valid) {
    setSearchState('error')
    setMessage(result.message)
    return
  }

  setPostcode(result.normalized)
  setSearchState('unavailable')
  setMessage(
    'The postcode format looks correct, but official verification is not available yet. NIPOST API access is still pending.'
  )
}
function handleAddressSubmit(event) {
  event.preventDefault()

  const result = validateAddressDetails({
    postcode,
    address,
    fullName
  })

  if (!result.valid) {
    setMessage(result.message)
    setSearchState('error')
    return
  }

  setMessage(
    'Your details have been checked locally. No address has been sent to or verified by NIPOST. Official verification will be enabled after API integration.'
  )
  setSearchState('local')
}

  function resetSearch() {
    setPostcode('')
    setAddress('')
    setFullName('')
    setMessage('')
    setSearchState('idle')
  }

  return (
    <div className="app-shell">
      <div className="announcement">
        <span className="announcement-dot" />
        BUILDING BETTER ADDRESSING FOR NIGERIA
        <span className="announcement-tag">NISA TECHNOLOGY</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="NISA Postcode Connect home">
          <span className="brand-symbol">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <path d="M20 3C11 3 5 10 5 19c0 11 15 19 15 19s15-8 15-19C35 10 29 3 20 3Z" />
              <circle cx="20" cy="17" r="5" />
              <path d="M11 27h18M20 23v8" />
            </svg>
          </span>
          <span className="brand-copy">
            <strong>NISA</strong>
            <span>POSTCODE CONNECT</span>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'}>
          <a href="#lookup" onClick={() => setMenuOpen(false)}>Find a postcode</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#businesses" onClick={() => setMenuOpen(false)}>For businesses</a>
          <a className="nav-cta" href="#lookup" onClick={() => setMenuOpen(false)}>
            Get started <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-icon">⌖</span>
              SMARTER DIGITAL ADDRESSING
            </div>

            <h1>
              Every destination
              <br />
              starts with a
              <br />
              <span>better address.</span>
            </h1>

            <p className="hero-description">
              A simple way to prepare and organise postcode-based address
              information for deliveries and businesses across Nigeria.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#lookup">
                Explore postcode lookup <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#how-it-works">See how it works</a>
            </div>

            <div className="hero-note">
              <span className="status-dot" />
              Prototype in development · Official NIPOST verification pending
            </div>
          </div>

          <div className="hero-art" aria-label="Illustration of a digital location pin">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-grid" />
            <div className="map-line map-line-one" />
            <div className="map-line map-line-two" />
            <div className="map-point point-one" />
            <div className="map-point point-two" />
            <div className="map-point point-three" />

            <div className="pin-shadow" />
            <div className="location-pin">
              <div className="pin-inner">
                <svg viewBox="0 0 90 90" aria-hidden="true">
                  <path d="M45 8C27 8 13 22 13 40c0 23 32 43 32 43s32-20 32-43C77 22 63 8 45 8Z" />
                  <circle cx="45" cy="39" r="12" />
                  <path d="M26 61h38" />
                </svg>
              </div>
            </div>

            <div className="floating-card card-top">
              <span className="floating-icon">⌖</span>
              <span>
                <strong>Precise location</strong>
                <small>Designed for building-level addressing</small>
              </span>
            </div>

            <div className="floating-card card-bottom">
              <span className="mini-check">✓</span>
              <span>
                <strong>Address ready</strong>
                <small>Prepare details for verification</small>
              </span>
            </div>

            <div className="art-caption">
              <span className="caption-line" />
              <span>LOCATION INTELLIGENCE FOR EVERYDAY BUSINESS</span>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Product principles">
          <div><span className="trust-icon">⌖</span><span>Postcode-focused workflows</span></div>
          <div><span className="trust-icon">↗</span><span>Built for Nigerian businesses</span></div>
          <div><span className="trust-icon">◇</span><span>Designed with privacy in mind</span></div>
        </section>

        <section className="lookup-section section-pad" id="lookup">
          <div className="section-heading">
            <span className="section-kicker">POSTCODE EXPLORER</span>
            <h2>Start with a postcode.</h2>
            <p>
              Enter an 11-character postcode to check its format. Official
              database lookup will become available after API integration.
            </p>
          </div>

          <div className="lookup-card">
            <div className="lookup-card-heading">
              <div className="lookup-heading-icon">⌕</div>
              <div>
                <h3>Find or prepare an address</h3>
                <p>Begin with the postcode associated with your destination.</p>
              </div>
              <span className="step-label">STEP 01</span>
            </div>

            <form onSubmit={handleSearch} className="postcode-form">
              <label htmlFor="postcode">Digital postcode</label>
              <div className="postcode-input-row">
                <div className="input-with-icon">
                  <span aria-hidden="true">⌖</span>
                  <input
                    id="postcode"
                    type="text"
                    value={postcode}
                    onChange={(event) => {
                      setPostcode(event.target.value.toUpperCase())
                      if (searchState !== 'idle') {
                        setSearchState('idle')
                        setMessage('')
                      }
                    }}
                    placeholder="Enter 11-character postcode"
                    maxLength={11}
                    autoComplete="off"
                    spellCheck="false"
                    aria-describedby="postcode-help"
                  />
                  <span className="character-count">{postcode.length}/11</span>
                </div>
                <button className="button button-primary search-button" type="submit">
                  Check format <span aria-hidden="true">→</span>
                </button>
              </div>
              <p className="field-help" id="postcode-help">
                Use letters and numbers without spaces. Format checking alone
                does not confirm that a postcode exists.
              </p>
            </form>

            {searchState !== 'idle' && (
              <div
                className={`result-message result-${searchState}`}
                role="status"
                aria-live="polite"
              >
                <span className="result-icon">
                  {searchState === 'error' ? '!' : searchState === 'local' ? '✓' : 'i'}
                </span>
                <div>
                  <strong>
                    {searchState === 'error'
                      ? 'Check your input'
                      : searchState === 'local'
                        ? 'Local checks complete'
                        : searchState === 'unavailable'
                          ? 'Official lookup not connected'
                          : 'Postcode format accepted'}
                  </strong>
                  <p>{message}</p>
                </div>
                <button type="button" className="reset-button" onClick={resetSearch}>
                  Reset
                </button>
              </div>
            )}

            <div className="lookup-divider">
              <span />
              <small>OR PREPARE DELIVERY DETAILS</small>
              <span />
            </div>

            <form className="address-form" onSubmit={handleAddressSubmit}>
              <div className="form-heading">
                <div>
                  <span className="section-kicker">ADDRESS DETAILS</span>
                  <h3>Prepare a delivery address</h3>
                </div>
                <span className="step-label">STEP 02</span>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="full-name">Recipient name</label>
                  <input
                    id="full-name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Enter recipient name"
                    autoComplete="name"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="purpose">Intended use</label>
                  <select
                    id="purpose"
                    value={purpose}
                    onChange={(event) => setPurpose(event.target.value)}
                  >
                    <option>Delivery</option>
                    <option>Business address</option>
                    <option>Service registration</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-field full-width">
                  <label htmlFor="address">Street or building address</label>
                  <textarea
                    id="address"
                    rows="3"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Enter the street, building or other relevant address details"
                  />
                </div>
              </div>

              <div className="privacy-note">
                <span aria-hidden="true">◇</span>
                <p>
                  This prototype performs local checks only. Do not enter
                  sensitive personal information. Details are not submitted
                  to NIPOST or stored by this form.
                </p>
              </div>

              <button className="button button-dark submit-address" type="submit">
                Check details <span aria-hidden="true">→</span>
              </button>
            </form>
          </div>
        </section>

        <section className="how-section section-pad" id="how-it-works">
          <div className="section-heading">
            <span className="section-kicker">HOW IT WORKS</span>
            <h2>From postcode to prepared address.</h2>
            <p>Our planned workflow keeps the process simple and transparent.</p>
          </div>

          <div className="steps-grid">
            <article className="step-card">
              <span className="step-number">01</span>
              <div className="step-icon">⌕</div>
              <h3>Enter a postcode</h3>
              <p>Provide the postcode associated with the destination you need to identify.</p>
            </article>
            <article className="step-card">
              <span className="step-number">02</span>
              <div className="step-icon">◇</div>
              <h3>Check the details</h3>
              <p>Prepare the address and check the input before requesting official verification.</p>
            </article>
            <article className="step-card">
              <span className="step-number">03</span>
              <div className="step-icon">✓</div>
              <h3>Verify when connected</h3>
              <p>Once approved API access is configured, retrieve supported results from the official service.</p>
            </article>
          </div>
        </section>

        <section className="business-section section-pad" id="businesses">
          <div className="business-panel">
            <div>
              <span className="section-kicker">FOR BUSINESSES</span>
              <h2>Better address data.<br />Better business workflows.</h2>
              <p>
                NISA Postcode Connect is being developed for delivery teams,
                online businesses and service providers that need reliable
                address information.
              </p>
              <a className="button button-primary" href="https://nisa-technology.vercel.app/" target="_blank" rel="noreferrer">
                Explore NISA Technology <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="business-graphic" aria-hidden="true">
              <div className="graphic-ring ring-large" />
              <div className="graphic-ring ring-small" />
              <div className="graphic-center">N</div>
              <span className="graphic-node node-one" />
              <span className="graphic-node node-two" />
              <span className="graphic-node node-three" />
            </div>
          </div>
        </section>

        <section className="status-section">
          <div className="status-copy">
            <span className="section-kicker">DEVELOPMENT STATUS</span>
            <h2>Building responsibly, one integration at a time.</h2>
            <p>
              The interface and local backend are under development. Official
              postcode verification requires approved access to the NIPOST service.
            </p>
          </div>
          <div className="status-items">
            <div><span className="status-indicator status-ready" /><span>React interface</span><strong>Ready for testing</strong></div>
            <div><span className="status-indicator status-ready" /><span>Express backend</span><strong>Health check available</strong></div>
            <div><span className="status-indicator status-pending" /><span>NIPOST integration</span><strong>Access pending</strong></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-symbol">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <path d="M20 3C11 3 5 10 5 19c0 11 15 19 15 19s15-8 15-19C35 10 29 3 20 3Z" />
              <circle cx="20" cy="17" r="5" />
              <path d="M11 27h18M20 23v8" />
            </svg>
          </span>
          <span className="brand-copy">
            <strong>NISA</strong>
            <span>POSTCODE CONNECT</span>
          </span>
        </a>
        <p>Building practical digital solutions for Nigeria.</p>
        <span className="footer-credit">A NISA Technology prototype · 2026</span>
      </footer>

      <button
        className={`backend-status backend-${health}`}
        type="button"
        onClick={checkBackend}
        title="Click to check backend connection"
      >
        <span className="status-dot" />
        {health === 'online'
          ? 'Backend connected'
          : health === 'offline'
            ? 'Backend offline · Retry'
            : 'Check backend connection'}
      </button>
    </div>
  )
}

export default App
