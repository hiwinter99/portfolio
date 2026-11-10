import { useState } from 'react'
import ImagePlaceholder from './ImagePlaceholder'

export default function ProjectFeature({ feature, reverse = false }) {
  const images = feature.images || [feature.image]
  const [activeIndex, setActiveIndex] = useState(0)
  const showPrevious = () => setActiveIndex((index) => (index - 1 + images.length) % images.length)
  const showNext = () => setActiveIndex((index) => (index + 1) % images.length)

  return (
    <article className={`feature-row ${reverse ? 'feature-row--reverse' : ''}${feature.flow ? ' feature-row--paper' : ''}`}>
      <div className="feature-copy">
        <span className="feature-index">{feature.index}</span>
        <h3>{feature.title}</h3>
        <p>{feature.body}</p>
        {feature.flow && <>
          <ol className="feature-flow-steps">
            {feature.flow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}
          </ol>
          <small className="feature-paper-note">실제 주문·금전 거래가 없는 가상 투자 기능입니다.</small>
        </>}
      </div>
      <div className="feature-gallery">
        <ImagePlaceholder key={images[activeIndex]} src={`/images/projects/investome/${images[activeIndex]}`} alt={`${feature.title} 화면 ${activeIndex + 1}`} title={feature.title.toUpperCase()} recommendation={feature.recommendation} />
        {images.length > 1 && <>
          <button className="feature-gallery-button feature-gallery-button--previous" type="button" onClick={showPrevious} aria-label={`${feature.title} 이전 이미지`}>‹</button>
          <button className="feature-gallery-button feature-gallery-button--next" type="button" onClick={showNext} aria-label={`${feature.title} 다음 이미지`}>›</button>
          <span className="feature-gallery-count" aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
        </>}
      </div>
    </article>
  )
}
