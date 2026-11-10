import { Link } from 'react-router-dom'
import ProjectEntry from '../components/ProjectEntry'
import SectionLabel from '../components/SectionLabel'
import { projects } from '../data/projects'
import { certifications, education, profile, profileHighlights, skills } from '../data/profile'

const profileItems = [
  ['Name', profile.name],
  ['Birth', profile.birth],
  ['Position', profile.position],
  ['Career', profile.career],
  ['Location', profile.location],
  ['Email', profile.email],
  ['GitHub', profile.githubLabel],
]

const timelineItems = [
  ...education,
  ...projects.filter((project) => project.showInExperience).map((project) => ({
    period: project.timelinePeriod,
    category: project.category,
    title: project.title,
    detail: project.timelineDetail,
    statusLabel: project.statusLabel,
  })),
]

export default function Home() {
  return (
    <div className="page-enter home-page">
      <section className="profile-hero" id="profile">
        <div className="frame profile-hero-inner">
          <div className="profile-copy">
            <div className="profile-title"><p>{profile.position}</p><span>{profile.englishName}</span></div>
            <h1>{profile.name}</h1>
            <p className="profile-headline">{profile.headline}</p>
            <div className="profile-actions">
              <Link className="primary-link" to="/projects">Projects <span>→</span></Link>
              <a className="plain-link" href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
            </div>
            <dl className="profile-quickfacts">
              {profileHighlights.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          </div>

          <figure className="profile-photo">
            <div className="profile-photo-placeholder"><span>PROFILE PHOTO</span><small>/images/profile/profile.png</small></div>
            <img src="/images/profile/profile.png" alt="김동규 프로필" onError={(event) => { event.currentTarget.hidden = true }} />
          </figure>
        </div>

        <div className="frame basic-profile">
          <p className="basic-profile-title">Profile Info</p>
          <dl>
            {profileItems.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{label === 'GitHub' ? <a href={profile.githubUrl} target="_blank" rel="noreferrer">{value} ↗</a> : label === 'Email' ? <a href={'mailto:' + profile.email}>{value}</a> : value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="home-section selected-work-section" id="projects">
        <div className="frame">
          <SectionLabel number="01">Selected Projects</SectionLabel>
          <ProjectEntry project={projects[0]} compact />
          <div className="other-projects">
            {projects.slice(1).map((project) => <Link to={'/projects/' + project.slug} key={project.slug}><span>{project.number}</span><strong>{project.title}</strong><small>{project.category}</small><b>{project.statusLabel || ''}</b><i>→</i></Link>)}
          </div>
          <div className="section-end-link"><Link className="text-link" to="/projects">All projects <span>→</span></Link></div>
        </div>
      </section>

      <section className="home-section skills-section" id="skills">
        <div className="frame">
          <SectionLabel number="02">Skills</SectionLabel>
          <div className="skills-grid">
            {skills.map(({ group, items }) => <div className="skill-group" key={group}><h2>{group}</h2><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}
          </div>
        </div>
      </section>

      <section className="home-section experience-section" id="experience">
        <div className="frame">
          <SectionLabel number="03">Education & Experience</SectionLabel>
          <div className="timeline-list">
            {timelineItems.map((item) => <article key={item.category + '-' + item.title}><span>{item.period}</span><p>{item.category}</p><h3>{item.title}</h3><small>{item.detail}{item.statusLabel && <b className="timeline-status">{item.statusLabel}</b>}</small></article>)}
          </div>
        </div>
      </section>

      <section className="home-section certification-section" id="certifications">
        <div className="frame">
          <SectionLabel number="04">Certifications</SectionLabel>
          <section className="certifications" aria-labelledby="certification-title">
            <h2 id="certification-title">Certification</h2>
            <div className="certification-list">
              {certifications.map((item) => <div className={item.featured ? 'featured' : ''} key={item.number}><span>{item.number}</span><h3>{item.title}</h3></div>)}
            </div>
          </section>
        </div>
      </section>

      <section className="home-section contact-section" id="contact">
        <div className="frame">
          <SectionLabel number="05">Contact</SectionLabel>
          <div className="contact-callout">
            <p>Backend Developer</p>
            <h2>궁금한 점이 있다면<br />편하게 연락해주세요.</h2>
            <dl><div><dt>Email</dt><dd><a href={'mailto:' + profile.email}>{profile.email}</a></dd></div><div><dt>Phone</dt><dd><a href={'tel:' + profile.phone.replace(/-/g, '')}>{profile.phone}</a></dd></div><div><dt>GitHub</dt><dd><a href={profile.githubUrl} target="_blank" rel="noreferrer">{profile.githubLabel} ↗</a></dd></div></dl>
          </div>
        </div>
      </section>
    </div>
  )
}
