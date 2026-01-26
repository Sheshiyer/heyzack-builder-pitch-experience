import { Pillar, Category, Product, Scene, Connection, Language } from './types';
import productCatalog from './data/product_catalog.json';

// Helper for bilingual support (duplicating English for now as requested)
const toBilingual = (en: string): Record<Language, string> => ({
  en: en.trim(),
  fr: en.trim() + " (FR)" // Visual indicator or just duplicate? User said "support biloginual". I'll just duplicate or basic prefix.
});

// Re-use existing image assets for now
const UNSPLASH_POOL = [
  'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop', 
  'https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'
];

const getImageForProduct = (sku: string) => {
  const index = sku.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % UNSPLASH_POOL.length;
  return UNSPLASH_POOL[index];
};

export const PILLARS: Pillar[] = [
  {
    id: 'savings',
    icon: 'TrendingDown',
    title: { en: 'Savings', fr: 'Économies' },
    description: { en: 'Systemic energy reduction and operational ROI.', fr: 'Réduction systémique de l\'énergie et ROI opérationnel.' },
    color: '#10B981'
  },
  {
    id: 'security',
    icon: 'ShieldCheck',
    title: { en: 'Security', fr: 'Sécurité' },
    description: { en: 'Portfolio-wide protection and access control.', fr: 'Protection à l\'échelle du portefeuille et contrôle d\'accès.' },
    color: '#243984'
  },
  {
    id: 'comfort',
    icon: 'Sparkles',
    title: { en: 'Comfort', fr: 'Confort' },
    description: { en: 'Automated living experiences for high tenant retention.', fr: 'Expériences de vie automatisées pour une forte fidélisation.' },
    color: '#E82F89'
  }
];

// Mapping raw JSON category names to existing IDs to preserve connections
const CAT_ID_MAP: Record<string, string> = {
  "Camera and Doorbell": "camera-doorbell",
  "Smart Sensors": "sensors",
  "Smart Climatisation": "climatisation",
  "Smart lighting System and Dimming Controller": "lighting",
  "Curtain, Shutter and Garage Door Controllers": "curtain-shutter",
  "Smart Circuit Breaker": "circuit-breaker",
  "Smart Door Lock": "door-lock",
  "Smart Door Lock Body": "door-lock-body",
  "Smart Control Panel": "control-panel",
  "Smart Gateway": "gateway",
  "Smart DIY Breaker": "diy-breaker",
  "Smart Music Control System": "music-control",
  "Smart Switch": "switch",
  "Smart Accessorries": "accessories", 
  "Pet Accesories": "pet-accessories"
};

