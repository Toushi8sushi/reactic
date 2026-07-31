import { useMemo } from 'react'

function generateStars(count, sizeRange, durationRange) {
  return Array.from({ length: count }, () => {
    const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0])
    const duration = durationRange[0] + Math.random() * (durationRange[1] - durationRange[0])
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size,
      duration,
      delay: `${(Math.random() * duration).toFixed(2)}s`,
      opacity: 0.3 + Math.random() * 0.7,
    }
  })
}

const STAR_LAYERS = [
  { key: 'far', className: 'space-bg__stars--far', count: 120, size: [1, 2], duration: [3, 7] },
  { key: 'mid', className: 'space-bg__stars--mid', count: 70, size: [1.5, 2.5], duration: [2.5, 5] },
  { key: 'near', className: 'space-bg__stars--near', count: 30, size: [2, 3.5], duration: [2, 4] },
]

export default function SpaceBackground() {
  const layers = useMemo(
    () =>
      STAR_LAYERS.map(layer => ({
        ...layer,
        stars: generateStars(layer.count, layer.size, layer.duration),
      })),
    []
  )

  return (
    <div className="space-bg" aria-hidden="true">
      <div className="space-bg__nebula space-bg__nebula--one" />
      <div className="space-bg__nebula space-bg__nebula--two" />
      <div className="space-bg__nebula space-bg__nebula--three" />

      {layers.map(layer => (
        <div key={layer.key} className={`space-bg__stars ${layer.className}`}>
          {layer.stars.map((s, i) => (
            <span
              key={`${layer.key}-${i}`}
              className="space-star"
              style={{
                left: s.left,
                top: s.top,
                width: `${s.size}px`,
                height: `${s.size}px`,
                opacity: s.opacity,
                animationDuration: `${s.duration}s`,
                animationDelay: s.delay,
              }}
            />
          ))}
        </div>
      ))}

      <span className="shooting-star" />
      <span className="shooting-star shooting-star--delayed" />
    </div>
  )
}
