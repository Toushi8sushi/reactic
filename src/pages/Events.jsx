import { useState } from 'react'
import { imagePath } from '../lib/image-path'
import eventsData from '../data/events.json'
import LiquidEther from '../components/LiquidEther/LiquidEther'
import GradientBlinds from '../components/GradientBlinds/GradientBlinds'

const tenures = Object.keys(eventsData).sort()

export default function Events() {
  const [modal, setModal] = useState(null)
  const [activeTenure, setActiveTenure] = useState(tenures[0])

  const filteredEvents = eventsData[activeTenure] || []

  return (
    <article className="page">
      <div className="events-hero-shell">
        <div className="gradientblinds-layer" aria-hidden="true">
          <GradientBlinds
            gradientColors={['#FF9FFC', '#5227FF', '#6EE7F9']}
            angle={8}
            noise={0.22}
            blindCount={14}
            blindMinWidth={70}
            spotlightRadius={0.35}
            spotlightSoftness={1.15}
            spotlightOpacity={1.05}
            mouseDampening={0.12}
            distortAmount={0.6}
            shineDirection="left"
            mixBlendMode="screen"
          />
        </div>
        <div className="container">
          <header className="page-header events-page-header">
            <h1>Event Horizon</h1>
            <p>Explore our community events across different time periods.</p>
            <div className="tenure-tabs">
              {tenures.map(t => (
                <button
                  key={t}
                  className={`btn ${activeTenure === t ? 'btn-primary' : ''}`}
                  onClick={() => setActiveTenure(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </header>
        </div>
      </div>
      <div className="events-background-section">
        <div className="events-background-layer" aria-hidden="true">
          <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B497CF']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>
        <div className="container">
          <div className="page-content">
            <div className="events-grid">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className="event-card"
                tabIndex="0"
                onClick={() => setModal(event)}
              >
                <img src={imagePath(event.poster)} alt={`${event.title} poster`} />
                <div className="event-card__content">
                  <h3>{event.title}</h3>
                  <p className="event-card__cta">View more</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <div className="event-modal is-visible" id="eventModal">
          <div className="event-modal__overlay" onClick={() => setModal(null)}></div>
          <div className="event-modal__box">
            <button className="event-modal__close" onClick={() => setModal(null)}>&times;</button>
            <div className="event-modal__header">
              <h2 id="modalTitle">{modal.title}</h2>
            </div>
            <div id="modalContent">
              <p>{modal.content}</p>
            </div>
            {modal.youtube && (
              <a id="modalYoutube" href={modal.youtube} target="_blank" rel="noopener">
                <span>Watch on YouTube</span>
                <svg className="event-modal__youtube-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5V8.5L15.8 12l-6.2 3.5Z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  )
}
