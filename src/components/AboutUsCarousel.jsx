import { useEffect, useRef } from 'react';
import './AboutUsCarousel.css';
import VariableProximity from './VariableProximity/VariableProximity';

const AboutUsCarousel = () => {
  const images = [
    '/assets/aboutus homepage section/WhatsApp Image 2026-07-24 at 12.37.36.jpeg',
    '/assets/aboutus homepage section/WhatsApp Image 2026-07-24 at 12.37.52.jpeg',
    '/assets/aboutus homepage section/WhatsApp Image 2026-07-24 at 12.38.02.jpeg',
    '/assets/aboutus homepage section/WhatsApp Image 2026-07-24 at 12.38.27.jpeg',
    '/assets/aboutus homepage section/WhatsApp Image 2026-07-24 at 12.39.13.jpeg',
    '/assets/aboutus homepage section/WhatsApp Image 2026-07-24 at 12.39.52.jpeg',
    '/assets/aboutus homepage section/WhatsApp Image 2026-07-24 at 12.40.16.jpeg',
  ];

  const carouselRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const items = carousel.querySelectorAll('.carousel-item');
    items.forEach(item => {
      const clone = item.cloneNode(true);
      carousel.appendChild(clone);
    });
  }, []);

  return (
    <section className="section about-us-section">
      <div className="carousel-track" ref={carouselRef}>
        {images.map((image, idx) => (
          <div key={idx} className="carousel-item">
            <img src={image} alt={`About Us ${idx + 1}`} />
          </div>
        ))}
      </div>
      
      <div className="about-us-overlay">
        <div className="overlay-content" ref={overlayRef}>
          <h2>
            <VariableProximity
              label="About Us"
              fromFontVariationSettings="'wght' 500, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={overlayRef}
              radius={120}
              falloff="gaussian"
            />
          </h2>
          <p>More than a club. A close-knit community built on friendship, shared experiences, and memories</p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsCarousel;