const EXISTING_CONNECTIONS: Record<string, Connection[]> = {
  "camera-doorbell": [
      { partnerId: 'lighting', label: { en: 'Auto-Porch', fr: 'Porche-Auto' }, description: { en: 'PIR trigger lights up porch for arriving guests.', fr: 'Le capteur PIR éclaire le porche pour les invités.' }, impactMetric: { en: '90% Crime Deterrence', fr: '90% de Dissuasion' } },
      { partnerId: 'door-lock', label: { en: 'Face-Entry', fr: 'Entrée-Visage' }, description: { en: 'Verified recognition unlocks main lobby automatically.', fr: 'La reconnaissance vérifiée déverrouille le hall.' }, impactMetric: { en: 'Zero-Friction UX', fr: 'UX sans friction' } }
  ],
  "sensors": [
      { partnerId: 'climatisation', label: { en: 'Eco-Temp', fr: 'Temp-Éco' }, description: { en: 'Adjusts HVAC based on real-time room occupancy.', fr: 'Ajuste le CVC selon l\'occupation en temps réel.' }, impactMetric: { en: '30% Energy Savings', fr: '30% d\'Économies' } },
      { partnerId: 'diy-breaker', label: { en: 'Leak-Block', fr: 'Bloque-Fuite' }, description: { en: 'Shuts main water valve instantly on moisture detection.', fr: 'Ferme la vanne d\'eau en cas d\'humidité.' }, impactMetric: { en: '-100% Flood Risk', fr: '-100% Risque Inond.' } }
  ],
  "climatisation": [
      { partnerId: 'curtain-shutter', label: { en: 'Sun-Shield', fr: 'Pare-Soleil' }, description: { en: 'Closes shutters to mitigate solar heat gain during peaks.', fr: 'Ferme les volets pour réduire la chaleur solaire.' }, impactMetric: { en: 'OpEx Mitigation', fr: 'Baisse OpEx' } },
      { partnerId: 'circuit-breaker', label: { en: 'Grid-Sync', fr: 'Sync-Réseau' }, description: { en: 'Load-sheds during high demand periods.', fr: 'Délestage lors des pics de demande.' }, impactMetric: { en: 'Grid Compliance', fr: 'Conformité Réseau' } }
  ],
  "lighting": [
      { partnerId: 'sensors', label: { en: 'Follow-Me', fr: 'Suis-Moi' }, description: { en: 'Lights follow residents through corridors for safety.', fr: 'La lumière suit les résidents dans les couloirs.' }, impactMetric: { en: 'Reduced Liability', fr: 'Responsabilité réduite' } },
      { partnerId: 'control-panel', label: { en: 'Scene-Link', fr: 'Lien-Scène' }, description: { en: 'Visual feedback for arming security systems.', fr: 'Retour visuel pour l\'armement de la sécurité.' }, impactMetric: { en: 'Enhanced UX', fr: 'UX Améliorée' } }
  ],
  "curtain-shutter": [
      { partnerId: 'climatisation', label: { en: 'Thermal-Lock', fr: 'Verrou-Thermique' }, description: { en: 'Auto-closes to trap heat in winter nights.', fr: 'Fermeture auto pour garder la chaleur l\'hiver.' }, impactMetric: { en: 'Heat Retention', fr: 'Rétention Chaleur' } }
  ],
  "circuit-breaker": [
      { partnerId: 'gateway', label: { en: 'Energy-Pulse', fr: 'Pouls-Énergie' }, description: { en: 'Dashboard aggregates all building energy consumption for instant insights.', fr: 'Tableau de bord agrège toute la consommation pour des insights instantanés.' }, impactMetric: { en: 'ROI Visibility', fr: 'Visibilité ROI' } },
      { partnerId: 'climatisation', label: { en: 'Load-Shed', fr: 'Délestage' }, description: { en: 'Auto-throttles HVAC during peak pricing to avoid demand charges.', fr: 'Réduit automatiquement le CVC pendant les pics tarifaires.' }, impactMetric: { en: '22% Utility Savings', fr: '22% Économies' } }
  ],
  "door-lock": [
      { partnerId: 'gateway', label: { en: 'Remote-Access', fr: 'Accès-Distant' }, description: { en: 'Property manager grants temporary codes from anywhere, no physical keys.', fr: 'Le gestionnaire accorde des codes temporaires de n\'importe où, sans clés physiques.' }, impactMetric: { en: '$850/Turnover Saved', fr: '850$/Rotation Économisé' } },
      { partnerId: 'camera-doorbell', label: { en: 'Verified-Entry', fr: 'Entrée-Vérifiée' }, description: { en: 'Video verification ensures only authorized access, reduces tenant disputes.', fr: 'Vérification vidéo garantit l\'accès autorisé uniquement, réduit les litiges.' }, impactMetric: { en: '95% Security', fr: '95% Sécurité' } }
  ],
  "control-panel": [
      { partnerId: 'lighting', label: { en: 'Touch-Ambiance', fr: 'Ambiance-Tactile' }, description: { en: 'Visual scene builder lets tenants customize lighting moods effortlessly.', fr: 'Constructeur de scènes visuel permet de personnaliser l\'éclairage facilement.' }, impactMetric: { en: 'Premium Perception', fr: 'Perception Premium' } },
      { partnerId: 'climatisation', label: { en: 'Comfort-Dial', fr: 'Cadran-Confort' }, description: { en: 'Intuitive temperature control reduces support calls by 60%.', fr: 'Contrôle de température intuitif réduit les appels de 60%.' }, impactMetric: { en: 'Support Reduction', fr: 'Réduction Support' } }
  ],
  "gateway": [
      { partnerId: 'door-lock', label: { en: 'Virtual-Keys', fr: 'Clés-Virtuelles' }, description: { en: 'Centralized access control across all units eliminates physical key logistics.', fr: 'Contrôle d\'accès centralisé élimine la logistique des clés physiques.' }, impactMetric: { en: 'Zero Lockouts', fr: 'Zéro Verrouillage' } },
      { partnerId: 'circuit-breaker', label: { en: 'Energy-Dashboard', fr: 'Tableau-Énergie' }, description: { en: 'Real-time portfolio-wide energy visibility identifies cost savings opportunities.', fr: 'Visibilité énergétique en temps réel identifie les opportunités d\'économies.' }, impactMetric: { en: '12K$/Bâtiment/An', fr: '12K$/Bâtiment/An' } }
  ],
  "diy-breaker": [
      { partnerId: 'sensors', label: { en: 'Leak-Shutoff', fr: 'Arrêt-Fuite' }, description: { en: 'Water sensor triggers instant valve closure preventing $50K+ flood damage.', fr: 'Capteur d\'eau déclenche la fermeture instantanée pour éviter 50K$+ de dégâts.' }, impactMetric: { en: 'Insurance Premium Cut', fr: 'Réduction Prime Assurance' } },
      { partnerId: 'climatisation', label: { en: 'HVAC-Upgrade', fr: 'Mise-à-Niveau-CVC' }, description: { en: 'Adds smart control to legacy HVAC without replacing units.', fr: 'Ajoute contrôle intelligent au CVC existant sans remplacement.' }, impactMetric: { en: '18% Energy Savings', fr: '18% Économies' } }
  ],
  "music-control": [
      { partnerId: 'control-panel', label: { en: 'Amenity-Scheduler', fr: 'Planificateur-Agrément' }, description: { en: 'Automated gym and lounge audio creates premium tenant experience.', fr: 'Audio automatisé pour gym et salon crée une expérience premium.' }, impactMetric: { en: '12% Rent Premium', fr: '12% Prime Location' } },
      { partnerId: 'sensors', label: { en: 'Presence-Audio', fr: 'Audio-Présence' }, description: { en: 'Music activates when tenants enter amenity spaces, pauses when empty.', fr: 'La musique s\'active quand les locataires entrent, se met en pause si vide.' }, impactMetric: { en: 'Luxury Feel', fr: 'Sensation Luxe' } }
  ],
  "switch": [
    { partnerId: 'lighting', label: { en: 'Scene-Master', fr: 'Maître-Scène' }, description: { en: 'Single button activates multi-room lighting scenes instantly.', fr: 'Un bouton active instantanément les scènes d\'éclairage multi-pièces.' }, impactMetric: { en: 'Tenant Delight', fr: 'Satisfaction Locataire' } },
    { partnerId: 'climatisation', label: { en: 'Quick-Comfort', fr: 'Confort-Rapide' }, description: { en: 'Away mode adjusts all HVAC zones with one touch.', fr: 'Le mode absent ajuste toutes les zones CVC en un seul toucher.' }, impactMetric: { en: '15% Energy Cut', fr: '15% Économie' } }
  ],
  "accessories": [
    { partnerId: 'gateway', label: { en: 'Power-Hub', fr: 'Hub-Énergie' }, description: { en: 'Centralized control of all unit outlets for maintenance shutoffs.', fr: 'Contrôle centralisé de toutes les prises pour arrêts de maintenance.' }, impactMetric: { en: 'Zero Site Visits', fr: 'Zéro Visite' } }
  ],
  "pet-accessories": [
    { partnerId: 'sensors', label: { en: 'Auto-Feed', fr: 'Alimentation-Auto' }, description: { en: 'Presence-based feeding ensures pets are cared for even when tenants travel.', fr: 'Alimentation basée sur la présence garantit les soins même en voyage.' }, impactMetric: { en: '40% Higher Demand', fr: '40% Demande Plus' } },
    { partnerId: 'camera-doorbell', label: { en: 'Pet-Cam', fr: 'Caméra-Animal' }, description: { en: 'Remote pet monitoring reduces anxiety and tenant turnover.', fr: 'Surveillance à distance réduit l\'anxiété et le roulement des locataires.' }, impactMetric: { en: 'Retention Boost', fr: 'Boost Rétention' } }
  ]
};

