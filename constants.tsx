import { Pillar, Category, Product, Connection, Language } from './types';
import productCatalog from './data/product_catalog.json';

// Helper for bilingual support (duplicating English for now as requested)
const toBilingual = (en: string): Record<Language, string> => ({
  en: en.trim(),
  fr: en.trim() + " (FR)" // Visual indicator or just duplicate? User said "support biloginual". I'll just duplicate or basic prefix.
});

// Get image for product from migrated images in product_catalog.json
const getImageForProduct = (sku: string, productData?: any) => {
  // First check if product data has images from migration
  if (productData && productData.images) {
    // Return main image if available
    if (productData.images.main) {
      return productData.images.main;
    }
    // Fallback to first gallery image
    if (productData.images.gallery && productData.images.gallery.length > 0) {
      return productData.images.gallery[0];
    }
  }
  
  // Fallback to placeholder for products without images
  return `/images/placeholder-product.svg`;
};

export const PILLARS: Pillar[] = [
  {
    id: 'savings',
    icon: 'TrendingUp',
    title: { en: 'Savings', fr: 'Économies' },
    description: { en: 'Drive asset value through predictive energy optimization and significant reduction in building operational costs.', fr: 'Valorisez vos actifs grâce à l\'optimisation énergétique prédictive et une réduction des coûts.' },
    color: '#10B981'
  },
  {
    id: 'security',
    icon: 'Shield',
    title: { en: 'Security', fr: 'Sécurité' },
    description: { en: 'Provide peace of mind with encrypted access control and proactive monitoring that safeguards every resident and square foot.', fr: 'Garantissez la tranquillité d\'esprit avec un contrôle d\'accès crypté et une surveillance proactive.' },
    color: '#243984'
  },
  {
    id: 'comfort',
    icon: 'Sparkles',
    title: { en: 'Comfort', fr: 'Confort' },
    description: { en: 'Differentiate your property with intuitive, invisible technology that creates a premium living experience and maximizes tenant retention.', fr: 'Démarquez votre propriété avec une technologie invisible et intuitive qui crée une expérience de vie premium.' },
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
      { partnerId: 'lighting', label: { en: 'Welcome Lighting', fr: 'Éclairage Accueil' }, description: { en: 'Motion at your door instantly brightens the entrance, greeting visitors and deterring intruders.', fr: 'Le mouvement à votre porte illumine instantanément l\'entrée, accueillant les visiteurs et dissuadant les intrus.' }, impactMetric: { en: '90% Crime Deterrence', fr: '90% Dissuasion Crime' } },
      { partnerId: 'door-lock', label: { en: 'Keyless Entry', fr: 'Entrée Sans Clé' }, description: { en: 'See who\'s there and unlock remotely—never search for keys again.', fr: 'Voyez qui est là et déverrouillez à distance—plus jamais chercher vos clés.' }, impactMetric: { en: 'Seamless Access', fr: 'Accès Fluide' } }
  ],
  "sensors": [
      { partnerId: 'climatisation', label: { en: 'Smart Climate', fr: 'Climat Intelligent' }, description: { en: 'Heating adjusts room-by-room based on actual occupancy, cutting energy waste.', fr: 'Le chauffage s\'ajuste pièce par pièce selon l\'occupation réelle, réduisant le gaspillage.' }, impactMetric: { en: '30% Energy Savings', fr: '30% Économie Énergie' } },
      { partnerId: 'diy-breaker', label: { en: 'Flood Protection', fr: 'Protection Inondation' }, description: { en: 'Water detected? Valve shuts instantly—protecting your home from costly damage.', fr: 'Eau détectée? La vanne se ferme instantanément—protégeant votre maison de dégâts coûteux.' }, impactMetric: { en: 'Prevents $50K+ Damage', fr: 'Évite 50K$+ Dégâts' } }
  ],
  "climatisation": [
      { partnerId: 'curtain-shutter', label: { en: 'Natural Cooling', fr: 'Refroidissement Naturel' }, description: { en: 'Shades close automatically when sun peaks, keeping rooms cool without running AC.', fr: 'Les stores se ferment automatiquement au soleil intense, gardant les pièces fraîches sans climatisation.' }, impactMetric: { en: 'Lower Energy Bills', fr: 'Factures Réduites' } },
      { partnerId: 'circuit-breaker', label: { en: 'Peak Savings', fr: 'Économie Pointe' }, description: { en: 'System reduces power during peak hours automatically, slashing demand charges.', fr: 'Le système réduit la consommation aux heures de pointe automatiquement, diminuant les frais.' }, impactMetric: { en: '22% Utility Savings', fr: '22% Économie Services' } }
  ],
  "lighting": [
      { partnerId: 'sensors', label: { en: 'Safe Pathways', fr: 'Chemins Sécurisés' }, description: { en: 'Never walk through darkness—lights guide you automatically through every hallway.', fr: 'Ne marchez jamais dans le noir—les lumières vous guident automatiquement dans chaque couloir.' }, impactMetric: { en: 'Zero Dark Corners', fr: 'Zéro Coin Sombre' } },
      { partnerId: 'control-panel', label: { en: 'One-Touch Scenes', fr: 'Scènes Tactiles' }, description: { en: 'Create perfect lighting moods with a single tap—movie night, dinner, or bedtime.', fr: 'Créez l\'ambiance lumineuse parfaite d\'un seul toucher—soirée film, dîner ou coucher.' }, impactMetric: { en: 'Instant Ambiance', fr: 'Ambiance Instantanée' } }
  ],
  "curtain-shutter": [
      { partnerId: 'climatisation', label: { en: 'Heat Retention', fr: 'Conservation Chaleur' }, description: { en: 'Closes automatically at night to trap warmth, keeping your home cozy and energy bills low.', fr: 'Ferme automatiquement la nuit pour conserver la chaleur, gardant votre maison confortable et les factures basses.' }, impactMetric: { en: 'All-Night Comfort', fr: 'Confort Nocturne' } }
  ],
  "circuit-breaker": [
      { partnerId: 'gateway', label: { en: 'Energy Insights', fr: 'Aperçu Énergie' }, description: { en: 'See exactly where every watt goes—identify energy hogs and optimize consumption.', fr: 'Voyez exactement où va chaque watt—identifiez les gouffres énergétiques et optimisez la consommation.' }, impactMetric: { en: 'Real-Time Tracking', fr: 'Suivi Temps Réel' } },
      { partnerId: 'climatisation', label: { en: 'Smart Load Control', fr: 'Gestion Charge' }, description: { en: 'Automatically reduces HVAC during expensive peak hours without sacrificing comfort.', fr: 'Réduit automatiquement le CVC pendant les heures coûteuses sans sacrifier le confort.' }, impactMetric: { en: '22% Lower Bills', fr: '22% Factures Moins' } }
  ],
  "door-lock": [
      { partnerId: 'gateway', label: { en: 'Remote Access', fr: 'Accès À Distance' }, description: { en: 'Grant entry to guests from anywhere—no keys to copy, lose, or change locks for.', fr: 'Donnez l\'accès aux invités de n\'importe où—pas de clés à copier, perdre ou changer.' }, impactMetric: { en: 'Zero Key Hassles', fr: 'Zéro Tracas Clés' } },
      { partnerId: 'camera-doorbell', label: { en: 'Verified Entry', fr: 'Entrée Vérifiée' }, description: { en: 'See and approve visitors before unlocking—only authorized people enter your home.', fr: 'Voyez et approuvez les visiteurs avant de déverrouiller—seules les personnes autorisées entrent.' }, impactMetric: { en: '95% Security Level', fr: '95% Niveau Sécurité' } }
  ],
  "control-panel": [
      { partnerId: 'lighting', label: { en: 'Mood Control', fr: 'Contrôle Ambiance' }, description: { en: 'Customize every room\'s lighting from one beautiful touchscreen—no app needed.', fr: 'Personnalisez l\'éclairage de chaque pièce depuis un bel écran tactile—sans application.' }, impactMetric: { en: 'Effortless Control', fr: 'Contrôle Sans Effort' } },
      { partnerId: 'climatisation', label: { en: 'Comfort at a Touch', fr: 'Confort Tactile' }, description: { en: 'Adjust temperature intuitively—simple controls mean fewer support calls.', fr: 'Ajustez la température intuitivement—des contrôles simples signifient moins d\'appels d\'aide.' }, impactMetric: { en: '60% Fewer Calls', fr: '60% Moins Appels' } }
  ],
  "gateway": [
      { partnerId: 'door-lock', label: { en: 'Digital Keys', fr: 'Clés Numériques' }, description: { en: 'Manage all locks from one place—create temporary codes for guests instantly.', fr: 'Gérez toutes les serrures depuis un endroit—créez des codes temporaires pour les invités instantanément.' }, impactMetric: { en: 'No Lost Keys Ever', fr: 'Jamais Clés Perdues' } },
      { partnerId: 'circuit-breaker', label: { en: 'Power Dashboard', fr: 'Tableau Électrique' }, description: { en: 'Monitor energy usage across your entire property from a single dashboard.', fr: 'Surveillez la consommation d\'énergie de toute votre propriété depuis un seul tableau de bord.' }, impactMetric: { en: 'Total Visibility', fr: 'Visibilité Totale' } }
  ],
  "diy-breaker": [
      { partnerId: 'sensors', label: { en: 'Instant Leak Stop', fr: 'Arrêt Fuite Instant' }, description: { en: 'Water sensor detects moisture and shuts off supply instantly—before floods happen.', fr: 'Le capteur d\'eau détecte l\'humidité et coupe l\'alimentation instantanément—avant les inondations.' }, impactMetric: { en: 'Prevents Major Damage', fr: 'Évite Dégâts Majeurs' } },
      { partnerId: 'climatisation', label: { en: 'Smart HVAC Retrofit', fr: 'Rénovation CVC' }, description: { en: 'Add intelligent control to existing HVAC without expensive replacements.', fr: 'Ajoutez un contrôle intelligent au CVC existant sans remplacements coûteux.' }, impactMetric: { en: '18% Energy Cut', fr: '18% Réduction Énergie' } }
  ],
  "music-control": [
      { partnerId: 'control-panel', label: { en: 'Whole-Home Audio', fr: 'Audio Maison' }, description: { en: 'Perfect music in every room—controlled from elegant wall panels.', fr: 'Musique parfaite dans chaque pièce—contrôlée depuis d\'élégants panneaux muraux.' }, impactMetric: { en: 'Seamless Experience', fr: 'Expérience Fluide' } },
      { partnerId: 'sensors', label: { en: 'Presence Music', fr: 'Musique Présence' }, description: { en: 'Music starts when you enter, pauses when you leave—effortless ambiance.', fr: 'La musique démarre quand vous entrez, s\'arrête quand vous sortez—ambiance sans effort.' }, impactMetric: { en: 'Always Perfect Mood', fr: 'Ambiance Toujours Parfaite' } }
  ],
  "switch": [
    { partnerId: 'lighting', label: { en: 'Scene Activation', fr: 'Activation Scène' }, description: { en: 'One button press sets lighting throughout your entire home instantly.', fr: 'Un bouton règle l\'éclairage dans toute votre maison instantanément.' }, impactMetric: { en: 'Whole-Home Control', fr: 'Contrôle Total Maison' } },
    { partnerId: 'climatisation', label: { en: 'Away Mode', fr: 'Mode Absence' }, description: { en: 'Leaving home? One touch adjusts temperature everywhere to save energy.', fr: 'Vous partez? Un toucher ajuste la température partout pour économiser l\'énergie.' }, impactMetric: { en: '15% Energy Saved', fr: '15% Énergie Économisée' } }
  ],
  "accessories": [
    { partnerId: 'gateway', label: { en: 'Smart Outlets', fr: 'Prises Intelligentes' }, description: { en: 'Control power to every outlet remotely—never waste energy on standby mode again.', fr: 'Contrôlez l\'alimentation de chaque prise à distance—ne gaspillez plus d\'énergie en veille.' }, impactMetric: { en: 'Zero Phantom Power', fr: 'Zéro Consommation Fantôme' } }
  ],
  "pet-accessories": [
    { partnerId: 'sensors', label: { en: 'Automated Care', fr: 'Soins Automatisés' }, description: { en: 'Pets fed on schedule even when you travel—worry-free pet ownership.', fr: 'Animaux nourris selon l\'horaire même quand vous voyagez—propriété sans souci.' }, impactMetric: { en: 'Peace of Mind', fr: 'Tranquillité Esprit' } },
    { partnerId: 'camera-doorbell', label: { en: 'Pet Watch', fr: 'Surveillance Animaux' }, description: { en: 'Check on pets anytime from your phone—see they\'re safe and happy.', fr: 'Vérifiez vos animaux à tout moment depuis votre téléphone—voyez qu\'ils sont en sécurité et heureux.' }, impactMetric: { en: 'Always Connected', fr: 'Toujours Connecté' } }
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

// Categories to exclude from main navigation (their products will be merged into other categories)
// NOTE: Smart Door Lock Body is an accessory, not a standalone category.
// Its products are automatically merged into the "Smart Accessorries" category.
// DO NOT remove from this list - it should always be treated as an accessory.
const EXCLUDED_CATEGORIES = ['Smart Door Lock Body'];

// Collect products from excluded categories to merge into accessories
const accessoryProducts: any[] = [];

productCatalog.categories.forEach((catInfo: any) => {
  // Skip excluded categories but collect their products for accessories
  if (EXCLUDED_CATEGORIES.includes(catInfo.name)) {
    if (catInfo.products && Array.isArray(catInfo.products)) {
      accessoryProducts.push(...catInfo.products);
    }
    return; // Skip creating a category for this
  }

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
          // Ensure partnerId is unique to prevent React key conflicts
          const isDuplicate = combinedConnections.some(c => 
            c.description.en === sceneText || 
            c.partnerId === partnerId
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
      imageUrl: getImageForProduct(p.sku, p), // Pass product data to get migrated images
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

// Merge excluded category products into accessories
if (accessoryProducts.length > 0) {
  const accessoriesCategory = processedCategories.find(cat => cat.id === 'accessories');
  if (accessoriesCategory) {
    // Add excluded products to accessories category
    const mergedProducts: Product[] = accessoryProducts.map(p => {
      const product: Product = {
        id: p.sku,
        category: 'accessories', // Force category to accessories
        sku: p.sku,
        name: toBilingual(p.name),
        specs: p.specs ? p.specs.split('|').map((s: string) => s.trim()) : [],
        benefits: [],
        imageUrl: getImageForProduct(p.sku, p),
        description: toBilingual(p.description || ''),
        slug: p.slug,
        automations: p.automations || [],
        connectedScenes: p.connected_scenes || []
      };
      return product;
    });

    // Add merged products to ALL_PRODUCTS
    processedProducts.push(...mergedProducts);

    // Update accessories category count and showcase products
    accessoriesCategory.productCount += accessoryProducts.length;
    
    // Update showcase products to include merged products (up to 3 total)
    const allAccessoryProducts = processedProducts.filter(p => p.category === 'accessories');
    accessoriesCategory.showcaseProductIds = allAccessoryProducts.slice(0, 3).map(p => p.id);
    
    // Update hero if needed
    if (allAccessoryProducts.length > 0 && !accessoriesCategory.heroProductId) {
      const hero = allAccessoryProducts[0];
      accessoriesCategory.heroProductId = hero.id;
      heroProductsMap[hero.id] = hero;
    }
  }
}


export const CATEGORIES = processedCategories;
export const HERO_PRODUCTS = heroProductsMap;
export const ALL_PRODUCTS = processedProducts;
