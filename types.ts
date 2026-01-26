
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
}

export interface Connection {
  partnerId: string;
  label: Record<Language, string>;
  description: Record<Language, string>;
  impactMetric: Record<Language, string>;
}

export interface Category {
  id: string;
  name: Record<Language, string>;
  productCount: number;
  heroProductId: string;
  description: Record<Language, string>;
  connections: Connection[]; // New: Links to other categories
}

export interface Pillar {
  id: string;
  icon: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  color: string;
}

export interface Scene {
  id: string;
  category: 'efficiency' | 'security' | 'maintenance';
  name: Record<Language, string>;
  description: Record<Language, string>;
  b2bMetric: Record<Language, string>;
  steps: {
    nodeType: 'trigger' | 'logic' | 'action';
    action: Record<Language, string>;
    category: string;
  }[];
}
