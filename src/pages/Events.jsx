import { useState } from 'react'
import { imagePath } from '../lib/image-path'
import eventsData from '../data/events.json'
import LiquidEther from '../components/LiquidEther/LiquidEther'
import GradientBlinds from '../components/GradientBlinds/GradientBlinds'
import MagicBento from '../components/MagicBento/MagicBento'

const tenures = Object.keys(eventsData).sort()

const g2gSessions = [
  {
    image: '/assets/g2g posters/geometry of poster.jpeg',
    title: 'The Geometry of Spacetime',
    description: "Our first Guide to the Galaxy session explored the fascinating geometry underlying Einstein's theory of relativity. Participants were introduced to curved spaces, metrics, and Jacobians before moving on to Special Relativity, Lorentz transformations, time dilation, length contraction, and the relativity of simultaneity. The session concluded with a discussion on accelerating reference frames, providing a strong foundation for modern spacetime physics.",
    speakers: 'Suraj R, Aditya Goel, Sudhanva N Rao, Hemanth M',
    youtube: 'https://youtu.be/FifNf4TqM_8',
  },
  {
    image: '/assets/g2g posters/physics of col poster.jpeg',
    title: 'Physics of Colours',
    description: 'This session explored the science behind the colours we perceive in everyday life. From butterfly wings and peacock feathers to camouflage, colour constancy, and opponent processes, participants discovered how physics, biology, and human perception combine to create our colourful world. The session also explained why rainbows appear to have seven colours despite the spectrum being continuous.',
    speakers: 'Srikiran Ravanam, Harichharan M',
    youtube: 'https://youtu.be/o-QlQoSzsMQ',
  },
  {
    image: '/assets/g2g posters/intro to re... poster.jpeg',
    title: 'Introduction to General Relativity and Black Holes',
    description: "This session introduced Einstein's General Theory of Relativity and its revolutionary view of gravity as the curvature of spacetime. Participants learned how massive objects bend spacetime, leading to phenomena such as black holes, event horizons, and gravitational effects observed across the universe. The talk served as an accessible introduction to one of the most beautiful theories in modern physics.",
    speakers: 'Nikshep, Avinash',
    youtube: 'https://youtu.be/WqJ3ZFiI4Ic',
  },
  {
    image: '/assets/g2g posters/unseen cosmic poster.jpeg',
    title: 'Unseen Cosmic Architecture: How the Universe Hid Its Matter',
    description: "This session focused on one of cosmology's biggest mysteries—the Missing Baryon Problem. Beginning with the standard model of cosmology, it explained how astronomers use light and spectroscopy to study the universe and eventually uncover the hidden ordinary matter spread across vast cosmic structures. The session provided an engaging overview of how observations continue to refine our understanding of the cosmos.",
    speakers: 'Harsh Meena, Sri Rachana',
    youtube: 'https://youtu.be/w6y52bLr-og',
  },
  {
    image: '/assets/g2g posters/field to poster.jpeg',
    title: 'The Fundamental Building Blocks of the Universe',
    description: 'The concluding G2G session of the tenure explored our current understanding of the universe at its most fundamental level. Beginning with the Standard Model of particle physics, the discussion introduced quantum fields as the true constituents of nature and concluded with renormalization, phase transitions, and the fascinating connection between boiling water and quantum field theory. The session highlighted how deep theoretical ideas shape modern physics.',
    speakers: 'Nanatha Kumaran, Abhishekapriyan, Asim Vats',
    youtube: 'https://youtu.be/mOEP356TxME',
  },
  {
    image: '',
    title: 'Cosmic Histories',
    description: 'This session traced the remarkable story of our universe from the Big Bang to the present day. Participants explored the major epochs in cosmic evolution and learned how observations such as the cosmic microwave background, galaxy distributions, and expanding space helped establish the Big Bang model. The session offered an engaging introduction to the history of the cosmos and the evidence supporting modern cosmology.',
    speakers: 'Ajeya, Kirtana P.',
    youtube: 'https://youtu.be/_h9ufmi5i_c',
  },
]

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
            <MagicBento
              containerClassName="events-grid"
              enableTilt
              enableMagnetism
              clickEffect={false}
              textAutoHide={false}
            >
              {filteredEvents.map(event => (
                <div
                  key={event.id}
                  className="event-card event-card--inner"
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
            </MagicBento>
          </div>
        </div>
      </div>

      {modal && (
        <div className="event-modal is-visible" id="eventModal">
          <div className="event-modal__overlay" onClick={() => setModal(null)}></div>
          <div className={`event-modal__box${modal.id === 'guide-to-galaxies' ? ' g2g-modal' : ''}`}>
            <button className="event-modal__close" onClick={() => setModal(null)}>&times;</button>
            <div className="event-modal__header">
              <h2 id="modalTitle">{modal.title}</h2>
            </div>
            {modal.id === 'guide-to-galaxies' ? (
              <div className="g2g-sessions-list">
                {g2gSessions.map((session, index) => (
                  <div key={index} className="g2g-session-card">
                    <div className="g2g-session-card__image">
                      {session.image ? (
                        <img src={session.image} alt={session.title} />
                      ) : (
                        <div className="g2g-session-card__placeholder"></div>
                      )}
                    </div>
                    <div className="g2g-session-card__content">
                      <h4>{session.title}</h4>
                      <p className="g2g-session-card__summary">{session.description}</p>
                      <div className="g2g-session-card__meta">
                        <span className="g2g-session-card__label">Speakers</span>
                        <p>{session.speakers}</p>
                      </div>
                      {session.youtube && (
                        <a className="g2g-session-card__link" href={session.youtube} target="_blank" rel="noopener noreferrer">
                          Watch on YouTube
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div id="modalContent">
                <p>{modal.content}</p>
              </div>
            )}
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
