import { SiteConfig, ProjectOverview, PremiumFeature, UnitType, Post, ConsultationLead, ScheduleStep, SeoConfig } from '../types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  name: "숭의역 유림 노르웨이숲더스카이",
  subName: "YURIM NORWEGIAN FOREST THE SKY",
  tagline: "수인분당선 숭의역 초역세권 · 최고 40층 파노라마 오션뷰 랜드마크",
  heroSubtitle: "수인분당선 숭의역 도보 1분의 압도적 입지, 인천 앞바다와 도심을 한눈에 담는 40층 초고층 프리미엄 라이프를 만나보십시오.",
  phone: "1688-8768",
  siteAddress: "인천광역시 미추홀구 숭의동 360-1번지 일원",
  operatingHours: "매일 10:00 - 18:00 (연중무휴 상담 지원)",
  themeColor: "emerald",
  fontStyle: "modern",
  heroBadge: "선착순 로얄동·호수 지정 계약 진행 중",
  announcementTicker: "★ 숭의역 도보 1분 초역세권 · 계약금 500만원 정액제 · 중도금 무이자 혜택 · 무제한 전매 가능 · 대표상담 1688-8768 ★",
  images: {
    hero: "/assets/aistudio/image_a8832a9e.png",
    birdview: "/src/assets/images/complex_birdview_1793524593100.jpg",
    livingRoom: "/src/assets/images/interior_living_room_1793524594019.jpg",
    bedroom: "/src/assets/images/interior_bedroom_1793524594287.jpg",
    community: "/src/assets/images/community_lounge_1793524596684.jpg",
  },
  formspreeUrl: "https://formspree.io/f/mqppgapq",
};

export const DEFAULT_PROJECT_OVERVIEW: ProjectOverview = {
  title: "사업개요",
  description: "인천 미추홀의 새로운 스카이라인을 완성하는 40층 초고층 랜드마크 주거 복합타운",
  items: [
    { label: "사업명", value: "숭의역 노르웨이숲 더스카이 신축공사" },
    { label: "대지위치", value: "인천광역시 미추홀구 숭의동 360-1번지 일원" },
    { label: "지역/지구", value: "일반상업지역, 방화지구, 시가지경관지구" },
    { label: "건축규모", value: "지하 5층 ~ 지상 최고 40층 주상복합단지" },
    { label: "공급규모", value: "총 432세대 (공동주택 아파트 324세대 / 주거형 오피스텔 108실 및 근린생활시설)" },
    { label: "대지면적", value: "8,920.40㎡ (약 2,698평)" },
    { label: "연면적", value: "98,421.35㎡ (약 29,772평)" },
    { label: "건폐율 / 용적률", value: "68.85% / 899.72%" },
    { label: "주차대수", value: "총 580대 (자주식 주차 및 전기차 충전스테이션)" },
    { label: "시행 / 시공사", value: "코리아신탁(주) / 유림E&C (노르웨이숲)" },
    { label: "입주예정시기", value: "2030년 05월 예정" },
  ]
};