// Keyword mapping for auto-categorization of connection strings
const KEYWORD_TO_CATEGORY: Record<string, string> = {
  'light': 'lighting', 'bulb': 'lighting', 'dim': 'lighting', 'led': 'lighting',
  'lock': 'door-lock', 'door': 'door-lock', 'entry': 'door-lock', 'access': 'door-lock',
  'heat': 'climatisation', 'cool': 'climatisation', 'temp': 'climatisation', 'hvac': 'climatisation', 'climate': 'climatisation',
  'camera': 'camera-doorbell', 'record': 'camera-doorbell', 'video': 'camera-doorbell', 'watch': 'camera-doorbell',
  'sensor': 'sensors', 'motion': 'sensors', 'leak': 'sensors', 'flood': 'sensors', 'detect': 'sensors',
  'music': 'music-control', 'audio': 'music-control', 'sound': 'music-control', 'speaker': 'music-control',
  'blind': 'curtain-shutter', 'curtain': 'curtain-shutter', 'shutter': 'curtain-shutter', 'shade': 'curtain-shutter',
  'gateway': 'gateway', 'hub': 'gateway', 'bridge': 'gateway',
  'switch': 'switch', 'button': 'switch',
  'energy': 'circuit-breaker', 'power': 'circuit-breaker', 'consumption': 'circuit-breaker',
  'panel': 'control-panel', 'display': 'control-panel', 'screen': 'control-panel'
};

