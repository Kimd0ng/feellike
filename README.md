# Feel Economy (필코노미)

감정 기반 소비 추천 서비스 - "지금 이 순간 기분에 맞춰 소비한다"

## 프로젝트 개요

Feel Economy는 사용자의 현재 감정과 주변 환경(날씨, 시간)을 분석하여 최적의 소비 활동을 추천하는 맞춤형 큐레이션 서비스입니다.

### 핵심 가치
- 감정 기반 소비(Emotional Consumption)의 효율화
- 결정 장애 해소
- 실시간 컨텍스트 분석

## 기술 스택

### Core
- **React 19** - UI 라이브러리
- **TypeScript 5.5** - 타입 안정성
- **Vite 5** - 빌드 도구

### Monorepo
- **Turborepo** - Task orchestration
- **pnpm** - Package manager

### Styling
- **Vanilla Extract** - 빌드타임 CSS-in-JS

### Data & State
- **TanStack Query** - 서버 상태 관리
- **Jotai** - 클라이언트 상태 관리
- **Axios** - HTTP 클라이언트

### Backend
- **Supabase** - Auth, Database, Edge Functions
- **OpenAI GPT-4o-mini** - AI 분석 및 추천

## 시작하기

### 필수 요구사항
- Node.js >= 20.0.0
- pnpm >= 9.0.0

### 설치

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 린트
pnpm lint
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI (Edge Function에서 사용)
OPENAI_API_KEY=your_openai_api_key

# OpenWeatherMap (Edge Function에서 사용)
WEATHER_API_KEY=your_weather_api_key
```

## 프로젝트 구조

```
feellike/
├── apps/
│   └── client/          # 메인 클라이언트 앱
├── packages/
│   ├── ui/              # 디자인 시스템
│   ├── api/             # API 클라이언트
│   ├── typescript-config/
│   └── eslint-config/
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## 개발 컨벤션

프로젝트의 개발 컨벤션은 다음 문서를 참조하세요:
- [Architecture Guide](./monorepo-boilerplate/architecture-guide.md)
- [Development Conventions](./monorepo-boilerplate/development-conventions.md)
- [Design System Structure](./monorepo-boilerplate/design-system-structure.md)

## 라이선스

MIT
