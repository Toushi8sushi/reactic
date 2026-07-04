import { imagePath } from '../lib/image-path'
export default function Guild() {
  return (
    <article className="guild-page">
      <section className="guild-hero">
        <div className="hero-text">
          <h1>Exploring the Universe from IIT Madras</h1>
          <p>
            Horizon is the Astronomy and Physics guild of IIT Madras,
            bringing together students passionate about understanding the
            universe—from theoretical physics to observational astronomy.
          </p>
        </div>
      </section>

      <section className="guild-section reveal active">
        <div className="guild-grid">
          <div className="guild-text">
            <h2>Who We Are</h2>
            <p>
              Horizon is a community of students fascinated by the deepest
              questions in physics and astronomy. Our members work on
              research projects, participate in national competitions,
              and organize observational events and lectures.
            </p>
            <p>
              From building experimental detectors to analysing astronomical
              data, the guild creates opportunities for students to explore
              science beyond the classroom.
            </p>
          </div>
          <div className="guild-image">
            <img src={imagePath('/assets/images/guild/telescope.jpeg')} alt="Telescope" />
          </div>
        </div>
      </section>

      <section className="guild-achievements">
        <h2 className="section-title">Highlights from Our Journey</h2>

        <div className="achievement reveal active">
          <div className="achievement-text">
            <h3>Indian National Physicists&rsquo; Tournament 2024</h3>
            <p>
              Secured <strong>1st and 2nd place</strong> with ₹35,000 in prizes,
              demonstrating strong physics insight and teamwork.
            </p>
          </div>
          <div className="achievement-image">
            <img src={imagePath('/assets/images/guild/inpt.jpeg')} alt="INPT" />
          </div>
        </div>

        <div className="achievement reveal reverse active">
          <div className="achievement-text">
            <h3>International Physicists&rsquo; Tournament 2025 Qualifiers</h3>
            <p>
              Following our INPT success, our team qualified to represent
              <strong> Team India</strong> in the International Physicists&rsquo;
              Tournament.
            </p>
          </div>
          <div className="achievement-image">
            <img src={imagePath('/assets/images/guild/ipt.jpeg')} alt="IPT" />
          </div>
        </div>

        <div className="achievement reveal active">
          <div className="achievement-text">
            <h3>Inter-IIT Tech Meet 2024 – Observational Astronomy</h3>
            <p>
              Achieved <strong>3rd place</strong> using practical observing
              techniques and advanced astronomical data analysis.
            </p>
          </div>
          <div className="achievement-image">
            <img src={imagePath('/assets/images/guild/interiit.jpeg')} alt="Inter-IIT" />
          </div>
        </div>

        <div className="achievement reveal reverse active">
          <div className="achievement-text">
            <h3>Decoherence 2025 – IISc</h3>
            <p>
              Secured <strong>3rd place</strong> among top undergraduate
              researchers presenting physics research projects.
            </p>
          </div>
          <div className="achievement-image">
            <img src={imagePath('/assets/images/guild/telescope.jpeg')} alt="Decoherence" />
          </div>
        </div>
      </section>
    </article>
  )
}
