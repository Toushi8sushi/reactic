import { useEffect, useCallback } from 'react'
import './ImageModal.css'

export default function ImageModal({ image, onClose }) {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [handleClose])

  if (!image) return null

  return (
    <div className="image-modal-overlay" onClick={handleClose}>
      <div className="image-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="image-modal-close" onClick={handleClose}>
          ✕
        </button>

        <div className="image-modal-body">
          <div className="image-modal-left-column">
            <img
              src={image.highResImageSrc || image.imageSrc || image.src}
              alt={image.title}
              className="image-modal-image"
            />
            <h2 className="image-modal-title">{image.title}</h2>
            <p className="image-modal-description">{image.description}</p>
          </div>

          <div className="image-modal-right-column">
            <div className="image-modal-exif">
              <h3 className="image-modal-exif-header">EXIF & Equipment</h3>
              <div className="image-modal-divider"></div>

              <div className="image-modal-exif-grid">
                <div className="exif-item">
                  <span className="exif-label">Telescope</span>
                  <span className="exif-value">{image.telescope}</span>
                </div>
                <div className="exif-item">
                  <span className="exif-label">Camera</span>
                  <span className="exif-value">{image.camera}</span>
                </div>
                <div className="exif-item">
                  <span className="exif-label">Mount</span>
                  <span className="exif-value">{image.mount}</span>
                </div>
                <div className="exif-item">
                  <span className="exif-label">Exposure</span>
                  <span className="exif-value">{image.exposure}</span>
                </div>
                <div className="exif-item">
                  <span className="exif-label">ISO/Gain</span>
                  <span className="exif-value">{image.gain}</span>
                </div>
                <div className="exif-item">
                  <span className="exif-label">Filter</span>
                  <span className="exif-value">{image.filter}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
