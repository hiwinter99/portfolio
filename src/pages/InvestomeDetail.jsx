import { useState } from 'react'
import { Link } from 'react-router-dom'
import ImagePlaceholder from '../components/ImagePlaceholder'
import ProjectFeature from '../components/ProjectFeature'
import CodeCaptureGallery from '../components/CodeCaptureGallery'
import SectionLabel from '../components/SectionLabel'
import LinkIcon from '../components/LinkIcon'
import { investomeFeatures, projects } from '../data/projects'
import { coreEngineeringCases } from '../data/investomeEngineering'

const project = projects[0]

const supportingEngineeringCases = [
  {
    index: '05',
    captureAspect: '1466 / 836',
    title: 'JWT 인증과 SecurityContext',
    tech: 'OncePerRequestFilter · Spring Security',
    description: 'JWT 필터에서 토큰을 검증하고 인증 정보를 SecurityContext에 저장합니다.\n인증된 사용자 ID를 기준으로 본인의 포트폴리오와 모의계좌에 접근하도록 구현했습니다.',
    captures: [{ image: 'backend-auth.png', file: 'JwtAuthenticationFilter.java' }],
  },
]

const backendEngineeringCases = [...coreEngineeringCases, ...supportingEngineeringCases]

function EngineeringCase({ item, defaultOpen }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const hasFlow = Boolean(item.flow)

  return (
    <details className={hasFlow ? 'engineering-case--flow' : 'engineering-case--capture'} open={isOpen} onToggle={(event) => setIsOpen(event.currentTarget.open)}>
      <summary>
        <span>{item.index}</span>
        <div><strong>{item.title}</strong><small>{item.tech}</small></div>
        <span className="accordion-action">
          <span className="accordion-action-open">접기 ↑</span>
          <span className="accordion-action-closed">구현 보기 ↓</span>
        </span>
      </summary>
      <div className="engineering-case-content engineering-case-content--stacked">
        <p className="engineering-case-description">{item.description}</p>
        {hasFlow ? <div className="engineering-flow-panel">
          <p className="engineering-panel-label">{item.flowTitle}</p>
          <ol className="engineering-flow">
            {item.flow.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}
          </ol>
          <CodeCaptureGallery captures={item.captures} title={item.title} aspect={item.captureAspect} />
        </div> : <CodeCaptureGallery captures={item.captures} title={item.title} aspect={item.captureAspect} />}
      </div>
    </details>
  )
}

