import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { teamProjects } from '../data/teamProjects'
import SectionLabel from '../components/SectionLabel'
import LinkIcon from '../components/LinkIcon'

export default function TeamProjectDetail({ slug }) {
  const project = projects.find((item) => item.slug === slug)
  const detail = teamProjects[slug]
  return <article className="page-enter project-detail team-detail">
    <header className="detail-hero frame">
      <div className="detail-breadcrumb"><Link to="/projects">프로젝트</Link><span>/</span><span>{project.number}</span></div>
      <p className="eyebrow">팀 프로젝트</p><h1>{project.title}</h1>
      <div className="detail-deck"><p className="detail-summary">{project.summary}</p><span>{project.period}</span></div>
    </header>
    <section className="frame team-overview">
      <SectionLabel number="01">개요·담당 역할</SectionLabel>
      <p className="team-intro">{detail.intro}</p>
      <dl className="project-spec">
        <div><dt>참여 인원</dt><dd>{detail.team}</dd></div>
        <div><dt>담당</dt><dd>{project.role}</dd></div>
        <div><dt>기술</dt><dd>{project.stack.join(' · ')}</dd></div>
        <div><dt>링크</dt><dd className="project-spec-links"><a href={project.links.github} target="_blank" rel="noopener noreferrer">GitHub<LinkIcon /></a><a href={detail.notion} target="_blank" rel="noopener noreferrer">화면·코드 더 보기<LinkIcon /></a></dd></div>
      </dl>
    </section>
    <section className="frame section-space">
      <SectionLabel number="02">담당 기능</SectionLabel>
      <div className="team-features">{detail.features.map((feature) => <article key={feature.title}>
        <h2>{feature.title}</h2><p>{feature.body}</p>
        <a href={`/images/projects/${slug}/${feature.image}`} target="_blank" rel="noopener noreferrer" aria-label={`${feature.title} 화면 크게 보기`}><img src={`/images/projects/${slug}/${feature.image}`} alt={`${project.title} ${feature.title} 화면`} loading="lazy" /></a>
      </article>)}</div>
      <p className="team-extra">{detail.extra}</p>
    </section>
    <section className="frame section-space team-experience">
      <SectionLabel number="03">협업 경험</SectionLabel><h2>{detail.experienceTitle}</h2><p>{detail.experience}</p>
    </section>
    <nav className="next-project frame" aria-label="프로젝트 목록"><span>다음</span><Link to="/projects">프로젝트 목록 <b>→</b></Link></nav>
  </article>
}
