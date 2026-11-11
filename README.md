# 김동규 포트폴리오

## 📌 프로젝트 소개

개발 프로젝트와 담당 기능, 사용 기술을 정리한 개인 포트폴리오 사이트입니다.

금융·투자 서비스인 Investome와 교육과정에서 진행한 CRUELLA, MVP 팀 프로젝트를 소개합니다.

## 🔗 링크

- [포트폴리오 방문하기](https://kimdonggyu-portfolio.vercel.app/)
- [GitHub 프로필](https://github.com/hiwinter99)
- [Investome 방문하기](https://investome.vercel.app/)

## 🛠️ 사용 기술

- Front-end: React, JavaScript, Vite
- Routing: React Router
- Style: CSS
- 배포: Vercel

## ✨ 주요 내용

- 자기소개 / 사용 기술 / 교육 이력 / 자격증 / 연락처
- Investome 서비스 화면과 시스템 구성도
- 외부 API 연동, 실시간 시세 전달, 모의투자 주문 처리 소개
- Redis 캐시와 Nginx 로컬 실험 정리
- CRUELLA, MVP의 담당 기능과 협업 경험
- 실제 서비스 / GitHub / 노션 자료 연결

## 👤 담당

화면 구성, 프로젝트 내용 정리, React 개발과 배포를 진행했습니다.

## 📂 실행 방법

```sh
npm ci
npm run dev
```

배포용 빌드:

```sh
npm run build
```

## 📁 주요 파일

- `src/data/profile.js`: 자기소개, 기술, 교육, 자격증
- `src/data/projects.js`: 프로젝트 목록과 Investome 주요 기능
- `src/data/investomeEngineering.js`: Investome 백엔드 구현 설명
- `src/data/teamProjects.js`: CRUELLA, MVP 소개
- `src/pages/`: 홈, 프로젝트 목록과 상세 페이지
- `public/images/`: 프로필, 서비스 화면과 코드 캡처
