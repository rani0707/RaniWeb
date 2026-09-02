# RaniWeb

개인 포트폴리오 웹사이트입니다.

## 주요 기능

- 포트폴리오 프로젝트 소개
- 반응형 디자인 (모바일, 태블릿, 데스크탑 지원)
- Docker 컨테이너 기반 배포
- 자동 업데이트 (Watchtower)

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프론트엔드 | Next.js 16, React |
| 런타임 | Node.js 22 |
| 컨테이너 | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| 스타일링 | CSS Modules |
| 자동 배포 | Watchtower |

## 프로젝트 구조

```
RaniWeb/
├── .github/workflows/    # GitHub Actions CI/CD 파이프라인
├── components/          # React 컴포넌트
├── public/              # 정적 파일 (이미지, 폰트 등)
├── app/                 # Next.js App Router
├── .env                 # 환경 변수
├── docker-compose.yml   # Docker Compose 설정
├── Dockerfile           # Docker 빌드 설정
└── package.json         # 프로젝트 의존성
```

## 시작하기

### 로컬 개발 환경

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev
```

### Docker로 실행

```bash
# 컨테이너 빌드 및 실행
docker compose up -d

# 실행 중인 컨테이너 확인
docker compose ps
```

## 환경 변수

`.env` 파일을 생성하여 다음 변수들을 설정할 수 있습니다.

| 변수 | 설명 | 기본값 |
|------|------|--------|
| `APP_PORT` | 호스트 포트 | 3000 |
| `PORT` | 컨테이너 내부 포트 | 3000 |
| `HOST` | 서버 바인드 주소 | 0.0.0.0 |
| `NODE_ENV` | 실행 환경 | production |

## 배포

GitHub 메인 브랜치에 코드를 푸시하면 GitHub Actions가 자동으로:

1. Docker 이미지를 빌드합니다
2. ghcr.io 레지스트리에 이미지를 배포합니다
3. 서버에서 Watchtower가 변경 사항을 감지하면 자동으로 컨테이너를 업데이트합니다

## 라이선스

MIT License
