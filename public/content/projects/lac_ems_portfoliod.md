# LAC EMS 문서 센터

LAC EMS Documentation Center

## 프로젝트 소개

LAC EMS Documentation Center는 조직 내부의 기술 문서와 매뉴얼을 한곳에서 작성·관리·열람할 수 있도록 만든 웹 기반 문서 관리 시스템입니다. 마크다운 기반의 문서 작성, 이미지 업로드, 변경 이력 추적, 관리자 권한 분리까지 문서 운영에 필요한 기능을 단일 포털로 통합해, 파편화되어 있던 사내 문서 협업 흐름을 표준화하도록 설계했습니다.

관리자 영역과 공개 문서 영역을 분리하고, JWT 기반 인증과 역할 기반 접근 제어(RBAC)를 적용해 문서 작성·수정·삭제 권한을 안전하게 통제할 수 있도록 만든 점이 특징입니다.

![메인 화면](/images/projects/0751cbf8-c86f-466b-98c3-521532f40c58.png)

![대시보드 화면](/images/projects/bd588535-15f4-4f25-9a91-3ccb19b6f763.png)

## 주요 기능

### 마크다운 문서 관리

제목, 카테고리, 본문을 가진 문서를 생성·수정·삭제할 수 있으며, `react-markdown` + `remark-gfm`으로 표·코드블록·체크리스트를 포함한 GitBook 스타일 문서를 렌더링합니다. `highlight.js`로 코드 구문 강조를 처리하고, `isomorphic-dompurify`로 XSS 위험이 있는 HTML을 sanitize합니다.

### 카테고리/슬러그 기반 라우팅

`/docs/[...slug]` 경로의 catch-all 라우팅으로 계층적 문서 트리를 지원하며, 슬러그 정규화를 통해 경로 조작(traversal)을 차단합니다. 같은 슬러그의 중복 생성도 차단합니다.

### 이미지 업로드 및 사용처 추적

관리자 페이지에서 이미지를 업로드하면 백엔드가 화이트리스트 기반 MIME/확장자 검사를 거친 뒤 디스크에 저장하고, 어떤 문서에서 사용 중인지 사용처를 추적·조회할 수 있습니다. 또한 백엔드 origin으로 들어오는 요청에 한해 이미지 프록시 fallback을 제공해 SSRF 위험을 줄였습니다.

### 휴지통 및 감사 로그

삭제된 문서는 즉시 제거되지 않고 휴지통에 보존되며, 미리보기·다운로드 후 복구하거나 영구 삭제할 수 있습니다. 모든 관리자 로그인, 문서/이미지 변경, 설정 변경은 `audit` 테이블에 기록되어 사후 추적이 가능합니다.

### 관리자 인증 및 역할 제어

JWT(HS256) 기반 인증으로 로그인 세션을 발급하며, `JWT_SECRET`이 32자 미만이면 운영 환경에서는 서버가 부팅을 거부하도록 강제했습니다. 로그인은 bcrypt + 더미 해시 비교로 타이밍 공격을 차단하고, `express-rate-limit` 8.x + `ipKeyGenerator`로 IPv6까지 안전하게 처리하는 로그인/IP별 rate limit, slow-down을 적용했습니다.

### 운영 설정 관리

`/admin-api/config`로 사이트 이름, 카테고리 목록, 정적 자산 캐시 등 운영 설정을 조회·갱신할 수 있으며, `CONFIG_API_KEY`로 보호됩니다. 운영 환경에서는 키 미설정 시 모든 설정 변경 요청이 거부됩니다.

### 보안 헤더 및 입력 검증

Helmet + 엄격한 CSP 정책으로 스크립트·프레임 임베드를 차단하고, 전역 예외 필터가 클라이언트에 stack/message를 노출하지 않도록 합니다. 본문·마크다운·이미지·슬러그의 길이·크기 제한으로 대형 페이로드 DoS를 차단합니다.

문서 편집 화면

## 기술 스택

| 구분                | 기술                                                       |
| ------------------- | ---------------------------------------------------------- |
| Frontend            | Next.js 16 (App Router, Turbopack), React 19, TypeScript   |
| UI / Markdown       | react-markdown, remark-gfm, highlight.js, isomorphic-dompurify |
| Backend             | NestJS 11, Node.js 22, Express, TypeScript                 |
| Database            | SQLite (better-sqlite3)                                    |
| Auth / Security     | JWT (HS256), bcrypt, Helmet, express-rate-limit, express-slow-down |
| Upload              | Multer                                                     |
| 기타                | gray-matter (마크다운 frontmatter), sanitize-html, marked, dotenv, cookie-parser |
| Infra               | Docker, Docker Compose, Nginx (리버스 프록시)               |

## 느낀 점

이 프로젝트를 통해 단순한 CRUD 페이지를 만드는 수준을 넘어, 실제 사내 문서 운영 흐름을 웹 서비스로 구조화하는 경험을 할 수 있었습니다. 특히 역할 기반 접근 제어와 JWT 인증, 감사 로그와 휴지통을 통한 변경 이력 관리, 슬러그 정규화와 업로드 화이트리스트를 통한 보안 설계까지 직접 구현하면서, “기능이 동작한다”를 넘어 “운영이 가능한 시스템”을 만드는 관점에서 서비스를 설계하는 역량을 키울 수 있었습니다.

또한 프론트엔드와 백엔드를 함께 구성하며, 사용자에게는 GitBook 스타일의 직관적인 읽기·편집 화면을 제공하고 서버 측에서는 인증·인가·입력 검증·보안 헤더를 안정적으로 설계하는 균형감의 중요성을 배울 수 있었습니다. 의존성 정리 단계에서 archived 패키지(`ts-node-dev`)를 `tsx`로 교체하고, `express-rate-limit` 8.x의 IPv6 안전성 검증에 맞춰 키 생성 로직을 `ipKeyGenerator`로 갱신하는 등, 최신 라이브러리 변경에 맞춰 코드를 지속적으로 유지·보수하는 습관도 함께 길렀습니다.