// Helper to determine pillar scores based on text context
const getPillarScores = (text: string, categoryId: string, partnerId: string) => {
  const t = text.toLowerCase();
  const c = categoryId || '';
  const p = partnerId || '';
  
  let security = 10;
  let savings = 10;
  let comfort = 10;

  // Security Boosters
  if (/camera|lock|door|motion|detect|alert|siren|monitor|safe|secur/i.test(t + c + p)) security += 60;
  if (/entry|access|verify|protect/i.test(t)) security += 20;

  // Savings Boosters
  if (/energy|consum|power|bill|save|efficien|off|cut|leak|flood/i.test(t + c + p)) savings += 60;
  if (/schedul|auto|smart/i.test(t)) savings += 20;

  // Comfort Boosters
  if (/light|music|audio|temp|cool|heat|warm|scene|mood|voice|remote|easy/i.test(t + c + p)) comfort += 60;
  if (/auto|follow|convenien/i.test(t)) comfort += 20;

  // Normalization to 100 max
  return {
    security: Math.min(100, security),
    savings: Math.min(100, savings),
    comfort: Math.min(100, comfort)
  };
};

// Process Data
const processedCategories: Category[] = [];
const processedProducts: Product[] = [];
const heroProductsMap: Record<string, Product> = {};

productCatalog.categories.forEach((catInfo: any) => {
  const catId = CAT_ID_MAP[catInfo.name] || catInfo.name.toLowerCase().replace(/\s+/g, '-');
  
  // Start with existing hardcoded connections
  const combinedConnections: Connection[] = (EXISTING_CONNECTIONS[catId] || []).map(c => ({
    ...c,
    scores: getPillarScores(c.description.en, catId, c.partnerId)
  }));
  
  // Extract dynamic connections from products
  if (catInfo.products && Array.isArray(catInfo.products)) {
    catInfo.products.forEach((p: any) => {
      if (p.connected_scenes && Array.isArray(p.connected_scenes)) {
        p.connected_scenes.forEach((sceneText: string) => {
          // Normalize text
          const lowerText = sceneText.toLowerCase();
          
          // 1. Identify Partner
          let partnerId = 'gateway'; // Default fallback
          for (const [key, id] of Object.entries(KEYWORD_TO_CATEGORY)) {
            if (lowerText.includes(key) && id !== catId) {
              partnerId = id;
              break;
            }
          }

          // 2. Generate Smart Label
          // Extract first two meaningful words relative to the partner? Or just first 2 words of sentence.
          // Let's try to make it look like "Action-Object"
          const words = sceneText.split(' ').map(w => w.replace(/[^a-zA-Z]/g, ''));
          const labelCandidate = words.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-');

          // 3. Generate Impact Metric
          const metrics = [
            'Enhanced Efficiency', 'Improved Safety', 'Better Comfort', 
            'Automated Control', 'Instant Response', 'Seamless Sync',
            'Energy Optimized', 'User Verified'
          ];
          // Use a simple hash of the string to pick a consistent metric for the same string
          const hash = sceneText.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const metricEn = metrics[hash % metrics.length];

          // 4. Add if unique and under limit
          // We limit strictly to 4 total connections per category
          const isDuplicate = combinedConnections.some(c => 
            c.description.en === sceneText || 
            (c.partnerId === partnerId && c.label.en === labelCandidate)
          );

          if (!isDuplicate && combinedConnections.length < 4) {
             const scores = getPillarScores(sceneText, catId, partnerId);
             
             combinedConnections.push({
              partnerId,
              label: { en: labelCandidate, fr: labelCandidate },
              description: toBilingual(sceneText),
              impactMetric: { en: metricEn, fr: metricEn },
              scores
            });
          }
        });
      }
    });
  }

  // Create Category
  const category: Category = {
    id: catId,
    name: toBilingual(catInfo.name),
    productCount: catInfo.product_count,
    heroProductId: '', // will set below
    showcaseProductIds: [], // will set below
    description: toBilingual('Smart automation solutions for ' + catInfo.name), // generic description if missing
    connections: combinedConnections
  };

  // Process Products in this Category
  const catProducts: Product[] = ((catInfo.products || []) as any[]).map(p => {
    const product: Product = {
      id: p.sku,
      category: catId,
      sku: p.sku,
      name: toBilingual(p.name),
      specs: p.specs ? p.specs.split('|').map((s: string) => s.trim()) : [],
      benefits: [], // Extract from description? Or leave empty for now
      imageUrl: getImageForProduct(p.sku),
      description: toBilingual(p.description || ''),
      slug: p.slug,
      automations: p.automations || [],
      connectedScenes: p.connected_scenes || []
    };
    return product;
  });

  // Assign Hero Product (First one in list)
  if (catProducts.length > 0) {
    const hero = catProducts[0];
    category.heroProductId = hero.id;
    heroProductsMap[hero.id] = hero;

    // Assign Showcase Products (up to 3)
    category.showcaseProductIds = catProducts.slice(0, 3).map(p => p.id);
  }
  
  processedProducts.push(...catProducts);
  processedCategories.push(category);
});

