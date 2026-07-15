export const PROFILE = {
  name: "정소현",
  role: "Frontend Developer",
  email: "gkalice0751@gmail.com",
  avatar: "/images/profile.jpg",
  links: {
    linkedin: "https://www.linkedin.com/in/%EC%86%8C%ED%98%84-%EC%A0%95-100448322/",
    velog: "https://velog.io/@alice0751/posts",
    github: "https://github.com/sHyunis",
  },
  philosophy: [
    "사용자가 멈칫하는 순간을 발견하면 흐름이 다시 이어질 때까지 파고듭니다.",
    "팀이 손으로 반복하는 일은 자동화와 시스템으로 바꿉니다.",
    "좋은 코드는 누군가의 집중력을 되돌려주는 방향으로 남아야 한다고 믿습니다.",
  ],
  details: [
    {
      title: "사용자 흐름을 끝까지 완결합니다",
      content: [
        "기획 참여부터 배포까지 프론트엔드 전 주기를 책임지고, 상태별 예외와 CTA 분기를 먼저 정리합니다.",
        "경쟁 서비스와 실제 사용 흐름을 비교해 신청 장벽과 불필요한 클릭 단계를 줄이는 방향을 제안합니다.",
      ],
    },
    {
      title: "반복 문제를 시스템으로 바꿉니다",
      content: [
        "운영팀이 직접 배포하는 No-Code 폼 빌더, QA 자동화 파이프라인, 공통 컴포넌트처럼 개인의 수작업을 팀의 자산으로 전환합니다.",
        "반복되는 SVG 오류는 커스텀 ESLint 룰로 옮겨 IDE와 CI에서 모두가 따르는 가드레일로 만들었습니다.",
      ],
    },
    {
      title: "측정하고 팀의 기준으로 남깁니다",
      content: [
        "성능과 번들 크기를 수치로 확인하고, 대규모 마이그레이션의 자동화 영역과 사람의 판단 영역을 분리합니다.",
        "변환 규칙과 판단 기준을 문서화해 한 번의 개선이 팀 전체의 작업 방식으로 남도록 합니다.",
      ],
    },
  ],
};

export const SKILLS = [
  { category: "Core", items: ["Next.js", "React", "TypeScript"] },
  { category: "UI & Interaction", items: ["Panda CSS", "Vanilla Extract", "Tailwind CSS", "Framer Motion"] },
  { category: "State & Data", items: ["Zustand", "Jotai", "TanStack Query", "React Hook Form", "Zod"] },
  { category: "Delivery & Collaboration", items: ["GitHub Actions", "Vercel", "AWS CloudFront", "Supabase", "Figma", "Jira", "Notion"] },
];

interface ExperienceProject {
  title: string;
  tag: string;
  summary: string;
  details: string[];
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  projects: ExperienceProject[];
}

