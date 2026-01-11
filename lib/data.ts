export const PROFILE = {
  name: "정소현",
  role: "Frontend Developer",
  email: "gkalice0751@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/%EC%86%8C%ED%98%84-%EC%A0%95-100448322/",
    velog: "https://velog.io/@alice0751/posts",
    github: "https://github.com/sHyunis",
    portfolio: "#",
  },
  philosophy: [
    "기술을 넘어 제품의 가치를 만드는 프론트엔드 개발자 정소현입니다.",
    "문제가 반복되지 않는 구조를 설계하고, 사용자 경험과 비즈니스 가치를 함께 높이는 개발을 지향합니다.",
    "또한, 사용자의 행동을 이해하고, 빠르게 실험하며, 실제 서비스의 가치를 만드는 과정에 가장 큰 보람을 느낍니다.",
  ],
  intro: {
    title: "기획력 기반의 실행과 프로덕트 오너십",
    description: "기획 단계부터 완성도 높은 프로덕트 구현에 기여하는 프론트엔드 개발자입니다. 책임감 있는 실행력과 유연한 커뮤니케이션 능력을 바탕으로, 애자일 환경에서 프로젝트를 주도하며 성장을 이끌었습니다.",
  }
};

export const SKILLS = [
  { category: "Core", items: ["Next.js", "React", "TypeScript"] },
  { category: "Styling", items: ["Panda CSS", "Vanilla extract", "Tailwind CSS"] },
  { category: "State & Data", items: ["Zustand", "Jotai", "TanStack Query", "React Hook Form", "Zod"] },
  { category: "Tools", items: ["Git", "Github", "Figma", "Jira", "Slack", "Notion", "Flex"] },
];

export const EXPERIENCE = [
  {
    company: "자리컴퍼니",
    role: "Frontend Developer",
    period: "2025.07 ~ 재직중",
    description: "자리톡 – 주거서비스 연결 플랫폼",
    projects: [
      {
        title: "신규 견적 서비스 MVP 단독 개발",
        details: [
          "초기 기획 회의 참여 및 채팅 UI 설계",
          "어드민 카테고리별 폼 생성기 구현",
          "어드민 미리보기 설계 및 구현",
          "카카오싱크 연동 소셜 로그인, 권한 분기 및 보안 고려한 인증 구조 개발",
        ]
      },
      {
        title: "혜택 탭 서비스 개발",
        details: [
          "A/B 테스트 기반 UX 개선",
          "사용자 행동 데이터 분석 및 실험 결과 반영 구조 설계",
        ]
      },
      {
        title: "DX 개선 및 디자인 컴포넌트 개발",
        details: [
          "Tooltip, DatePicker, 주소지 검색 UI 등 공통 UI 컴포넌트 개발",
          "ESLint 타입 규칙 적용 및 공통 유틸/커스텀 Hooks 정리",
        ]
      },
      {
        title: "애자일 릴리즈 사이클 CI/CD",
        details: [
          "주 1회 배포의 애자일 릴리스 사이클 기여",
          "유저 피드백 우선순위에 따른 실시간 대응 및 에러 리포팅 대응",
        ]
      }
    ]
  },
  {
    company: "위밋모빌리티",
    role: "Frontend Developer",
    period: "2024.12 ~ 2025.07",
    description: "루티프로 - 미들마일 중심의 배차 시스템",
    projects: [
      {
        title: "오더 시스템 고도화",
        details: [
          "단건/다건/전체 주문 처리 기능 및 상태 기반 일괄 처리 기능 설계",
          "주문 상태별 필터 기능 생성 및 공통 필터 컴포넌트화",
        ]
      },
      {
        title: "실시간 편집 테이블 개발",
        details: [
          "TanStack Table 기반 셀 단위 렌더링 최적화",
          "에러 피드백 UX 구현 및 조회/수정 테이블 토글 전환 기능 개발",
        ]
      },
      {
        title: "SSR 기반 UX 개선",
        details: [
          "초기 렌더링 성능 향상 및 직관적인 필터 UX 설계",
        ]
      },
      {
        title: "루티 V2 – 라스트마일 물류 관제 MVP",
        details: [
          "엑셀 업로드 기반 주문 등록 및 상태 반영",
          "SSE 기반 업로드 진행률 시각화",
          "WebSocket 기반 실시간 차량 상태 수신 및 Deck.gl 활용 지도 시각화",
        ]
      },
      {
        title: "위밋 디자인 시스템 ver1, ver2",
        details: [
          "컴포넌트 구조, 네이밍, 폴더 구조 등 아키텍처 설계 참여",
          "공통 UI 패턴 정의 및 Storybook 기반 문서화",
        ]
      }
    ]
  }
];

export const PROJECTS = [
  {
    name: "Dream Card (드림카드)",
    period: "2024.10 ~ 2024.11 (5 weeks)",
    role: "Frontend Developer",
    description: "모바일 청첩장 커스텀 제작 서비스",
    link: "#", // User to provide URL
    tech: ["Next.js", "Zustand", "TypeScript", "TanStack Query", "React Hook Form", "Tailwind CSS"],
    features: [
      "CPU 부하로 인한 프레임 드랍 개선 (Intersection Observer 도입)",
      "깊은 비교 및 정렬을 통한 제작 진척률 정확도 개선",
      "React Hook Form을 활용한 실시간 입력값 미리보기",
      "Quill editor를 사용한 텍스트 스타일링 지원",
      "Web Share API를 이용한 공유하기 개발",
      "Sharp와 WebP를 활용한 이미지 최적화",
      "TanStack Query의 낙관적 업데이트로 좋아요 버튼 반응 속도 개선",
      "Sentry를 활용한 실시간 에러 수집",
    ]
  },
  {
    name: "커튼콜",
    period: "2024.09.11 ~ 2024.09.23 (2 weeks)",
    role: "Frontend Developer",
    description: "공연 정보 및 예매 서비스",
    link: "#", // User to provide URL
    tech: ["React", "Zustand", "TanStack Query", "Styled Components"],
    features: [
      "debounce를 활용한 실시간 곡 검색 최적화",
      "카카오 지도 API를 사용한 공연 장소 지도 표시",
      "TanStack Query를 활용한 상세페이지 댓글 CRUD 구현",
    ]
  }
];

export const EDUCATION = [
  {
    name: "스파르타 내일배움캠프",
    period: "2024.7 - 2024.12",
    description: "React 6기 (최종프로젝트 최우수상)"
  },
  {
    name: "코리아 IT 아카데미",
    period: "2024.1 - 2024.6",
    description: "프론트엔드 개발과정 수료"
  },
  {
    name: "메가스터디 IT 아카데미",
    period: "2023.10 - 2023.12",
    description: "파이썬 단과과정 수료"
  }
];
