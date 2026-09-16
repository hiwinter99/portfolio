import { useState } from 'react'
import { Link } from 'react-router-dom'
import ImagePlaceholder from '../components/ImagePlaceholder'
import ProjectFeature from '../components/ProjectFeature'
import SectionLabel from '../components/SectionLabel'
import { investomeFeatures, projects } from '../data/projects'

const project = projects[0]

const backendEngineeringCases = [
  {
    index: '01',
    title: 'JWT 인증과 SecurityContext',
    tech: 'OncePerRequestFilter · Spring Security',
    points: [
      { label: '기존 문제', text: 'Controller마다 토큰 검증과 사용자 식별을 반복했습니다.' },
      { label: '적용 구조', text: 'JWT 검증을 JwtAuthenticationFilter의 공통 처리로 옮겼습니다.' },
      { label: '현재 흐름', text: '검증된 사용자를 Authentication으로 만들어 SecurityContext에 저장합니다.' },
    ],
    captures: [{ image: 'backend-auth.png', file: 'JwtAuthenticationFilter.java' }],
  },
  {
    index: '02',
    title: '요청 검증과 공통 예외 응답',
    tech: 'Bean Validation · RestControllerAdvice',
    points: [
      { label: '기존 문제', text: '입력 형식 검증과 HTTP 예외 처리가 Service에 섞여 있었습니다.' },
      { label: '적용 구조', text: 'Request DTO와 @Valid, Custom Exception으로 책임을 분리했습니다.' },
      { label: '현재 흐름', text: 'GlobalExceptionHandler가 예외를 일관된 ErrorResponse로 변환합니다.' },
    ],
    captures: [
      { image: 'backend-validation.png', file: 'SignupRequest.java' },
      { image: 'backend-exception.png', file: 'GlobalExceptionHandler.java' },
    ],
  },
  {
    index: '03',
    title: '연관 데이터 삭제와 트랜잭션',
    tech: '@Transactional · Spring Data JPA',
    points: [
      { label: '기존 문제', text: '게시글을 먼저 삭제하면 댓글과 추천의 외래 키 충돌이 발생했습니다.' },
      { label: '적용 구조', text: '삭제 작업을 하나의 트랜잭션으로 묶고 처리 순서를 명시했습니다.' },
      { label: '현재 흐름', text: '추천, 댓글, 게시글 순서로 연관 데이터를 안전하게 삭제합니다.' },
    ],
    captures: [{ image: 'backend-transaction.png', file: 'BoardService.java · deletePost()' }],
  },
]

