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
        <div className="detail-service-actions">
          <a className="detail-service-link" href={project.links.live} target="_blank" rel="noopener noreferrer">
            <span>Investome 홈페이지</span>
            <span className="detail-service-arrow" aria-hidden="true">↗</span>
          </a>
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
            <h2>서비스 데이터와 외부 API의 처리 경로를 나누어 구성했습니다.</h2>
            <p>회원·게시판·마이페이지는 Spring Boot가 담당하고,<br />뉴스·환율·일부 시세 데이터는 Vercel Functions가 처리합니다.</p>
          </div>
          <div className="architecture-map" aria-label="Investome 시스템 구조">
            <div className="architecture-node architecture-node--main"><span>클라이언트</span><strong>React</strong><small>화면 · 상태 관리<br />API 요청</small></div>
            <div className="architecture-branch">
              <div className="architecture-node"><span>핵심 서버</span><strong>Spring Boot</strong><small>인증 · 게시판<br />마이페이지</small></div>
              <div className="architecture-node"><span>자체 데이터</span><strong>PostgreSQL</strong><small>사용자 · 게시판<br />포트폴리오</small></div>
            </div>
            <div className="architecture-branch">
              <div className="architecture-node"><span>외부 API 계층</span><strong>Vercel Functions</strong><small>뉴스 · 환율<br />코인 · 원자재 시세</small></div>
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
            ['CoinGecko Top30 필드 직접 사용', 'Vercel에서 공통 랭킹 형식으로 변환'],
          ].map(([before, after]) => <div className="comparison-row" key={before}><p>{before}</p><span>→</span><p>{after}</p></div>)}
        </div>
      </section>

      <section className="frame section-space troubleshooting">
        <SectionLabel number="06">문제 해결</SectionLabel>
        <h2>배포와 운영 과정에서 마주한 문제를 해결했습니다.</h2>
        <div className="case-list">
          <details open>
            <summary><span>01</span><strong>Vercel 배포 후 /api/ticker 404</strong><span className="accordion-action"><span className="accordion-action-open">접기 ↑</span><span className="accordion-action-closed">내용 보기 ↓</span></span></summary>
            <div><p><b>원인</b> <code>/api/ticker</code>는 Vite 개발 서버의 middleware에만 있어 Vercel 운영 환경에는 endpoint가 없었습니다.</p><p><b>판단</b> 브라우저의 직접 외부 호출은 임시 우회였고, 운영 환경에서 실행되는 서버 API가 필요했습니다.</p><p><b>해결</b> Vite middleware의 외부 API 처리를 Vercel Functions의 <code>/api</code> endpoint로 옮겼습니다.</p><p><b>결과</b> 개발과 배포 환경에서 동일한 <code>/api</code> 요청 경로를 사용할 수 있게 됐습니다.</p></div>
          </details>
          <details>
            <summary><span>02</span><strong>외부 API 실패와 누락 데이터</strong><span className="accordion-action"><span className="accordion-action-open">접기 ↑</span><span className="accordion-action-closed">내용 보기 ↓</span></span></summary>
            <div><p><b>원인</b> 공급자가 응답해도 가격 필드가 비어 있거나 일부 종목 요청만 실패할 수 있었습니다.</p><p><b>판단</b> HTTP 성공 여부와 화면에 사용할 데이터의 완전성을 별도로 확인해야 했습니다.</p><p><b>해결</b> KIS → Yahoo 대체, Yahoo quote → chart 보완, 종목별 독립 처리와 stale cache를 적용했습니다.</p><p><b>결과</b> 일부 공급자나 종목의 실패가 전체 목록 실패로 이어지지 않도록 개선했습니다.</p></div>
          </details>
          <details>
            <summary><span>03</span><strong>게시글 삭제 시 연관 데이터 충돌</strong><span className="accordion-action"><span className="accordion-action-open">접기 ↑</span><span className="accordion-action-closed">내용 보기 ↓</span></span></summary>
            <div><p><b>원인</b> 추천과 댓글이 게시글을 참조한 상태에서 게시글 삭제가 먼저 시도됐습니다.</p><p><b>판단</b> 부모 데이터보다 외래 키로 연결된 연관 데이터를 먼저 정리해야 했습니다.</p><p><b>해결</b> <code>@Transactional</code> 안에서 추천 → 댓글 → 게시글 순서로 삭제하도록 명시했습니다.</p><p><b>결과</b> 외래 키 충돌 없이 게시글과 연관 데이터를 함께 삭제할 수 있게 됐습니다.</p></div>
          </details>
        </div>
      </section>

      <section className="frame section-space troubleshooting">
        <SectionLabel number="07">이후 개선 · Redis 공유 캐시</SectionLabel>
        <h2>서버별 메모리 캐시에서 공유 캐시로 확장했습니다.</h2>
        <p>초기 개발 이후 다중 서버 환경을 학습하며 암호화폐 TOP 30 조회 기능을 개선했습니다. 아래 내용은 운영 배포 성과가 아닌 로컬 구현 및 검증 결과입니다.</p>
        <div className="case-list">
          <details open>
            <summary><span>01</span><strong>도입 배경과 Spring Boot 구현</strong><span className="accordion-action"><span className="accordion-action-open">접기 ↑</span><span className="accordion-action-closed">내용 보기 ↓</span></span></summary>
            <div>
              <p><b>기존 구조</b> 외부 API 호출을 줄이기 위해 메모리 캐시를 사용했지만, 각 서버가 데이터를 따로 보관하므로 서버 간 캐시를 공유할 수 없었습니다.</p>
              <p><b>적용</b> Spring Data Redis의 StringRedisTemplate로 코인 목록을 JSON 문자열로 저장하고 TTL을 5분으로 설정했습니다. Redis에 값이 있으면 반환하고, 없으면 외부 API를 조회한 뒤 저장하도록 구성했습니다.</p>
              <p><b>장애 대응</b> Redis를 사용할 수 없으면 60초 이내의 메모리 캐시를 사용하고, 유효한 캐시가 없으면 외부 API를 조회합니다. 외부 조회도 실패하면 메모리에 남은 이전 목록을 반환하며, 이전 목록도 없으면 빈 목록을 반환합니다.</p>
            </div>
          </details>
          <details open>
            <summary><span>02</span><strong>실험 결과와 확인한 한계</strong><span className="accordion-action"><span className="accordion-action-open">접기 ↑</span><span className="accordion-action-closed">내용 보기 ↓</span></span></summary>
            <div>
              <p><b>공유 검증</b> 가짜 외부 API를 사용하는 별도의 Node.js 두 프로세스 실험에서 A 요청이 끝난 뒤 B에 요청했습니다. 외부 조회는 서버별 메모리 캐시에서 총 2회, Redis 공유 캐시에서 총 1회 발생했습니다.</p>
              <p><b>Spring Boot 검증</b> 로컬 홈페이지의 코인 요청을 Spring Boot에 연결해 실제 코인 데이터 저장을 확인했습니다. 재조회 시 TTL이 300초에서 289초로 감소한 것을 확인했고, Redis 관련 모의 테스트를 포함한 전체 자동 테스트 48개가 통과했습니다.</p>
              <p><b>판단</b> 단일 서버의 합성 데이터 실험에서는 Redis의 평균 응답 시간이 메모리 캐시보다 길었습니다. 이번 도입에서 확인한 이점은 속도 향상보다 서버 간 캐시 공유와 외부 API 중복 조회 감소입니다.</p>
              <p><b>한계</b> 여러 서버가 동시에 캐시 미스를 만나면 외부 조회가 중복될 수 있습니다. 현재 구현에는 분산 잠금이 없으며, 메모리에 보관한 이전 목록은 서버 재시작 후 유지되지 않습니다.</p>
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
