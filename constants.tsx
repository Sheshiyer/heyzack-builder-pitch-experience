
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
  { 
    id: 'circuit-breaker', 
    name: { en: 'Circuit Breaker', fr: 'Disjoncteur' }, 
    productCount: 2, 
    heroProductId: 'breaker-hero', 
    description: { en: 'Real-time energy monitoring and remote shutoff for portfolio-wide cost control.', fr: 'Surveillance énergétique en temps réel et arrêt à distance pour contrôle des coûts.' }, 
    connections: [
      { partnerId: 'gateway', label: { en: 'Energy-Pulse', fr: 'Pouls-Énergie' }, description: { en: 'Dashboard aggregates all building energy consumption for instant insights.', fr: 'Tableau de bord agrège toute la consommation pour des insights instantanés.' }, impactMetric: { en: 'ROI Visibility', fr: 'Visibilité ROI' } },
      { partnerId: 'climatisation', label: { en: 'Load-Shed', fr: 'Délestage' }, description: { en: 'Auto-throttles HVAC during peak pricing to avoid demand charges.', fr: 'Réduit automatiquement le CVC pendant les pics tarifaires.' }, impactMetric: { en: '22% Utility Savings', fr: '22% Économies' } }
    ] 
  },
  { 
    id: 'door-lock', 
    name: { en: 'Smart Door Lock', fr: 'Serrure' }, 
    productCount: 10, 
    heroProductId: 'lock-hero', 
    description: { en: 'Keyless entry with remote access codes eliminates lockout calls and turnover delays.', fr: 'Entrée sans clé avec codes à distance élimine les appels de verrouillage et les retards.' }, 
    connections: [
      { partnerId: 'gateway', label: { en: 'Remote-Access', fr: 'Accès-Distant' }, description: { en: 'Property manager grants temporary codes from anywhere, no physical keys.', fr: 'Le gestionnaire accorde des codes temporaires de n\'importe où, sans clés physiques.' }, impactMetric: { en: '$850/Turnover Saved', fr: '850$/Rotation Économisé' } },
      { partnerId: 'camera-doorbell', label: { en: 'Verified-Entry', fr: 'Entrée-Vérifiée' }, description: { en: 'Video verification ensures only authorized access, reduces tenant disputes.', fr: 'Vérification vidéo garantit l\'accès autorisé uniquement, réduit les litiges.' }, impactMetric: { en: '95% Security', fr: '95% Sécurité' } }
    ] 
  },
  { 
    id: 'control-panel', 
    name: { en: 'Control Panel', fr: 'Panneau de Contrôle' }, 
    productCount: 6, 
    heroProductId: 'panel-hero', 
    description: { en: 'Central touchscreen hub for tenant-friendly control of entire unit ecosystem.', fr: 'Hub tactile central pour contrôle convivial de tout l\'écosystème de l\'unité.' }, 
    connections: [
      { partnerId: 'lighting', label: { en: 'Touch-Ambiance', fr: 'Ambiance-Tactile' }, description: { en: 'Visual scene builder lets tenants customize lighting moods effortlessly.', fr: 'Constructeur de scènes visuel permet de personnaliser l\'éclairage facilement.' }, impactMetric: { en: 'Premium Perception', fr: 'Perception Premium' } },
      { partnerId: 'climatisation', label: { en: 'Comfort-Dial', fr: 'Cadran-Confort' }, description: { en: 'Intuitive temperature control reduces support calls by 60%.', fr: 'Contrôle de température intuitif réduit les appels de 60%.' }, impactMetric: { en: 'Support Reduction', fr: 'Réduction Support' } }
    ] 
  },
  { 
    id: 'gateway', 
    name: { en: 'Smart Gateway', fr: 'Passerelle' }, 
    productCount: 4, 
    heroProductId: 'gateway-hero', 
    description: { en: 'Portfolio command center enabling remote management of unlimited properties.', fr: 'Centre de commande de portefeuille permettant la gestion à distance de propriétés illimitées.' }, 
    connections: [
      { partnerId: 'door-lock', label: { en: 'Virtual-Keys', fr: 'Clés-Virtuelles' }, description: { en: 'Centralized access control across all units eliminates physical key logistics.', fr: 'Contrôle d\'accès centralisé élimine la logistique des clés physiques.' }, impactMetric: { en: 'Zero Lockouts', fr: 'Zéro Verrouillage' } },
      { partnerId: 'circuit-breaker', label: { en: 'Energy-Dashboard', fr: 'Tableau-Énergie' }, description: { en: 'Real-time portfolio-wide energy visibility identifies cost savings opportunities.', fr: 'Visibilité énergétique en temps réel identifie les opportunités d\'économies.' }, impactMetric: { en: '$12K/Building/Year', fr: '12K$/Bâtiment/An' } }
    ] 
  },
  { 
    id: 'diy-breaker', 
    name: { en: 'DIY Breaker', fr: 'Micro-Disjoncteur' }, 
    productCount: 5, 
    heroProductId: 'diy-hero', 
    description: { en: 'Retrofit-friendly smart relays that upgrade existing systems without rewiring.', fr: 'Relais intelligents de rénovation qui améliorent les systèmes existants sans recâblage.' }, 
    connections: [
      { partnerId: 'sensors', label: { en: 'Leak-Shutoff', fr: 'Arrêt-Fuite' }, description: { en: 'Water sensor triggers instant valve closure preventing $50K+ flood damage.', fr: 'Capteur d\'eau déclenche la fermeture instantanée pour éviter 50K$+ de dégâts.' }, impactMetric: { en: 'Insurance Premium Cut', fr: 'Réduction Prime Assurance' } },
      { partnerId: 'climatisation', label: { en: 'HVAC-Upgrade', fr: 'Mise-à-Niveau-CVC' }, description: { en: 'Adds smart control to legacy HVAC without replacing units.', fr: 'Ajoute contrôle intelligent au CVC existant sans remplacement.' }, impactMetric: { en: '18% Energy Savings', fr: '18% Économies' } }
    ] 
  },
  { 
    id: 'music-control', 
    name: { en: 'Music Control', fr: 'Musique' }, 
    productCount: 3, 
    heroProductId: 'music-hero', 
    description: { en: 'Multi-zone audio for amenity spaces that differentiates luxury properties.', fr: 'Audio multi-zones pour espaces d\'agrément qui différencie les propriétés de luxe.' }, 
    connections: [
      { partnerId: 'control-panel', label: { en: 'Amenity-Scheduler', fr: 'Planificateur-Agrément' }, description: { en: 'Automated gym and lounge audio creates premium tenant experience.', fr: 'Audio automatisé pour gym et salon crée une expérience premium.' }, impactMetric: { en: '12% Rent Premium', fr: '12% Prime Location' } },
      { partnerId: 'sensors', label: { en: 'Presence-Audio', fr: 'Audio-Présence' }, description: { en: 'Music activates when tenants enter amenity spaces, pauses when empty.', fr: 'La musique s\'active quand les locataires entrent, se met en pause si vide.' }, impactMetric: { en: 'Luxury Feel', fr: 'Sensation Luxe' } }
    ] 
  },
  { id: 'switch', name: { en: 'Smart Switch', fr: 'Interrupteur' }, productCount: 5, heroProductId: 'switch-hero', description: { en: 'One-touch scene control for tenant convenience and energy savings.', fr: 'Contrôle de scènes en un seul toucher pour le confort et l\'économie d\'énergie.' }, connections: [
    { partnerId: 'lighting', label: { en: 'Scene-Master', fr: 'Maître-Scène' }, description: { en: 'Single button activates multi-room lighting scenes instantly.', fr: 'Un bouton active instantanément les scènes d\'éclairage multi-pièces.' }, impactMetric: { en: 'Tenant Delight', fr: 'Satisfaction Locataire' } },
    { partnerId: 'climatisation', label: { en: 'Quick-Comfort', fr: 'Confort-Rapide' }, description: { en: 'Away mode adjusts all HVAC zones with one touch.', fr: 'Le mode absent ajuste toutes les zones CVC en un seul toucher.' }, impactMetric: { en: '15% Energy Cut', fr: '15% Économie' } }
  ] },
  { id: 'accessories', name: { en: 'Accessories', fr: 'Accessoires' }, productCount: 8, heroProductId: 'strip-hero', description: { en: 'Smart power strips and hardware for complete ecosystem integration.', fr: 'Prises intelligentes et matériel pour intégration complète de l\'écosystème.' }, connections: [
    { partnerId: 'gateway', label: { en: 'Power-Hub', fr: 'Hub-Énergie' }, description: { en: 'Centralized control of all unit outlets for maintenance shutoffs.', fr: 'Contrôle centralisé de toutes les prises pour arrêts de maintenance.' }, impactMetric: { en: 'Zero Site Visits', fr: 'Zéro Visite' } }
  ] },
  { 
    id: 'pet-accessories', 
    name: { en: 'Pet Accessories', fr: 'Accessoires Animaux' }, 
    productCount: 2, 
    heroProductId: 'pet-hero', 
    description: { en: 'Smart pet care amenities that capture the growing pet-owner market segment.', fr: 'Agréments intelligents pour animaux qui capturent le segment croissant des propriétaires.' }, 
    connections: [
      { partnerId: 'sensors', label: { en: 'Auto-Feed', fr: 'Alimentation-Auto' }, description: { en: 'Presence-based feeding ensures pets are cared for even when tenants travel.', fr: 'Alimentation basée sur la présence garantit les soins même en voyage.' }, impactMetric: { en: '40% Higher Demand', fr: '40% Demande Plus' } },
      { partnerId: 'camera-doorbell', label: { en: 'Pet-Cam', fr: 'Caméra-Animal' }, description: { en: 'Remote pet monitoring reduces anxiety and tenant turnover.', fr: 'Surveillance à distance réduit l\'anxiété et le roulement des locataires.' }, impactMetric: { en: 'Retention Boost', fr: 'Boost Rétention' } }
    ] 
  }
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
