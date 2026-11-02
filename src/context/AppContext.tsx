import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteConfig,
  ProjectOverview,
  PremiumFeature,
  UnitType,
  Post,
  ConsultationLead,
  SeoConfig,
  ThemeColor,
  FontStyle,
} from '../types';
import {
  DEFAULT_SITE_CONFIG,
  DEFAULT_PROJECT_OVERVIEW,
  DEFAULT_PREMIUMS,
  DEFAULT_UNITS,
  DEFAULT_POSTS,
  DEFAULT_LEADS,
  DEFAULT_SEO_CONFIG,
} from '../data/defaultData';

interface ThemeTokens {
  accentBg: string;
  accentHoverBg: string;
  accentText: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  lightAccentBg: string;
  glowColor: string;
}

interface AppContextType {
  siteConfig: SiteConfig;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  updateSiteConfig: (updates: Partial<SiteConfig>) => void;
  
  projectOverview: ProjectOverview;
  updateProjectOverview: (updates: Partial<ProjectOverview>) => void;
  updateOverviewItem: (index: number, label: string, value: string) => void;
  
  premiums: PremiumFeature[];
  updatePremium: (id: string, updates: Partial<PremiumFeature>) => void;
  
  units: UnitType[];
  addUnit: (unit: Omit<UnitType, 'id'>) => void;
  updateUnit: (id: string, updates: Partial<UnitType>) => void;
  deleteUnit: (id: string) => void;
  
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'views'>) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  incrementPostView: (id: string) => void;
  
  leads: ConsultationLead[];
  addLead: (lead: Omit<ConsultationLead, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  updateLeadStatus: (id: string, status: ConsultationLead['status']) => void;
  updateLeadMemo: (id: string, adminMemo: string) => void;
  deleteLead: (id: string) => void;
  
  seoConfig: SeoConfig;
  updateSeoConfig: (updates: Partial<SeoConfig>) => void;
  
  // Theme & Styling
  themeTokens: ThemeTokens;
  changeTheme: (theme: ThemeColor) => void;
  changeFont: (font: FontStyle) => void;
  
  // Admin Auth
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  
  // Interactive Modals
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  selectedUnitForModal: UnitType | null;
  setSelectedUnitForModal: (unit: UnitType | null) => void;
  selectedPostForModal: Post | null;
  setSelectedPostForModal: (post: Post | null) => void;
  
  // Reset
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const THEME_MAP: Record<ThemeColor, ThemeTokens> = {
  emerald: {
    accentBg: 'bg-emerald-600',
    accentHoverBg: 'hover:bg-emerald-500',
    accentText: 'text-emerald-400',
    accentBorder: 'border-emerald-600/40',
    badgeBg: 'bg-emerald-950/70',
    badgeText: 'text-emerald-300',
    lightAccentBg: 'bg-emerald-500/10',
    glowColor: 'shadow-emerald-900/40',
  },
  navy: {
    accentBg: 'bg-sky-600',
    accentHoverBg: 'hover:bg-sky-500',
    accentText: 'text-sky-400',
    accentBorder: 'border-sky-600/40',
    badgeBg: 'bg-sky-950/70',
    badgeText: 'text-sky-300',
    lightAccentBg: 'bg-sky-500/10',
    glowColor: 'shadow-sky-900/40',
  },
  gold: {
    accentBg: 'bg-amber-600',
    accentHoverBg: 'hover:bg-amber-500',
    accentText: 'text-amber-400',
    accentBorder: 'border-amber-600/40',
    badgeBg: 'bg-amber-950/70',
    badgeText: 'text-amber-300',
    lightAccentBg: 'bg-amber-500/10',
    glowColor: 'shadow-amber-900/40',
  },
  charcoal: {
    accentBg: 'bg-stone-600',
    accentHoverBg: 'hover:bg-stone-500',
    accentText: 'text-stone-300',
    accentBorder: 'border-stone-500/40',
    badgeBg: 'bg-stone-900/90',
    badgeText: 'text-stone-300',
    lightAccentBg: 'bg-stone-500/10',
    glowColor: 'shadow-stone-900/40',
  },
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Site Config with hero image & phone & deposit updates
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('sungui_site_config_v4') || localStorage.getItem('sungui_site_config_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const ticker = (parsed.announcementTicker || DEFAULT_SITE_CONFIG.announcementTicker).replace(/1,?000만원/g, '500만원');
        return {
          ...DEFAULT_SITE_CONFIG,
          ...parsed,
          announcementTicker: ticker,
          formspreeUrl: parsed.formspreeUrl || DEFAULT_SITE_CONFIG.formspreeUrl || 'https://formspree.io/f/mqppgapq',
        };
      } catch (e) {
        return DEFAULT_SITE_CONFIG;
      }
    }
    return DEFAULT_SITE_CONFIG;
  });

  // 2. Project Overview with 2030년 05월 update
  const [projectOverview, setProjectOverview] = useState<ProjectOverview>(() => {
    const saved = localStorage.getItem('sungui_project_overview_v3');
    if (saved) return JSON.parse(saved);
    return DEFAULT_PROJECT_OVERVIEW;
  });

  // 3. Premiums with 500만원 계약금 update
  const [premiums, setPremiums] = useState<PremiumFeature[]>(() => {
    const saved = localStorage.getItem('sungui_premiums_v3') || localStorage.getItem('sungui_premiums_v2');
    if (saved) {
      try {
        const parsed: PremiumFeature[] = JSON.parse(saved);
        return parsed.map((item) => ({
          ...item,
          title: item.title.replace(/1,?000만원/g, '500만원'),
          description: item.description.replace(/1,?000만원/g, '500만원'),
        }));
      } catch (e) {
        return DEFAULT_PREMIUMS;
      }
    }
    return DEFAULT_PREMIUMS;
  });

  // 4. Units (Exact reference website types: 69, 84, 84OA, 84OB)
  const [units, setUnits] = useState<UnitType[]>(() => {
    const saved = localStorage.getItem('sungui_units_v2');
    if (saved) return JSON.parse(saved);
    return DEFAULT_UNITS;
  });

  // 5. Posts with 500만원 계약금 update
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('sungui_posts_v3') || localStorage.getItem('sungui_posts_v2');
    if (saved) {
      try {
        const parsed: Post[] = JSON.parse(saved);
        return parsed.map((post) => ({
          ...post,
          content: post.content.replace(/1,?000만원/g, '500만원'),
        }));
      } catch (e) {
        return DEFAULT_POSTS;
      }
    }
    return DEFAULT_POSTS;
  });

  // 6. Leads
  const [leads, setLeads] = useState<ConsultationLead[]>(() => {
    const saved = localStorage.getItem('sungui_leads');
    return saved ? JSON.parse(saved) : DEFAULT_LEADS;
  });

  // 7. SEO
  const [seoConfig, setSeoConfig] = useState<SeoConfig>(() => {
    const saved = localStorage.getItem('sungui_seo_config');
    return saved ? JSON.parse(saved) : DEFAULT_SEO_CONFIG;
  });

  // Admin Auth State
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('sungui_admin_auth') === 'true';
  });

  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedUnitForModal, setSelectedUnitForModal] = useState<UnitType | null>(null);
  const [selectedPostForModal, setSelectedPostForModal] = useState<Post | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('sungui_site_config_v4', JSON.stringify(siteConfig));
  }, [siteConfig]);

  useEffect(() => {
    localStorage.setItem('sungui_project_overview_v3', JSON.stringify(projectOverview));
  }, [projectOverview]);

  useEffect(() => {
    localStorage.setItem('sungui_premiums_v3', JSON.stringify(premiums));
  }, [premiums]);

  useEffect(() => {
    localStorage.setItem('sungui_units_v2', JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    localStorage.setItem('sungui_posts_v3', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('sungui_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('sungui_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('sungui_seo_config', JSON.stringify(seoConfig));
  }, [seoConfig]);

  // Update site title in browser tab dynamically
  useEffect(() => {
    if (siteConfig.name) {
      document.title = `${siteConfig.name} | 공식 분양홍보관`;
    }
  }, [siteConfig.name]);

  const updateSiteConfig = (updates: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...updates }));
  };

  const updateProjectOverview = (updates: Partial<ProjectOverview>) => {
    setProjectOverview((prev) => ({ ...prev, ...updates }));
  };

  const updateOverviewItem = (index: number, label: string, value: string) => {
    setProjectOverview((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { label, value };
      return { ...prev, items: newItems };
    });
  };

  const updatePremium = (id: string, updates: Partial<PremiumFeature>) => {
    setPremiums((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const addUnit = (unit: Omit<UnitType, 'id'>) => {
    const newUnit: UnitType = {
      ...unit,
      id: `unit-${Date.now()}`,
    };
    setUnits((prev) => [...prev, newUnit]);
  };

  const updateUnit = (id: string, updates: Partial<UnitType>) => {
    setUnits((prev) =>
      prev.map((unit) => (unit.id === id ? { ...unit, ...updates } : unit))
    );
  };

  const deleteUnit = (id: string) => {
    setUnits((prev) => prev.filter((unit) => unit.id !== id));
  };

  const addPost = (post: Omit<Post, 'id' | 'createdAt' | 'views'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newPost: Post = {
      ...post,
      id: `post-${Date.now()}`,
      createdAt: today,
      views: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, ...updates } : post))
    );
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const incrementPostView = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, views: post.views + 1 } : post
      )
    );
  };

  const addLead = async (lead: Omit<ConsultationLead, 'id' | 'createdAt' | 'status'>): Promise<boolean> => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newLead: ConsultationLead = {
      ...lead,
      id: `lead-${Date.now()}`,
      status: '접수완료',
      createdAt: formattedDate,
    };
    setLeads((prev) => [newLead, ...prev]);

    // Transmit to Formspree endpoint (https://formspree.io/f/mqppgapq)
    const formspreeEndpoint = siteConfig.formspreeUrl || 'https://formspree.io/f/mqppgapq';
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          성함: lead.name,
          연락처: lead.phone,
          추가문의사항: lead.notes || '없음',
          접수일시: formattedDate,
          사업지명: siteConfig.name,
          현장위치: siteConfig.siteAddress,
          // Formspree recognized attributes
          name: lead.name,
          phone: lead.phone,
          message: lead.notes || '없음',
          _subject: `[${siteConfig.name}] 신규 VIP 관심고객 상담신청: ${lead.name} (${lead.phone})`,
        }),
      });
      return response.ok;
    } catch (err) {
      console.warn('Formspree transmission warning (saved locally):', err);
      return false;
    }
  };

  const updateLeadStatus = (id: string, status: ConsultationLead['status']) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
  };

  const updateLeadMemo = (id: string, adminMemo: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, adminMemo } : lead))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const updateSeoConfig = (updates: Partial<SeoConfig>) => {
    setSeoConfig((prev) => ({ ...prev, ...updates }));
  };

  const changeTheme = (theme: ThemeColor) => {
    updateSiteConfig({ themeColor: theme });
  };

  const changeFont = (font: FontStyle) => {
    updateSiteConfig({ fontStyle: font });
  };

  // Admin login check for password "1440"
  const loginAdmin = (password: string): boolean => {
    if (password.trim() === '1440') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('sungui_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('sungui_admin_auth');
  };

  const resetToDefaults = () => {
    if (window.confirm('모든 데이터를 초기 기본값으로 복원하시겠습니까? (작성한 글 및 접수된 상담 내역이 초기화됩니다)')) {
      setSiteConfig(DEFAULT_SITE_CONFIG);
      setProjectOverview(DEFAULT_PROJECT_OVERVIEW);
      setPremiums(DEFAULT_PREMIUMS);
      setUnits(DEFAULT_UNITS);
      setPosts(DEFAULT_POSTS);
      setLeads(DEFAULT_LEADS);
      setSeoConfig(DEFAULT_SEO_CONFIG);
      localStorage.clear();
      sessionStorage.clear();
    }
  };

  const themeTokens = THEME_MAP[siteConfig.themeColor] || THEME_MAP.emerald;

  return (
    <AppContext.Provider
      value={{
        siteConfig,
        setSiteConfig,
        updateSiteConfig,
        projectOverview,
        updateProjectOverview,
        updateOverviewItem,
        premiums,
        updatePremium,
        units,
        addUnit,
        updateUnit,
        deleteUnit,
        posts,
        addPost,
        updatePost,
        deletePost,
        incrementPostView,
        leads,
        addLead,
        updateLeadStatus,
        updateLeadMemo,
        deleteLead,
        seoConfig,
        updateSeoConfig,
        themeTokens,
        changeTheme,
        changeFont,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        isBookingModalOpen,
        setIsBookingModalOpen,
        selectedUnitForModal,
        setSelectedUnitForModal,
        selectedPostForModal,
        setSelectedPostForModal,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
