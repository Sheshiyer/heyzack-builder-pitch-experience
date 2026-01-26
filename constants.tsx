
import { Pillar, Category, Product, Scene } from './types';

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

export const CATEGORIES: Category[] = [
  {
    id: 'camera-doorbell',
    name: { en: 'Camera and Doorbell', fr: 'Caméra et Sonnette' },
    productCount: 9,
    heroProductId: 'doorbell-hero',
    description: { en: 'Entry verification and surveillance with instant cloud recording.', fr: 'Vérification des entrées et surveillance avec enregistrement cloud.' },
    connections: [
      { partnerId: 'lighting', label: { en: 'Auto-Porch', fr: 'Porche-Auto' }, description: { en: 'PIR trigger lights up porch for arriving guests.', fr: 'Le capteur PIR éclaire le porche pour les invités.' }, impactMetric: { en: '90% Crime Deterrence', fr: '90% de Dissuasion' } },
      { partnerId: 'door-lock', label: { en: 'Face-Entry', fr: 'Entrée-Visage' }, description: { en: 'Verified recognition unlocks main lobby automatically.', fr: 'La reconnaissance vérifiée déverrouille le hall.' }, impactMetric: { en: 'Zero-Friction UX', fr: 'UX sans friction' } }
    ]
  },
  {
    id: 'sensors',
    name: { en: 'Smart Sensors', fr: 'Capteurs Intelligents' },
    productCount: 13,
    heroProductId: 'sensor-hero',
    description: { en: 'Environmental monitoring for leak detection and occupancy.', fr: 'Surveillance environnementale pour fuites et occupation.' },
    connections: [
      { partnerId: 'climatisation', label: { en: 'Eco-Temp', fr: 'Temp-Éco' }, description: { en: 'Adjusts HVAC based on real-time room occupancy.', fr: 'Ajuste le CVC selon l\'occupation en temps réel.' }, impactMetric: { en: '30% Energy Savings', fr: '30% d\'Économies' } },
      { partnerId: 'diy-breaker', label: { en: 'Leak-Block', fr: 'Bloque-Fuite' }, description: { en: 'Shuts main water valve instantly on moisture detection.', fr: 'Ferme la vanne d\'eau en cas d\'humidité.' }, impactMetric: { en: '-100% Flood Risk', fr: '-100% Risque Inond.' } }
    ]
  },
  {
    id: 'climatisation',
    name: { en: 'Smart Climatisation', fr: 'Climatisation' },
    productCount: 14,
    heroProductId: 'hvac-hero',
    description: { en: 'Zoned heating and cooling for maximum tenant comfort.', fr: 'Chauffage et clim zonés pour un confort maximal.' },
    connections: [
      { partnerId: 'curtain-shutter', label: { en: 'Sun-Shield', fr: 'Pare-Soleil' }, description: { en: 'Closes shutters to mitigate solar heat gain during peaks.', fr: 'Ferme les volets pour réduire la chaleur solaire.' }, impactMetric: { en: 'OpEx Mitigation', fr: 'Baisse OpEx' } },
      { partnerId: 'circuit-breaker', label: { en: 'Grid-Sync', fr: 'Sync-Réseau' }, description: { en: 'Load-sheds during high demand periods.', fr: 'Délestage lors des pics de demande.' }, impactMetric: { en: 'Grid Compliance', fr: 'Conformité Réseau' } }
    ]
  },
  {
    id: 'lighting',
    name: { en: 'Smart Lighting', fr: 'Éclairage Intelligent' },
    productCount: 18,
    heroProductId: 'light-hero',
    description: { en: 'Dynamic ambiance and group dimming orchestration.', fr: 'Ambiance dynamique et gradation groupée.' },
    connections: [
      { partnerId: 'sensors', label: { en: 'Follow-Me', fr: 'Suis-Moi' }, description: { en: 'Lights follow residents through corridors for safety.', fr: 'La lumière suit les résidents dans les couloirs.' }, impactMetric: { en: 'Reduced Liability', fr: 'Responsabilité réduite' } },
      { partnerId: 'control-panel', label: { en: 'Scene-Link', fr: 'Lien-Scène' }, description: { en: 'Visual feedback for arming security systems.', fr: 'Retour visuel pour l\'armement de la sécurité.' }, impactMetric: { en: 'Enhanced UX', fr: 'UX Améliorée' } }
    ]
  },
  {
    id: 'curtain-shutter',
    name: { en: 'Curtain & Shutter', fr: 'Rideaux & Volets' },
    productCount: 29,
    heroProductId: 'shutter-hero',
    description: { en: 'Automated light management and privacy control.', fr: 'Gestion auto de la lumière et de l\'intimité.' },
    connections: [
      { partnerId: 'climatisation', label: { en: 'Thermal-Lock', fr: 'Verrou-Thermique' }, description: { en: 'Auto-closes to trap heat in winter nights.', fr: 'Fermeture auto pour garder la chaleur l\'hiver.' }, impactMetric: { en: 'Heat Retention', fr: 'Rétention Chaleur' } }
    ]
  },
  { id: 'circuit-breaker', name: { en: 'Circuit Breaker', fr: 'Disjoncteur' }, productCount: 2, heroProductId: 'breaker-hero', description: { en: 'Portfolio energy analytics.', fr: 'Analyses énergétiques.' }, connections: [] },
  { id: 'door-lock', name: { en: 'Smart Door Lock', fr: 'Serrure' }, productCount: 10, heroProductId: 'lock-hero', description: { en: 'Keyless turnover efficiency.', fr: 'Efficacité turnover sans clé.' }, connections: [] },
  { id: 'control-panel', name: { en: 'Control Panel', fr: 'Panneau de Contrôle' }, productCount: 6, heroProductId: 'panel-hero', description: { en: 'Unit command hub.', fr: 'Hub de commande.' }, connections: [] },
  { id: 'gateway', name: { en: 'Smart Gateway', fr: 'Passerelle' }, productCount: 4, heroProductId: 'gateway-hero', description: { en: 'System connectivity hub.', fr: 'Hub de connectivité.' }, connections: [] },
  { id: 'diy-breaker', name: { en: 'DIY Breaker', fr: 'Micro-Disjoncteur' }, productCount: 5, heroProductId: 'diy-hero', description: { en: 'Legacy integration tools.', fr: 'Outils d\'intégration.' }, connections: [] },
  { id: 'music-control', name: { en: 'Music Control', fr: 'Musique' }, productCount: 3, heroProductId: 'music-hero', description: { en: 'Amenity audio systems.', fr: 'Systèmes audio d\'agrément.' }, connections: [] },
  { id: 'switch', name: { en: 'Smart Switch', fr: 'Interrupteur' }, productCount: 5, heroProductId: 'switch-hero', description: { en: 'Tactile scene controls.', fr: 'Commandes de scènes.' }, connections: [] },
  { id: 'lock-body', name: { en: 'Lock Body', fr: 'Corps de Serrure' }, productCount: 3, heroProductId: 'mortise-hero', description: { en: 'Commercial hardware.', fr: 'Matériel commercial.' }, connections: [] },
  { id: 'accessories', name: { en: 'Accessories', fr: 'Accessoires' }, productCount: 5, heroProductId: 'strip-hero', description: { en: 'Power management tools.', fr: 'Outils de gestion d\'énergie.' }, connections: [] },
  { id: 'pet-accessories', name: { en: 'Pet Accessories', fr: 'Accesoires Animaux' }, productCount: 2, heroProductId: 'pet-hero', description: { en: 'Pet-friendly amenities.', fr: 'Agréments animaux.' }, connections: [] }
];