export const EXPERIENCE = [
  {
    company: "자리컴퍼니",
    role: "Frontend Developer",
    period: "2025.07 ~ 재직중",
    description: "자리톡 - 500만 명이 사용하는 부동산 서비스 플랫폼",
    projects: [
      {
        title: "No-Code 폼 빌더 시스템",
        tag: "운영 자동화 · 시스템화",
        summary: "신규 견적 카테고리마다 필요했던 프론트엔드 수정과 배포를 운영팀 자율 배포 구조로 전환했습니다.",
        details: [
          "React Hook Form 기반 비제어 컴포넌트로 8종 필드 타입의 동적 폼 엔진을 설계했습니다.",
          "어드민 편집 화면에 실제 모바일 채팅 UI와 동일한 실시간 미리보기를 제공해 배포 전 오류를 검증했습니다.",
          "어드민과 사용자 UI가 동일한 동적 컴포넌트 분기 패턴을 공유하도록 구성해 단일 수정점을 확보했습니다.",
        ],
      },
      {
        title: "견적 매칭 서비스 MVP",
        tag: "0 to 1 · 제품 흐름",
        summary: "기획 참여부터 배포까지 프론트엔드 전 주기를 맡고, 신청과 비교·선택 흐름의 장벽을 낮췄습니다.",
        details: [
          "신청 가능 여부, 모집 마감, 기존 신청 이력 등 상태별 UI와 CTA 예외 케이스를 정리했습니다.",
          "사업자등록증 제출 시점을 10번째 견적 신청 시점으로 늦추는 아이디어를 제안해 초기 신청 장벽을 낮췄습니다.",
          "견적 상세에서 바로 비교·선택하도록 플로우를 개선해 채팅방을 거치는 클릭 단계를 줄였습니다.",
          "Framer Motion variant 기반 채팅형 다단계 인터랙션과 후기·별점 시스템을 구현했습니다.",
        ],
      },
      {
        title: "QA 자동화 워크플로우",
        tag: "DX 자동화 · 협업",
        summary: "GitHub Actions, Claude API, Notion DB, Slack 파이프라인으로 QA 작성 공수를 약 90% 줄였습니다.",
        details: [
          "자동화 가능한 QA와 사람의 판단이 필요한 QA를 분리하도록 프롬프트와 실행 흐름을 설계했습니다.",
          "단일 시트에 누적되던 QA를 Notion DB로 재설계해 서비스·담당자별 분리와 캘린더 뷰를 제공했습니다.",
          "비개발자도 구체적인 QA를 수행할 수 있도록 작성 기준과 전달 형식을 표준화했습니다.",
        ],
      },
      {
        title: "Next.js App Router 마이그레이션",
        tag: "아키텍처 · 성능",
        summary: "인증과 렌더링 책임을 재구성해 클라이언트 JS 번들 24.6%, 청크 수 55%, 배포 크기를 240MB에서 77MB로 줄였습니다.",
        details: [
          "중첩 Layout과 Route Group으로 일반 인증과 관리자 권한 검증을 두 레이아웃에 일원화했습니다.",
          "루트 레이아웃은 서버 컴포넌트로 유지하고 클라이언트 상태는 Providers로 격리했습니다.",
          "서버 컴포넌트 기반 데이터 패칭으로 초기 로딩 구조와 권한 누락 가능성을 함께 개선했습니다.",
        ],
      },
      {
        title: "TanStack Query v4 → v5 마이그레이션",
        tag: "대규모 마이그레이션 · 자동화",
        summary: "모노레포 6개 앱과 22개 공유 라이브러리의 963개 파일을 자동화와 공통 판단 기준으로 전환했습니다.",
        details: [
          "공식 codemod의 옵션 손실 문제를 발견해 기존 옵션을 보존하는 AST 스크립트 3종을 작성했습니다.",
          "단순 시그니처 536건은 자동화하고, isLoading 의미 변화는 출처별 검토 가이드로 수동 판단 영역을 분리했습니다.",
          "PR별 변환 규칙과 머지 조건을 공유해 기능 개발과 마이그레이션이 병렬로 진행되도록 지원했습니다.",
        ],
      },
      {
        title: "혜택 탭과 딥링크 전환 흐름 개선",
        tag: "그로스 · 랜딩 안정성",
        summary: "광고·제휴 수익화 지면을 구축하고 외부 유입 사용자의 팝업과 레이아웃 시프트 마찰을 줄였습니다.",
        details: [
          "쿠팡 Reco API, 카카오 애드핏, 에이드랍 SDK를 연동하고 fallback과 로딩 정책을 정리했습니다.",
          "포인트 지급 기반 리텐션 장치를 구현하고 A/B/C 테스트부터 실험 종료 반영까지 운영했습니다.",
          "딥링크 중간 경유 페이지의 오버레이 노출을 억제하고 저사양 기기의 첫 페인트 흔들림과 jank를 줄였습니다.",
        ],
      },
      {
        title: "디자인 시스템 문서와 SVG 가드레일",
        tag: "자발적 주도 · 개발 도구",
        summary: "47개 컴포넌트를 라이브 문서화하고 반복되는 SVG 오류를 IDE와 CI 단계의 자동 검출·교정 규칙으로 옮겼습니다.",
        details: [
          "Next.js 기반 디자인 문서 사이트를 별도 Vercel 프로젝트로 분리해 운영 서비스 배포 파이프라인의 영향을 없앴습니다.",
          "디자인 토큰과 컴포넌트 사양을 코드 밖에서도 확인하도록 만들어 직군 간 커뮤니케이션과 온보딩 비용을 줄였습니다.",
          "SVG id 충돌과 JSX 비호환 kebab-case 속성을 자동 검출·교정하는 커스텀 ESLint 룰을 작성했습니다.",
        ],
      },
    ],
  },
  {
    company: "위밋모빌리티",
    role: "Frontend Developer",
    period: "2024.12 ~ 2025.07",
    description: "루티프로 - 미들마일 중심의 운임 기반 화물 운송 최적화 솔루션",
    projects: [
      {
        title: "TanStack Table 기반 커스텀 테이블 시스템",
        tag: "기획 주도 · 팀 표준",
        summary: "편집 가능 테이블을 먼저 제안해 조회 → 편집 → 저장의 2단계 플로우를 토글 기반 인라인 편집으로 단축했습니다.",
        details: [
          "Text, Badge, Button, Checkbox, Toggle을 조합하는 공통 셀 컴포넌트와 컴파운드 패턴을 설계했습니다.",
          "입력 필드 단위 리렌더링으로 1,000행 이상 테이블에서도 60fps를 유지했습니다.",
          "편리성을 검증해 주문과 관리 페이지를 포함한 메인 서비스의 조회·편집 표준으로 확장했습니다.",
        ],
      },
      {
        title: "MQTT 기반 실시간 관제 시스템",
        tag: "실시간 시스템 · 성능",
        summary: "Deck.gl과 Google Maps 위에서 47대 이상 차량의 위치와 상태를 동시에 추적하면서 UI 버벅임 없이 동작하도록 개선했습니다.",
        details: [
          "MQTT 토픽 구독으로 차량 위치, 배송 상태, 진행률을 실시간 수신하는 구조를 구현했습니다.",
          "Map 자료구조의 O(1) 갱신과 Zustand 선택적 구독으로 데이터 변경 범위를 줄였습니다.",
          "자동 재연결과 keepalive 설정으로 장시간 운영 환경의 연결 안정성을 확보했습니다.",
        ],
      },
      {
        title: "오더 시스템과 데이터 일관성",
        tag: "도메인 핵심 · 신뢰성",
        summary: "주문 등록·수정·취소·상태 변경 전반을 개발하고 잘못된 입력과 저장되지 않은 변경의 유실을 차단했습니다.",
        details: [
          "화물 운송 정책에 맞춘 주소 유효성 검증과 누락 필드의 실시간 시각 피드백을 구현했습니다.",
          "단건·다건·전체 필터링과 일괄 상태 변경으로 다수 오더를 처리하는 운영 흐름을 지원했습니다.",
          "서버와 클라이언트 상태를 비교해 새로고침과 뒤로가기로 인한 데이터 손실을 방지했습니다.",
        ],
      },
      {
        title: "Excel 대량 업로드",
        tag: "SSE · 진행률 UX",
        summary: "수십 초 동안 피드백이 없던 대량 업로드를 실시간 진행률 UI로 바꿔 중복 업로드와 페이지 이탈을 줄였습니다.",
        details: [
          "단방향 스트리밍에 맞춰 WebSocket 대신 SSE를 선택해 가벼운 연결 구조를 구성했습니다.",
          "완료 시 자동 종료하고 오류 발생 시 즉시 실패 상태를 안내해 업로드 신뢰성을 높였습니다.",
        ],
      },
      {
        title: "SSR 기반 조회 화면과 공통 필터 시스템",
        tag: "성능 · 시스템화",
        summary: "빈 화면 뒤 데이터가 채워지던 운영 페이지를 서버 컴포넌트로 전환하고 필터·URL·페이지네이션 흐름을 표준화했습니다.",
        details: [
          "진입 시 데이터가 준비된 화면을 제공하고 인터랙션이 필요한 부분만 클라이언트로 격리했습니다.",
          "신규 페이지를 컴포넌트 조합만으로 구성하도록 필터 상태, URL 동기화, 페이지네이션 연동을 통합했습니다.",
          "테이블 시스템과 함께 루티프로의 데이터 조회·편집 표준으로 자리잡았습니다.",
        ],
      },
      {
        title: "루티V2 MVP와 디자인 시스템",
        tag: "대규모 협업 · 점진적 통합",
        summary: "3개 기능 팀의 병렬 개발 결과를 하나의 프로젝트로 점진 통합하고 2주 단위 스프린트와 CI/CD 기반으로 MVP를 출시했습니다.",
        details: [
          "Trunk Based Development 전략으로 통합 후에도 안정적이고 빠른 배포 흐름을 유지했습니다.",
          "공통 컴포넌트의 구조와 네이밍을 정리하고 누락된 ellipsis와 Portal Tooltip 규칙을 보완했습니다.",
          "텍스트 입력과 달력 선택을 함께 지원하는 DatePicker를 제안해 운영팀의 반복 클릭 단계를 줄였습니다.",
        ],
      },
    ],
  },
] satisfies Experience[];

