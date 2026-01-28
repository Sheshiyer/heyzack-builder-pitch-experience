
export type Language = 'en' | 'fr';

export interface Product {
  id: string;
  name: Record<Language, string>;
  category: string;
  sku: string;
  specs: string[];
  benefits: string[];
  imageUrl: string;
  description: Record<Language, string>;
  slug: string;
  automations?: string[];
  connectedScenes?: string[];
}

export interface Connection {
  partnerId: string;
  label: Record<Language, string>;
  description: Record<Language, string>;
  impactMetric: Record<Language, string>;
  scores?: {
    security: number; // 0-100
    savings: number;  // 0-100
    comfort: number;  // 0-100
  };
}

export interface Category {
  id: string;
  name: Record<Language, string>;
  productCount: number;
  heroProductId: string;
  showcaseProductIds: string[];
  description: Record<Language, string>;
  connections: Connection[]; // New: Links to other categories
}

export interface RecommendedProduct {
  sku: string;
  reason: string;
  savings: number;
  security: number;
  comfort: number;
}

export interface Pillar {
  id: string;
  icon: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  color: string;
}