export const DEFAULT_PREMIUMS: PremiumFeature[] = [
  {
    id: "premium-1",
    number: "01",
    title: "숭의역 도보 1분 초역세권",
    subtitle: "TRAFFIC PREMIUM",
    description: "수인분당선 숭의역 바로 앞 초역세권 입지로 인천 및 서울 강남까지 막힘없이 연결되는 쾌속 교통망을 자랑합니다.",
    tag: "수인분당선 직결",
    iconName: "Train"
  },
  {
    id: "premium-2",
    number: "02",
    title: "최고 40층 파노라마 오션뷰",
    subtitle: "SKY VIEW PREMIUM",
    description: "인천항 앞바다의 아름다운 석양과 도심의 야경을 360도 파노라마 조망으로 누리는 40층 초고층 스카이라인.",
    tag: "초고층 오션뷰",
    iconName: "Sunrise"
  },
  {
    id: "premium-3",
    number: "03",
    title: "유림E&C 노르웨이숲 브랜드 파워",
    subtitle: "BRAND PREMIUM",
    description: "북유럽 자연 감성과 하이엔드 주거 기술력이 결합된 명품 주거 브랜드 유림 노르웨이숲의 혁신 평면 설계.",
    tag: "하이엔드 랜드마크",
    iconName: "Award"
  },
  {
    id: "premium-4",
    number: "04",
    title: "풍부한 생활 인프라 원스톱",
    subtitle: "INFRA PREMIUM",
    description: "홈플러스(숭의점), 인하대병원, 미추홀구청, 용현시장, 수봉공원 등 도보 및 반경 1km 이내 완성된 풍부한 인프라.",
    tag: "몰세권 & 병세권",
    iconName: "Building2"
  },
  {
    id: "premium-5",
    number: "05",
    title: "제물포 르네상스 & 골든하버 미래비전",
    subtitle: "FUTURE VISION",
    description: "인천내항 1·8부두 재개발, 골든하버 복합관광단지 조성, 인천발 KTX(예정) 등 눈부신 지역 개발 프리미엄 수혜.",
    tag: "미래가치 특급수혜",
    iconName: "TrendingUp"
  },
  {
    id: "premium-6",
    number: "06",
    title: "계약금 500만원 정액제 & 무이자",
    subtitle: "FINANCIAL BENEFIT",
    description: "초기 자금 부담을 덜어주는 계약금 정액제, 중도금 전액 무이자 혜택 제공 및 비규제지역 무제한 전매 가능.",
    tag: "금융혜택 특화",
    iconName: "ShieldCheck"
  }
];

export const DEFAULT_UNITS: UnitType[] = [
  {
    id: "unit-69",
    name: "69",
    category: "아파트",
    exclusiveArea: "69.7032㎡ (약 21.08평)",
    supplyArea: "100.3750㎡ (약 30.36평)",
    contractArea: "148.8357㎡ (약 45.02평)",
    unitsCount: 216,
    features: [
      "채광과 환기가 우수한 맞통풍 판상형 설계",
      "침실 3개, 욕실 2개, 안방 대형 드레스룸",
      "주방 다용도실 및 팬트리 수납공간 극대화",
      "발코니 확장형 설계로 체감 면적 대폭 확대"
    ],
    description: "실속과 채광을 극대화한 맞통풍 판상형 구조로 3~4인 가구에 최적화된 아파트 대표 주력 타입(총 216세대)입니다.",
    isPopular: true,
    planImage: "/src/assets/images/units/unit_69.jpg",
    isoImage: "/src/assets/images/units/unit_iso_69.png"
  },
  {
    id: "unit-84",
    name: "84",
    category: "아파트",
    exclusiveArea: "84.9818㎡ (약 25.70평)",
    supplyArea: "124.4806㎡ (약 37.65평)",
    contractArea: "184.2838㎡ (약 55.74평)",
    unitsCount: 108,
    features: [
      "광폭 거실 4.5m 설계 및 파노라마 조망권",
      "대형 워크인 드레스룸 & 파우더존 특화",
      "독립형 주방 & 다용도실 펜트리 수납",
      "호텔 스위트룸형 마스터존 프라이버시 설계"
    ],
    description: "탁월한 개방감과 럭셔리 마감재가 조화를 이루는 최고급 아파트 타입(총 108세대)으로 품격 높은 주거공간을 제공합니다.",
    isPopular: true,
    planImage: "/src/assets/images/units/unit_84.jpg",
    isoImage: "/src/assets/images/units/unit_iso_84.png"
  },
  {
    id: "unit-84oa",
    name: "84OA",
    category: "오피스텔",
    exclusiveArea: "84.6525㎡ (약 25.60평)",
    supplyArea: "125.7363㎡ (약 38.03평)",
    contractArea: "186.2050㎡ (약 56.32평)",
    unitsCount: 72,
    features: [
      "아파트 3룸을 대체하는 주거형 아파텔 구조",
      "거실과 주방이 시원하게 트인 LDK 혁신 설계",
      "부부전용 욕실 및 드레스룸 완비",
      "청약통장 무관 및 즉시 전매 가능"
    ],
    description: "아파트 84㎡와 동일한 평면 활용성을 선사하는 고품격 주거형 오피스텔 A타입(총 72실)입니다.",
    isPopular: true,
    planImage: "/src/assets/images/units/unit_84oa.jpg",
    isoImage: "/src/assets/images/units/unit_iso_84oa.png"
  },
  {
    id: "unit-84ob",
    name: "84OB",
    category: "오피스텔",
    exclusiveArea: "84.6644㎡ (약 25.61평)",
    supplyArea: "125.5920㎡ (약 37.99평)",
    contractArea: "186.0428㎡ (약 56.27평)",
    unitsCount: 36,
    features: [
      "개방형 파노라마 조망 특화 타워형 설계",
      "거실 2면 개방창으로 도심 야경 조망",
      "침실 3개, 욕실 2개의 실속 3룸 구조",
      "풀퍼니시드 가전 빌트인 무상 옵션 적용"
    ],
    description: "감각적인 공간 배치와 아름다운 스카이라인 조망을 선사하는 주거형 오피스텔 B타입(총 36실)입니다.",
    planImage: "/src/assets/images/units/unit_84ob.jpg",
    isoImage: "/src/assets/images/units/unit_iso_84ob.png"
  }
];