export const PROJECTS = [
  {
    name: "오늘 헤어졌어요",
    period: "2026.07 ~ (개인 프로젝트)",
    role: "Product Owner · Frontend Developer",
    description: "이별 후의 감정을 안전하게 기록하고 나누는 익명 커뮤니티",
    image: null,
    link: "https://todaybreakup.com/",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Query", "Supabase", "Vercel"],
    features: [
      "카카오 OAuth와 Supabase 기반 인증·프로필·온보딩 흐름 설계",
      "익명 게시글, 댓글, 반응, 채팅, 감정 캘린더 기능 구현",
      "보호 경로와 세션 갱신 흐름을 정리해 페이지 이동 중 반복 로그아웃 문제 해결",
      "댓글 삭제 후 개수 동기화와 실시간 채팅 읽음 상태 등 서버·클라이언트 데이터 일관성 개선",
      "Google Analytics 이벤트, SEO 메타데이터, 커스텀 도메인과 Vercel 운영 배포 구성",
    ],
  },
  {
    name: "오오디",
    period: "2026.02 ~ 2026.04 (팀 프로젝트)",
    role: "Frontend Developer",
    description: "우리 위치의 중간 약속 장소 찾기 서비스",
    image: "/images/projects/oodi.png",
    link: "https://o-odi.com/",
    tech: ["Next.js", "TypeScript"],
    features: [
      "중간 지점 기반 약속 장소 추천",
      "위치 기반 장소 검색 및 공유",
    ]
  },
  {
    name: "3D Portfolio",
    period: "2026.01 (개인 프로젝트)",
    role: "Frontend Developer",
    description: "Three.js 기반 인터랙티브 3D 포트폴리오 사이트",
    image: "/images/projects/portfolio3d.png",
    link: "https://portfolio-jsh-xi.vercel.app/",
    tech: ["Next.js", "TypeScript", "Three.js", "React Three Fiber", "Zustand", "Tailwind CSS", "Supabase"],
    features: [
      "React Three Fiber를 활용한 3D 인터랙티브 씬 구현",
      "키보드/조이스틱 기반 아바타 이동 시스템",
      "포탈 기반 섹션 네비게이션",
      "낙하 시 카메라 플립 애니메이션 및 로켓 구출 시스템",
      "방명록 기능 (Supabase 연동, 관리자 답글)",
      "반응형 UI 및 모바일 지원",
    ]
  },
  {
    name: "Dream Card (드림카드)",
    period: "2024.10 ~ 2024.11 (5 weeks)",
    role: "Frontend Developer",
    description: "모바일 청첩장 커스텀 제작 서비스",
    image: "/images/projects/dreamCardMy.png",
    link: "https://www.dream-card.co.kr",
    tech: ["Next.js", "Zustand", "TypeScript", "TanStack Query", "React Hook Form", "Tailwind CSS", "Supabase"],
    features: [
      "청첩장 메인 제작 페이지 - 글꼴 편집, 미리보기 적용",
      "갤러리 편집, 대표사진 등록, 인사말 입력",
      "마이페이지 - 전체 레이아웃, 제작 진척률, 공유하기",
      "후기 조회 - 전체 레이아웃, 사진 모아보기, 무한 스크롤, 좋아요",
      "CPU 부하로 인한 프레임 드랍 개선 (Intersection Observer 도입)",
      "깊은 비교 및 정렬을 통한 제작 진척률 정확도 개선",
      "React Hook Form을 활용한 실시간 입력값 미리보기",
      "Quill editor를 사용한 텍스트 스타일링 지원",
      "Web Share API를 이용한 공유하기 개발",
      "Sharp와 WebP를 활용한 이미지 최적화",
      "TanStack Query의 낙관적 업데이트로 좋아요 버튼 반응 속도 개선",
      "Sentry를 활용한 실시간 에러 수집",
      "반응형 페이지 적용",
    ]
  },
  {
    name: "Poketify",
    period: "2024.10.10 ~ 2024.10.16 (1주)",
    role: "Frontend Developer",
    description: "플레이리스트를 한번에 청취, 추천, 소통이 가능한 음악 커뮤니티 사이트",
    image: "/images/projects/poketifyMainPage.png",
    link: "https://poketify.vercel.app",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "TanStack Query", "Supabase", "Spotify API"],
    features: [
      "음악 추천 페이지 - 추천 플레이리스트, 마이 플레이리스트 추가/삭제",
      "플레이리스트 재생 기능",
      "Spotify API 연동",
      "반응형 페이지 적용",
    ]
  },
  {
    name: "커튼콜",
    period: "2024.09.11 ~ 2024.09.23 (11일)",
    role: "Frontend Developer",
    description: "공연을 공유하고 검색할 수 있는 페이지",
    image: "/images/projects/curtainCallMainPage.png",
    link: "https://github.com/dev-rjw/outsourcing-project",
    tech: ["React", "Zustand", "TanStack Query", "Styled Components", "Kopis API", "Kakao Map"],
    features: [
      "공연 정보 상세 페이지 - Kakao API 공연 위치 정보 표시",
      "댓글 추가/삭제 기능",
      "Kopis API 상세 페이지 정보 표시",
      "debounce를 활용한 실시간 곡 검색 최적화",
      "카카오 지도 API를 사용한 공연 장소 지도 표시",
      "TanStack Query를 활용한 상세페이지 댓글 CRUD 구현",
    ]
  },
  {
    name: "Yummy Yummy!",
    period: "2024.08.28 ~ 2024.09.04 (1주)",
    role: "Frontend Developer",
    description: "유저들이 공유한 요리 레시피 기록을 한 눈에 볼 수 있는 뉴스피드 사이트",
    image: "/images/projects/yummyyummyMainPage.png",
    link: "https://yummy-yummy-pi.vercel.app",
    tech: ["React", "Styled Components", "React Router", "Supabase"],
    features: [
      "로그인, 회원가입 - 소셜 로그인, 이메일 회원가입/로그인",
      "전체 디자인 담당",
      "레시피 뉴스피드 구현",
    ]
  },
  {
    name: "WHOAMI",
    period: "2024.09.09 ~ 2024.09.11 (3일)",
    role: "개인 프로젝트",
    description: "MBTI 테스트로 나를 알아보고 타인과 공유하는 사이트",
    image: "/images/projects/WhoamITest.png",
    link: "https://whoami-mbtitest.vercel.app/",
    tech: ["React", "Styled Components", "React Router", "Supabase"],
    features: [
      "메인 페이지 - 페이지 소개",
      "로그인, 회원가입",
      "마이페이지",
      "테스트 페이지",
      "결과 조회 페이지",
    ]
  },
  {
    name: "Moview",
    period: "2024.08.28 ~ 2024.09.04 (1주)",
    role: "Frontend Developer",
    description: "영화 검색 사이트의 기본 기능을 담은 커뮤니티 기반 영화 정보 사이트",
    image: "/images/projects/MoviewMainPage.png",
    link: "https://moview-phi.vercel.app/index.html",
    tech: ["JavaScript", "HTML", "CSS", "TMDB API"],
    features: [
      "메인 홈 페이지",
      "전체 디자인 담당",
      "메뉴바 구현",
      "상세 페이지 - 댓글 추가/삭제",
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