export const HERO_PRODUCTS: Record<string, Product> = {
  'doorbell-hero': { id: 'db-1', name: 'HZ-SS-VIDDOR04', category: 'Camera and Doorbell', sku: 'HZ-SS-VIDDOR04', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop', specs: ['2K Visuals', 'Zero-Wiring', 'IPX4 Weatherproof'], benefits: ['Liability Reduction', 'Tenant Security', 'Easy Retrofit'] },
  'shutter-hero': { id: 'sh-1', name: 'HZ-CS-BATSOL01', category: 'Curtain, Shutter and Garage', sku: 'HZ-CS-BATSOL01', imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop', specs: ['Zigbee 3.0', 'Built-in Lithium', 'Torque 1.2N'], benefits: ['OpEx Mitigation', 'Comfort UX', 'Asset Protection'] },
  'hvac-hero': { id: 'hv-1', name: 'HZ-SC-CONACC03', category: 'Smart Climatisation', sku: 'HZ-SC-CONACC03', imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=800&auto=format&fit=crop', specs: ['Zigbee 3.0', 'AA Powered', 'Accuracy ±0.5°C'], benefits: ['30% Savings', 'Zone Control', 'Easy Maintenance'] },
  'breaker-hero': { id: 'br-1', name: 'HZ-SC-2PBRE01', category: 'Smart Circuit Breaker', sku: 'HZ-SC-2PBRE01', imageUrl: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=800&auto=format&fit=crop', specs: ['Real-time KWh', 'Remote Shutoff', 'IEC 61009'], benefits: ['Zero Fire Risk', 'Billing Accuracy', 'Preventative Maintenance'] },
  'lock-hero': { id: 'lk-1', name: 'HZ-SL-DOUSID01', category: 'Smart Door Lock', sku: 'HZ-SL-DOUSID01', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop', specs: ['Biometric', 'IC Card', 'TT Lock APP'], benefits: ['No Physical Keys', 'Instant Turnover', 'Access Logs'] },
  'panel-hero': { id: 'pn-1', name: 'HZ-SC-3501', category: 'Smart Control Panel', sku: 'HZ-SC-3501', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop', specs: ['3.5" Screen', '3 Gang Relay', 'IR Control'], benefits: ['Unified Control', 'Space Saving', 'No Gateway Req'] },
  'light-hero': { id: 'lt-1', name: 'HZ-SL-ZIGINT01', category: 'Smart Lighting', sku: 'HZ-SL-ZIGINT01', imageUrl: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=800&auto=format&fit=crop', specs: ['PWM Dimming', 'No-Flicker', '64 Node Mesh'], benefits: ['Tenant Comfort', 'Energy Efficiency', 'Premium Feel'] },
  'sensor-hero': { id: 'sn-1', name: 'HZ-SN-CONACC06', category: 'Smart Sensors', sku: 'HZ-SN-CONACC06', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop', specs: ['16A Contact', 'Power Mon.', 'MINI Size'], benefits: ['Leak Prevention', 'Occupancy Stats', 'Automated Safety'] },
  'gateway-hero': { id: 'gw-1', name: 'HZ-SG-MATGAT01', category: 'Smart Gateway', sku: 'HZ-SG-MATGAT01', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop', specs: ['Matter Protocol', 'Ethernet RJ45', '128 Node Cap'], benefits: ['Future Proof', 'Local Security', 'Scalable Asset'] },
  'diy-hero': { id: 'dy-1', name: 'HZ-SN-CONACC06', category: 'Smart DIY Breaker', sku: 'HZ-SN-CONACC06', imageUrl: 'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=800&auto=format&fit=crop', specs: ['Dry Contact', '16A Relay', 'WiFi/Zigbee'], benefits: ['Retrofit Capable', 'HVAC Control', 'Low-cost Smart'] },
  'music-hero': { id: 'mc-1', name: 'HZ-SM-DOMCAM01', category: 'Smart Music Control', sku: 'HZ-SM-DOMCAM01', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop', specs: ['5.25" Silk Dome', '80W Rated', 'Bluetooth Master'], benefits: ['Luxury Lifestyle', 'Multi-room Audio', 'Hidden Sound'] },
  'switch-hero': { id: 'sw-1', name: 'HZ-LT-SPOTLT04', category: 'Smart Switch', sku: 'HZ-LT-SPOTLT04', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop', specs: ['4 Gang Display', 'UK/EU Standard', 'Flame Retardant'], benefits: ['Visual Interface', 'Intuitive Scenes', 'Modern Aesthetic'] },
  'mortise-hero': { id: 'mh-1', name: 'HZ-SD-SQU50501', category: 'Lock Body', sku: 'HZ-SD-SQU50501', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop', specs: ['304 Stainless', '96hr Salt Spray', 'IP65 Rated'], benefits: ['Durability', 'Security Standard', 'Bulk Reliability'] },
  'strip-hero': { id: 'st-1', name: 'HZ-SA-CONACC01', category: 'Accessories', sku: 'HZ-SA-CONACC01', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop', specs: ['Zigbee 3.0', 'Dual 100W Ch', 'Voltage 100-240V'], benefits: ['Device Orchestration', 'Remote Power Cycle', 'Surge Protect'] },
  'pet-hero': { id: 'pt-1', name: 'HZ-PA-CONACC02', category: 'Pet Accessories', sku: 'HZ-PA-CONACC02', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop', specs: ['4L Capacity', '304 Stainless', 'WiFi 2.4/5G'], benefits: ['Pet-Friendly Portfolios', 'Automated Care', 'Premium Amenity'] }
};

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
