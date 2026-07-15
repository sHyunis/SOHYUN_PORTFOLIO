# 정소현 Frontend Portfolio

사용자가 멈칫하는 순간을 정리하고, 팀이 손으로 반복하는 일을 시스템으로 바꾸어 온 경험을 담은 포트폴리오입니다.

[포트폴리오 바로가기](https://portfolio-jsh-xi.vercel.app)

## 주요 내용

- 자리톡에서 진행한 No-Code 폼 빌더, QA 자동화, App Router·TanStack Query 마이그레이션
- 위밋모빌리티에서 진행한 실시간 관제, 오더 시스템, 대량 업로드, 공통 테이블·필터 시스템
- 문제 상황, 해결 방법, 정량적 결과를 함께 보여주는 경력 타임라인
- 오늘 헤어졌어요를 포함한 개인·팀 프로젝트와 핵심 기여 내용
- 3D 월드 탐색과 전체 내용을 빠르게 확인하는 Overview 화면
- Supabase 기반 방명록과 관리자 답글 기능

## 기술 스택

- Next.js 16, React 19, TypeScript
- React Three Fiber, Drei, Three.js
- Framer Motion, Zustand, Lenis
- Tailwind CSS 4
- Supabase, Vercel

## 로컬 실행

```bash
pnpm install
pnpm dev
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 검증

```bash
pnpm lint
pnpm build
```

## 주요 구조

```text
app/                    Next.js App Router와 메타데이터
components/3d/          3D 월드, 아바타, 카메라 인터랙션
components/experience/  경력과 문제 해결 성과
components/projects/    개인·팀 프로젝트
components/data.ts      프로필, 경력, 프로젝트 콘텐츠
store/                  3D 월드와 UI 상태
```
