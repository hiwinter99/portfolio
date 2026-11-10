import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { projects } from '../data/projects'
import LinkIcon from './LinkIcon'

const navigation = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Header() {
  const { pathname } = useLocation()
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('')
      return undefined
    }

    const targets = [
      { element: document.getElementById('projects'), section: 'projects' },
      { element: document.getElementById('skills'), section: 'skills' },
      { element: document.getElementById('experience'), section: 'experience' },
      { element: document.getElementById('certifications'), section: 'experience' },
      { element: document.getElementById('contact'), section: 'contact' },
    ].filter(({ element }) => element)

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(targets.find(({ element }) => element === visible.target)?.section || '')
    }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, 0.1, 0.4] })

    targets.forEach(({ element }) => observer.observe(element))
    return () => observer.disconnect()
  }, [pathname])

  const handleLogoClick = (event) => {
    if (pathname !== '/') return
    event.preventDefault()
    window.history.replaceState(null, '', '/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveSection('')
  }

  const isProjectDetail = pathname.startsWith('/projects/')
  const currentProject = projects.find(project => pathname === `/projects/${project.slug}`)

  return (
    <header className={`site-header frame${isProjectDetail ? ' site-header--detail' : ''}`}>
      <NavLink className="wordmark" to="/" onClick={handleLogoClick} aria-label="홈 최상단으로 이동">KDG<span className="wordmark-dot">.</span></NavLink>
      {isProjectDetail ? (
        <nav className="detail-header-actions" aria-label="프로젝트 이동">
          <NavLink className="detail-home-link" to="/">← 홈으로</NavLink>
          {currentProject?.links.live && <a className="header-service-link" href={currentProject.links.live} target="_blank" rel="noopener noreferrer">
            <LinkIcon />
            <span>{currentProject.title} 홈페이지</span>
          </a>}
        </nav>
      ) : (
        <>
          <nav className="nav" aria-label="주요 메뉴">
            {navigation.map(({ id, label }) => <a className={pathname === '/' && activeSection === id ? 'active' : ''} href={pathname === '/' ? '#' + id : '/#' + id} key={id}>{label}</a>)}
          </nav>
          <NavLink className="header-role" to="/" onClick={handleLogoClick}>Backend · Java</NavLink>
        </>
      )}
    </header>
  )
}
