export const projects = [
  { number: '01', slug: 'investome', title: 'Investome', category: 'Personal Project', cover: '/images/projects/investome/investomeMain.png', showInExperience: true, timelinePeriod: '2026', timelineDetail: '개인 투자 정보 플랫폼 · 이후 개선 중', summary: '금융 정보 탐색부터 국내주식 모의투자와 자산 관리까지 연결한 개인 투자 플랫폼', year: '2026', period: '2026.03 — 2026.08 · 이후 개선 중', role: 'Planning · Design · Frontend · Backend · Deployment', stack: ['React', 'Spring Boot', 'PostgreSQL', 'Vercel Functions', 'Redis'], status: 'in-progress', statusLabel: '개선 중', links: { live: 'https://investome.vercel.app/', github: 'https://github.com/Kimdonggyu26/investome' } },
  { number: '02', slug: 'cruella', title: 'CRUELLA', category: 'Academy Team Project', summary: '로그인과 근태·휴가, 메모, 전자서명 업무 흐름을 구현한 그룹웨어 팀 프로젝트', year: 'TBD', period: 'TBD', role: '로그인·비밀번호 / 출퇴근·근태·휴가 / 메모 / 전자서명', stack: ['Java', 'JSP', 'Servlet', 'Oracle DB', 'Tomcat 9'], status: 'documented', links: { github: 'https://github.com/Kimdonggyu26/cruellaPJ' } },
  { number: '03', slug: 'mvp', title: 'MVP', category: 'Academy Team Project', summary: '영화 비교와 리뷰·커뮤니티 기능을 구현한 영화 정보 팀 프로젝트', year: 'TBD', period: 'TBD', role: '관리자 서비스 / 영화 CRUD·상세 조회 / 리뷰·댓글 / 댓글 좋아요', stack: ['Java', 'JSP', 'Servlet', 'Oracle DB', 'Tomcat 9'], status: 'documented', links: { github: 'https://github.com/Kimdonggyu26/AllMan_MVP_Project' } },
  { number: '04', slug: 'myvitaday', title: 'VitaDay', category: 'Personal Project', summary: '모바일 우선 영양제 검색 · 비교 앱 프로토타입으로 현재 개발 중입니다.', year: '2026', period: 'TBD', role: 'TBD', stack: ['React Native', 'Expo', 'Spring Boot', 'PostgreSQL'], status: 'in-progress', statusLabel: '진행중', showInExperience: true, timelinePeriod: '2026', timelineDetail: '영양제 검색 · 비교 서비스', links: { github: 'https://github.com/Kimdonggyu26/myVitaDay' } },
]

export const investomeFeatures = [
  { index: '01', title: '시세·종목 조회', body: '주식·가상자산의 현재가와 등락률, 환율, 금융 뉴스를 한 화면에서 탐색합니다.', images: ['dashboard.png', 'dashboard2.png'], recommendation: '16:9 desktop screenshot' },
  { index: '02', title: '모의투자', images: ['paper-trading.png'], recommendation: '모의투자 화면 캡처', body: '당일 코스피 TOP 30을 대상으로 가상 자금으로 매수·매도하고, 보유 종목·잔액·주문 내역을 확인합니다.', flow: ['코스피 종목 중 투자할 종목과 주문 수량 선택', '한국투자증권 API로 서버에서 현재가를 확인해 매수·매도 처리', '체결 결과에 따라 잔액과 보유 수량을 갱신하고 주문 이력 저장', '보유 종목의 평가금액·수익률과 매수·매도 내역 확인'] },
  { index: '03', title: '포트폴리오 관리', body: '보유 종목과 목표 금액을 기록하고 나의 자산 현황을 확인합니다.', images: ['portfolio.png', 'portfolio2.png'], recommendation: 'portfolio summary + holdings' },
  { index: '04', title: '게시판·댓글', body: '게시글을 작성하고 댓글과 추천으로 투자에 관한 의견을 나눕니다.', images: ['community.png', 'community2.png'], recommendation: 'post detail + comments' },
]