export const DEFAULT_POSTS: Post[] = [
  {
    id: "post-1",
    title: "[공지] 숭의역 유림 노르웨이숲더스카이 선착순 동·호수 지정 계약 안내",
    category: "공지사항",
    content: `숭의역 유림 노르웨이숲더스카이가 많은 고객님들의 뜨거운 성원에 힘입어 잔여세대에 대한 선착순 동·호수 지정 계약을 진행합니다.

■ 계약 혜택 안내
1. 계약금 500만원 정액제 (1차)
2. 중도금 전액 무이자 융자 지원
3. 발코니 확장 무상 시공 프로모션 적용
4. 즉시 전매 가능 (분양권 전매 제한 없음)

■ 분양 상담 안내
- 상담시간: 매일 10:00 ~ 18:00
- 대표문의: 1688-8768
- 사전 분양상담 예약 후 방문 시 특별 사은품을 증정합니다.

자세한 문의사항은 공식 분양상담센터(1688-8768)로 문의하여 주시기 바랍니다.`,
    author: "분양운영팀",
    createdAt: "2026-10-28",
    isPinned: true,
    views: 1842
  },
  {
    id: "post-2",
    title: "[보도자료] 수인분당선 초역세권 '숭의역 노르웨이숲 더스카이' 본격 분양 개시",
    category: "보도자료",
    content: `유림E&C가 인천 미추홀구 숭의동에 공급하는 초고층 랜드마크 '숭의역 유림 노르웨이숲더스카이'가 선착순 동호수 지정계약 일정에 돌입했다.

단지는 최고 40층 초고층으로 설계돼 인천 앞바다와 도심을 한눈에 조망할 수 있으며, 수인분당선 숭의역이 도보 1분 거리에 위치한 초역세권 입지를 자랑한다.

분양 관계자는 "숭의역 역세권 개발과 제물포 르네상스 프로젝트 등 굵직한 개발 호재가 겹치며 실수요자는 물론 투자자들의 관심이 집중되고 있다"며 "계약금 정액제와 중도금 무이자 혜택으로 자금 부담을 최소화했다"고 밝혔다. 문의: 1688-8768`,
    author: "홍보팀",
    createdAt: "2026-10-20",
    isPinned: true,
    views: 1250
  },
  {
    id: "post-3",
    title: "[이벤트] VIP 관심고객 등록 특별 감사 이벤트",
    category: "이벤트",
    content: `홈페이지를 통해 사전 상담신청 또는 관심고객 등록을 진행해 주신 고객님들을 대상으로 특별 감사 이벤트를 진행합니다.

[이벤트 혜택]
- 혜택 1: 전문 분양상담 시 스타벅스 기프트카드 및 고급 주방용품 세트 증정
- 혜택 2: 1:1 전문 분양상담사 배정 및 최선호 로얄층 우선 배정 상담
- 혜택 3: 계약 체결 시 고급 빌트인 가전 특별 패키지 무상 업그레이드 지원

문의: 대표상담센터 1688-8768`,
    author: "마케팅팀",
    createdAt: "2026-10-15",
    isPinned: false,
    views: 934
  },
  {
    id: "post-4",
    title: "[분양일정] 계약 서류 및 준비물 안내",
    category: "분양일정",
    content: `계약을 체결하시는 수분양자분들께서는 아래 필수 서류를 지참하시어 상담을 진행해주시기 바랍니다.

[본인 계약 시 구비서류]
1. 계약자 신분증(주민등록증 또는 운전면허증)
2. 인감도장 및 인감증명서(부동산매도용 아님) 1통
3. 주민등록등본 1통 (주민등록번호 뒷자리 포함 발급)
4. 계약금 무통장 입금증 (현장 현금 수납 불가)

문의: 1688-8768`,
    author: "분양운영팀",
    createdAt: "2026-10-10",
    isPinned: false,
    views: 712
  }
];

