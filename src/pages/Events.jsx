import { useState } from 'react'
import events from '../data/events.json'

export default function Events() {
  const [modal, setModal] = useState(null)

  return (
    <article className="page">
      <div className="container">
        <header className="page-header">
          <h1>Event Horizon</h1>
        </header>
        <div className="page-content">
          <div className="events-grid">
            {events.map(event => (
              <div
                key={event.id}
                className="event-card"
                tabIndex="0"
                onClick={() => setModal(event)}
              >
                <img src={event.poster} alt={`${event.title} poster`} />
                <div className="event-card__content">
                  <h3>{event.title}</h3>
                  <span className="event-card__date">{new Date(event.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  <p className="event-card__cta">Click to read more</p>
                </div>
              </div>
            ))}
          </div>

          <h2>Past Events</h2>
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
            <div id="modalContent" dangerouslySetInnerHTML={{ __html: modal.content }} />
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
