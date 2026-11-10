import { useState } from 'react'

export default function CodeCaptureGallery({ captures, title, aspect = '16 / 9' }) {
  const [active, setActive] = useState(0)
  const capture = captures[active]
  const src = `/images/projects/investome/${capture.image}`
  const move = direction => setActive(index => (index + direction + captures.length) % captures.length)

  return (
    <figure className="code-capture-gallery">
      <div className="code-capture-stage" style={{ aspectRatio: aspect }}>
        <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`${title} 코드 원본 크게 보기`}>
          <img src={src} alt={`${capture.file} 코드 캡처`} />
        </a>
        {captures.length > 1 && <>
          <button className="code-capture-prev" type="button" onClick={() => move(-1)} aria-label={`${title} 이전 코드 이미지`}>‹</button>
          <button className="code-capture-next" type="button" onClick={() => move(1)} aria-label={`${title} 다음 코드 이미지`}>›</button>
        </>}
      </div>
      <figcaption>
        <span>{capture.file}</span>
        <span aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(captures.length).padStart(2, '0')}</span>
        <a href={src} target="_blank" rel="noopener noreferrer">원본 크게 보기</a>
      </figcaption>
    </figure>
  )
}
