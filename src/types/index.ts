export type ThemeColor = 'emerald' | 'navy' | 'gold' | 'charcoal';
export type FontStyle = 'modern' | 'serif' | 'default';

export interface SiteImages {
  hero: string;
  birdview: string;
  livingRoom: string;
  bedroom: string;
  community: string;
}

export interface SiteConfig {
  name: string;
  subName: string;
  tagline: string;
  heroSubtitle: string;
  phone: string;
  siteAddress: string;
  operatingHours: string;
  themeColor: ThemeColor;
  fontStyle: FontStyle;
  heroBadge: string;
  announcementTicker: string;
  images: SiteImages;
  formspreeUrl?: string;
}

export interface ProjectOverviewItem {
  label: string;
  value: string;
}

export interface ProjectOverview {
  title: string;
  description: string;
  items: ProjectOverviewItem[];
}

export interface PremiumFeature {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  iconName: string;
}

export interface UnitType {
  id: string;
  name: string;
  category: '아파트' | '오피스텔';
  exclusiveArea: string; // 전용면적
  supplyArea: string;    // 공급면적
  contractArea: string;  // 계약면적
  unitsCount: number;    // 세대수
  features: string[];
  description: string;
  isPopular?: boolean;
  planImage?: string;
  isoImage?: string;
}

export interface Post {
  id: string;
  title: string;
  category: '공지사항' | '분양일정' | '보도자료' | '이벤트';
  content: string;
  author: string;
  createdAt: string;
  isPinned?: boolean;
  views: number;
}

export interface ConsultationLead {
  id: string;
  name: string;
  phone: string;
  preferredType?: string;
  visitDate?: string;
  visitTime?: string;
  visitPurpose?: string;
  notes?: string;
  status: '접수완료' | '상담대기' | '방문예약' | '상담완료';
  createdAt: string;
  adminMemo?: string;
}

export interface ScheduleStep {
  step: string;
  date: string;
  title: string;
  description: string;
  status: 'past' | 'current' | 'upcoming';
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  naverVerification: string;
  googleVerification: string;
}
