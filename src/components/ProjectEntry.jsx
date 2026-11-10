import { Link } from 'react-router-dom'
import ImagePlaceholder from './ImagePlaceholder'
import LinkIcon from './LinkIcon'

export default function ProjectEntry({ project, compact = false }) {
  return <article className={`project-entry project-entry--${project.slug} ${compact ? 'project-entry--compact' : ''}`}>
    <div className="project-heading"><span className="project-number">{project.number}</span><div><div className="project-kicker"><p className="eyebrow">{project.category}</p>{project.statusLabel && <span>{project.statusLabel}</span>}</div><div className="project-title-row"><h2>{project.title}</h2>{project.slug === 'investome' && project.links.live && <a className="project-visit-link" href={project.links.live} target="_blank" rel="noopener noreferrer">Investome 방문하기<LinkIcon /></a>}</div></div><span className="project-year">{project.year}</span></div>
    <Link className="project-visual" to={`/projects/${project.slug}`} aria-label={`${project.title} 상세 보기`}><ImagePlaceholder src={project.cover} alt={`${project.title} 대표 화면`} title={`${project.title} — MAIN VIEW`} recommendation="16:9 desktop screenshot" tone="dark" /></Link>
    <div className="project-bottom"><p>{project.summary}</p><p className="project-stack">{project.stack.length ? project.stack.join(' / ') : 'Details will be added after code review.'}</p><Link className="text-link" to={`/projects/${project.slug}`}>View project <span>↗</span></Link></div>
  </article>
}