export const CATEGORIES = processedCategories;
export const HERO_PRODUCTS = heroProductsMap;
export const ALL_PRODUCTS = processedProducts; 

export const SCENES: Scene[] = [
  {
    id: 'peak-demand',
    category: 'efficiency',
    name: { en: 'Peak Demand Response', fr: 'Réponse en Pic de Conso' },
    description: { en: 'Whole-building energy mitigation based on utility signals.', fr: 'Réduction énergétique du bâtiment selon les signaux réseau.' },
    b2bMetric: { en: '-28% Operating Costs', fr: '-28% de Frais d\'Exploitation' },
    steps: [
      { nodeType: 'trigger', action: { en: 'Utility Signal Received', fr: 'Signal Réseau Reçu' }, category: 'Gateway' },
      { nodeType: 'logic', action: { en: 'Auto-dim Common Areas', fr: 'Gradation Zones Communes' }, category: 'Lighting' },
      { nodeType: 'action', action: { en: 'HVAC Setpoint +2°C', fr: 'Point CVC +2°C' }, category: 'Climatisation' }
    ]
  },
  {
    id: 'leak-mitigation',
    category: 'maintenance',
    name: { en: 'Risk Mitigation', fr: 'Atténuation des Risques' },
    description: { en: 'Preventative damage control for high-density assets.', fr: 'Contrôle préventif des dommages pour les actifs multi-résidentiels.' },
    b2bMetric: { en: '-90% Water Damage Claims', fr: '-90% de Sinistres Dégâts des Eaux' },
    steps: [
      { nodeType: 'trigger', action: { en: 'Moisture Detected', fr: 'Humidité Détectée' }, category: 'Smart Sensors' },
      { nodeType: 'logic', action: { en: 'Auto-Shutoff Main Valve', fr: 'Arrêt Vanne Principale' }, category: 'DIY Breaker' },
      { nodeType: 'action', action: { en: 'Maintenance Alert Sent', fr: 'Alerte Maintenance Envoyée' }, category: 'Gateway' }
    ]
  }
];