export default function InvestomeDetail() {
  return (
    <article className="page-enter project-detail">
      <header className="detail-hero frame">
        <div className="detail-breadcrumb"><Link to="/projects">프로젝트</Link><span>/</span><span>01</span></div>
        <p className="eyebrow">개인 프로젝트</p>
        <h1>{project.title}</h1>
        <div className="detail-deck">
          <p className="detail-summary">시세·금융 정보 조회부터 국내주식 모의투자와 자산 관리까지 연결한 <strong>개인 투자 정보 플랫폼</strong></p>
          <span>{project.period}</span>
        </div>

      </header>

      <div className="frame"><ImagePlaceholder src={project.cover} alt="Investome 대표 화면" title="Investome — KEY VISUAL" recommendation="16:9 dashboard screenshot" tone="dark" /></div>

      <section className="frame section-space detail-overview">
        <SectionLabel number="01">개요</SectionLabel>
        <div className="overview-grid">
          <p className="lead">
            <span className="overview-line">주식 · 암호화폐 · 원자재 · 환율 · 경제 뉴스 등</span>
            <span className="overview-line"><strong>다양한 투자 정보</strong>와 나의 자산을 기록하는 마이페이지,</span>
            <span className="overview-line">국내주식 모의투자와 게시판까지 <strong>하나의 서비스</strong>로 연결했습니다.</span>
          </p>
          <dl className="project-spec">
            <div><dt>담당</dt><dd>기획 · 디자인 · 프론트엔드 · 백엔드 · 배포</dd></div>
            <div><dt>백엔드 핵심</dt><dd>외부 API 연동 · 실시간 시세 전달 · 중복 주문 및 잔액 처리</dd></div>
            <div><dt>기술</dt><dd>{project.stack.join(', ')}</dd></div>
            <div><dt>링크</dt><dd className="project-spec-links"><a href={project.links.live} target="_blank" rel="noopener noreferrer"><span>서비스</span><LinkIcon /></a><a href={project.links.github} target="_blank" rel="noopener noreferrer"><span>프론트엔드 GitHub</span><LinkIcon /></a><a href="https://github.com/hiwinter99/investome-backend" target="_blank" rel="noopener noreferrer"><span>백엔드 GitHub</span><LinkIcon /></a></dd></div>
          </dl>
        </div>
      </section>

      <section className="architecture section-space">
        <div className="frame">
          <SectionLabel number="02">시스템 구조</SectionLabel>
          <div className="architecture-intro architecture-intro--compact">
            <h2>
              <span>인증·게시판·자산 관리·모의투자는 Spring Boot에서,</span>
              <span>뉴스·환율·일부 시세는 Vercel Functions에서 처리합니다.</span>
            </h2>
          </div>
          <figure className="architecture-comparison">
            <a href="/images/architecture-preview/investome-architecture.svg" target="_blank" rel="noopener noreferrer" aria-label="시스템 구성도 크게 보기">
              <img src="/images/architecture-preview/investome-architecture.svg" alt="React에서 Spring Boot 및 Vercel Functions로 보내는 요청과 KIS 시세 전달, PostgreSQL 저장 흐름" />
            </a>
          </figure>
        </div>
      </section>

      <section className="frame section-space">
        <SectionLabel number="03">주요 기능</SectionLabel>
        <div className="feature-list">
          {investomeFeatures.slice(0, 2).map((feature, index) => <ProjectFeature key={feature.title} feature={feature} reverse={index % 2 === 1} />)}
          <div className="feature-secondary-grid">
            {investomeFeatures.slice(2).map((feature) => <ProjectFeature key={feature.title} feature={feature} />)}
          </div>
        </div>
      </section>

      <section className="engineering section-space">
        <div className="frame">
          <SectionLabel number="04">백엔드 구현</SectionLabel>
          <div className="engineering-intro--compact">
            <p>서로 다른 금융 API의 응답 처리, WebSocket·SSE 기반 시세 전달, 모의투자 주문의 중복·동시성 제어 중심</p>
          </div>
          <div className="engineering-case-list">
            {backendEngineeringCases.map((item, index) => <EngineeringCase item={item} defaultOpen={index === 0} key={item.index} />)}
          </div>
        </div>
      </section>

      <section className="frame section-space troubleshooting">
        <SectionLabel number="05">문제 해결 및 검증</SectionLabel>
        <div className="case-list case-list--focused">
          <details open>
            <summary><span>01</span><strong>중복 주문과 저장 실패 테스트</strong><span className="accordion-action"><span className="accordion-action-open">접기 ↑</span><span className="accordion-action-closed">내용 보기 ↓</span></span></summary>
            <div>
              <p>자동 테스트로 같은 주문을 동시에 두 번 보내도 한 번만 처리되는지 확인했습니다. 잔액이 부족한 상태에서 주문이 겹치는 경우도 테스트했습니다.</p>
              <p>주문 저장을 일부러 실패시켰을 때는 잔액과 보유 수량도 함께 원래 상태로 돌아오는지 확인했습니다.</p>
            </div>
          </details>
          <details>
            <summary><span>02</span><strong>가격이 없는 종목 처리</strong><span className="accordion-action"><span className="accordion-action-open">접기 ↑</span><span className="accordion-action-closed">내용 보기 ↓</span></span></summary>
            <div>
              <p>API 요청이 성공해도 가격이 비어 있는 종목이 있었습니다. 응답 상태만 확인해서는 부족해 가격 값도 확인하고, 누락된 가격은 다른 조회 방식으로 보완했습니다.</p>
              <p>새 순위를 가져오지 못할 때는 이전에 저장한 목록을 사용하도록 했습니다.</p>
            </div>
          </details>
          <details>
            <summary><span>03</span><strong>Nginx 요청 분배와 서버 종료 실험</strong><span className="accordion-action"><span className="accordion-action-open">접기 ↑</span><span className="accordion-action-closed">내용 보기 ↓</span></span></summary>
            <div>
              <p>로컬에서 Spring Boot 서버 두 개를 켜고 Nginx로 요청을 나눠 보내봤습니다. k6 테스트에서는 두 서버가 요청을 절반씩 처리했습니다.</p>
              <p>이후 한 서버를 직접 종료하고, Nginx가 다른 서버로 다시 연결을 시도하는 것도 응답 헤더에서 확인했습니다.</p>
              <details className="validation-evidence">
                <summary>실험 수치 보기</summary>
                <p>로컬 · k6 가상 사용자 20개 · 30초 실행<br />서버 A/B 각각 62,772건 · HTTP 오류 0건 · 백엔드 재시도 0건<br />서버 종료 실험에서는 X-Backend에 B → A 연결 시도 기록을 확인했습니다.</p>
              </details>
            </div>
          </details>
        </div>
      </section>

      <nav className="next-project frame" aria-label="다음 페이지">
        <span>다음</span><Link to="/projects">프로젝트 목록 <b>→</b></Link>
      </nav>
    </article>
  )
}