export const DEFAULT_LEADS: ConsultationLead[] = [
  {
    id: "lead-1",
    name: "김민준",
    phone: "010-3849-2910",
    preferredType: "84",
    visitDate: "2026-11-04",
    visitTime: "14:00",
    visitPurpose: "실거주",
    notes: "오션뷰가 잘 나오는 로얄층 상담 희망합니다.",
    status: "방문예약",
    createdAt: "2026-10-31 16:30",
    adminMemo: "11/04 오후 2시 예약 확정 문자 발송 완료. 30층 이상 호수 배정 안내 요망."
  },
  {
    id: "lead-2",
    name: "이지은",
    phone: "010-9821-4321",
    preferredType: "69",
    visitDate: "2026-11-05",
    visitTime: "11:00",
    visitPurpose: "투자",
    notes: "중도금 무이자 대출 조건 및 전매 가능 시기 문의",
    status: "상담대기",
    createdAt: "2026-10-31 18:45",
    adminMemo: "내일 오전 10시 유선 1차 해피콜 예정."
  },
  {
    id: "lead-3",
    name: "박성호",
    phone: "010-5542-8871",
    preferredType: "84OA",
    visitDate: "2026-11-03",
    visitTime: "15:30",
    visitPurpose: "실거주",
    notes: "오피스텔 세제 혜택 및 대출 한도 문의",
    status: "접수완료",
    createdAt: "2026-11-01 09:12",
  }
];

export const DEFAULT_SCHEDULE_STEPS: ScheduleStep[] = [
  {
    step: "01",
    date: "진행 완료",
    title: "입주자 모집공고",
    description: "공식 분양 승인 및 일간지 모집공고 게재 완료",
    status: "past"
  },
  {
    step: "02",
    date: "공개 완료",
    title: "사이버 견본주택 공개",
    description: "공식 홈페이지 내 E-모델하우스 및 세대 평면 공개",
    status: "past"
  },
  {
    step: "03",
    date: "현재 진행중",
    title: "선착순 동·호수 지정 계약",
    description: "청약통장 무관, 원하는 층·동 직접 선택 계약 (1688-8768)",
    status: "current"
  },
  {
    step: "04",
    date: "2030.05 (예정)",
    title: "단지 준공 및 입주",
    description: "사전 점검 행사 진행 및 본격 입주 개시",
    status: "upcoming"
  }
];

export const DEFAULT_SEO_CONFIG: SeoConfig = {
  metaTitle: "숭의역 유림 노르웨이숲더스카이 | 공식 분양홍보관 (1688-8768)",
  metaDescription: "수인분당선 숭의역 초역세권 40층 초고층 랜드마크! 숭의역 유림 노르웨이숲더스카이 아파트 & 오피스텔 선착순 동호수 지정계약, 분양가 및 상세 상담(1688-8768).",
  metaKeywords: "숭의역유림노르웨이숲, 숭의역유림노르웨이숲더스카이, 숭의역아파트, 미추홀구분양, 69타입, 84타입, 84OA, 84OB, 1688-8768",
  ogTitle: "숭의역 유림 노르웨이숲더스카이 공식 분양상담 (1688-8768)",
  ogDescription: "수인분당선 숭의역 초역세권, 최고 40층 파노라마 뷰! 계약금 정액제 & 중도금 무이자. 대표문의 1688-8768",
  ogImage: "/assets/aistudio/image_a8832a9e.png",
  canonicalUrl: "https://xn--o80b88an0jf4j1a99d07pp6by2aeid716s.com",
  naverVerification: "naver-site-verification-code-sungui",
  googleVerification: "google-site-verification-code-sungui"
};