function EngineeringCase({ item, defaultOpen }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [activeIndex, setActiveIndex] = useState(0)
  const capture = item.captures[activeIndex]
  const showPrevious = () => setActiveIndex((index) => (index - 1 + item.captures.length) % item.captures.length)
  const showNext = () => setActiveIndex((index) => (index + 1) % item.captures.length)

  return (
    <details open={isOpen} onToggle={(event) => setIsOpen(event.currentTarget.open)}>
      <summary>
        <span>{item.index}</span>
        <div><strong>{item.title}</strong><small>{item.tech}</small></div>
        <span className="accordion-action">
          <span className="accordion-action-open">접기 ↑</span>
          <span className="accordion-action-closed">코드 보기 ↓</span>
        </span>
      </summary>
      <div className="engineering-case-content">
        <div className="engineering-case-copy">
          <dl className="engineering-case-points">
            {item.points.map(({ label, text }) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}
          </dl>
          <small>코드 화면 · {capture.file}</small>
        </div>
        <div className="feature-gallery engineering-case-gallery">
          <ImagePlaceholder key={capture.image} src={`/images/projects/investome/${capture.image}`} alt={`${item.title} 코드 화면 ${activeIndex + 1}`} title={capture.file} recommendation="STS or VS Code code capture" tone="dark" />
          {item.captures.length > 1 && <>
            <button className="feature-gallery-button feature-gallery-button--previous" type="button" onClick={showPrevious} aria-label={`${item.title} 이전 코드 이미지`}>‹</button>
            <button className="feature-gallery-button feature-gallery-button--next" type="button" onClick={showNext} aria-label={`${item.title} 다음 코드 이미지`}>›</button>
            <span className="feature-gallery-count" aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} / {String(item.captures.length).padStart(2, '0')}</span>
          </>}
        </div>
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
          <p className="detail-summary">다양한 경제, 투자 관련 데이터와 마이페이지, 게시판 기능까지 더한 하나의 <strong>개인 투자 정보 플랫폼</strong></p>
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
            <span className="overview-line">그리고 게시판까지의 흐름을 <strong>하나의 서비스</strong>로 연결했습니다.</span>
          </p>
          <dl className="project-spec">
            <div><dt>담당</dt><dd>기획 · 디자인 · 프론트엔드 · 백엔드 · 배포</dd></div>
            <div><dt>백엔드 핵심</dt><dd>인증 구조 · 데이터 무결성 · 외부 API 안정성</dd></div>
            <div><dt>기술</dt><dd>{project.stack.join(', ')}</dd></div>
            <div><dt>링크</dt><dd><a href={project.links.live} target="_blank" rel="noreferrer">서비스 ↗</a> <a href={project.links.github} target="_blank" rel="noreferrer">GitHub ↗</a></dd></div>
          </dl>
        </div>
      </section>

      <section className="architecture section-space">
        <div className="frame">
          <SectionLabel number="02">시스템 구조</SectionLabel>
          <div className="architecture-intro">
            <h2>외부 API와 자체 데이터의<br />책임을 분리했습니다.</h2>
            <p>Investome 자체 데이터는 Spring Boot가,<br />외부 금융 데이터는 Vercel Functions가 처리합니다.</p>
          </div>
          <div className="architecture-map" aria-label="Investome 시스템 구조">
            <div className="architecture-node architecture-node--main"><span>클라이언트</span><strong>React</strong><small>화면 · 상태 관리<br />API 요청</small></div>
            <div className="architecture-branch">
              <div className="architecture-node"><span>핵심 서버</span><strong>Spring Boot</strong><small>인증 · 비즈니스 로직<br />데이터 접근</small></div>
              <div className="architecture-node"><span>자체 데이터</span><strong>PostgreSQL</strong><small>사용자 · 게시판<br />포트폴리오</small></div>
            </div>
            <div className="architecture-branch">
              <div className="architecture-node"><span>외부 API 계층</span><strong>Vercel Functions</strong><small>응답 정규화 · 캐시<br />실패 시 대체 처리</small></div>
              <div className="architecture-node"><span>데이터 제공처</span><strong>금융 API</strong><small>KIS · Yahoo<br />CoinGecko · Upbit</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="frame section-space">
        <SectionLabel number="03">주요 기능</SectionLabel>
        <div className="feature-list">
          {investomeFeatures.map((feature, index) => <ProjectFeature key={feature.title} feature={feature} reverse={index % 2 === 1} />)}
        </div>
      </section>

      <section className="engineering section-space">
        <div className="frame">
          <SectionLabel number="04">백엔드 구현</SectionLabel>
          <div className="engineering-grid">
            <div className="engineering-title"><h2>서비스의 안정성과 연결되는 백엔드 구현을 정리했습니다.</h2></div>
            <div className="engineering-copy">
              <p>인증, 요청 검증과 예외 처리, 데이터 무결성처럼 서비스의 안정성과 직접 연결되는 구현만 선별했습니다.</p>
            </div>
          </div>
          <div className="engineering-case-list">
            {backendEngineeringCases.map((item, index) => <EngineeringCase item={item} defaultOpen={index === 0} key={item.index} />)}
          </div>
        </div>
      </section>

      <section className="frame section-space refactoring">
        <SectionLabel number="05">리팩터링</SectionLabel>
        <div className="refactor-heading"><h2>반복 구현을 공통 처리로 옮기고 책임을 분리했습니다.</h2><p>동작을 바꾸기보다 각 처리가 있어야 할 위치를 다시 정리했습니다.</p></div>
        <div className="comparison">
          <div className="comparison-head"><span>변경 전</span><span>변경 후</span></div>
          {[
            ['Controller의 JWT 직접 파싱', 'JWT Filter의 공통 인증 처리'],
            ['Service의 입력 형식 검증', 'Request DTO Validation'],
            ['Service의 HTTP 응답 결정', 'Custom Exception과 전역 예외 처리'],
            ['React의 외부 API 응답 의존', 'Vercel Functions 응답 정규화'],
          ].map(([before, after]) => <div className="comparison-row" key={before}><p>{before}</p><span>→</span><p>{after}</p></div>)}
        </div>
      </section>

      <section className="frame section-space troubleshooting">
        <SectionLabel number="06">문제 해결</SectionLabel>
        <h2>배포와 운영 과정에서 마주한 문제를 해결했습니다.</h2>
        <div className="case-list">
          <details open>
            <summary><span>01</span><strong>Vercel 배포 후 /api/ticker 404</strong><span className="accordion-action"><span className="accordion-action-open">접기 ↑</span><span className="accordion-action-closed">내용 보기 ↓</span></span></summary>
            <div><p><b>원인</b> Vite middleware는 로컬 개발 서버에만 존재했고 운영 환경에는 실제 API endpoint가 없었습니다.</p><p><b>해결</b> 외부 금융 API를 Vercel Functions로 이동해 배포 환경의 실행 모델과 일치시켰습니다.</p><p><b>결과</b> 개발과 배포 환경에서 동일한 /api 요청 경로를 사용할 수 있게 됐습니다.</p></div>
          </details>
          <details>
            <summary><span>02</span><strong>외부 API 실패와 누락 데이터</strong><span className="accordion-action"><span className="accordion-action-open">접기 ↑</span><span className="accordion-action-closed">내용 보기 ↓</span></span></summary>
            <div><p><b>원인</b> HTTP 성공과 화면에 필요한 필드의 완전성을 같은 것으로 판단했습니다.</p><p><b>해결</b> KIS → Yahoo fallback, Yahoo quote → chart metadata 보조 경로, 종목별 독립 처리와 stale cache를 적용했습니다.</p><p><b>결과</b> 일부 공급자의 실패가 전체 종목 조회 실패로 이어지지 않도록 개선했습니다.</p></div>
          </details>
          <details>
            <summary><span>03</span><strong>게시글 삭제 시 연관 데이터 충돌</strong><span className="accordion-action"><span className="accordion-action-open">접기 ↑</span><span className="accordion-action-closed">내용 보기 ↓</span></span></summary>
            <div><p><b>원인</b> FK가 연결된 추천과 댓글보다 게시글 삭제가 먼저 시도될 수 있었습니다.</p><p><b>해결</b> transaction 안에서 추천 → 댓글 → 게시글 순서를 명시하고 cascade/orphan removal을 정리했습니다.</p><p><b>결과</b> 외래 키 충돌 없이 게시글과 연관 데이터를 함께 삭제할 수 있게 됐습니다.</p></div>
          </details>
        </div>
      </section>

      <nav className="next-project frame" aria-label="다음 페이지">
        <span>다음</span><Link to="/projects">프로젝트 목록 <b>→</b></Link>
      </nav>
    </article>
  )
}
