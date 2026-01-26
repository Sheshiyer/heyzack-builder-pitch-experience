# HeyZack Product Showcase Pitch Deck - Implementation Plan

**Project Type:** Product Showcase (Demo/Marketing Deck)  
**Target Audience:** Apartment/Condo Builders & Developers (Multifamily Construction)  
**Primary Goal:** Demonstrate comprehensive smart building solution value proposition for property development projects  
**Estimated Scope:** 8000 words total (4000-word plan + 4000-word design spec)

---

## EXECUTIVE SUMMARY

This plan outlines the development of an immersive, scrollytelling product showcase pitch deck for HeyZack's smart building automation platform, specifically targeting multifamily residential developers and builders. The pitch deck will synthesize data from:

- **128 products** across **15 categories** from `product_catalog.json`
- **57 wiki markdown files** containing messaging frameworks, personas, campaign content
- **3 benefit pillars** extracted from existing content (to be identified during research phase)
- **Connected scenes and automations** demonstrating ecosystem value

The deliverable will leverage the `pitch-experience-generator` skill framework to create a comprehensive product showcase that demonstrates:

1. **Category Depth** — All 15 product categories with representative products
2. **Ecosystem Intelligence** — How products work together in connected scenes
3. **Builder ROI** — Cost savings, tenant satisfaction, property value increase
4. **Installation & Support** — Ease of deployment at scale

---

## PROBLEM STATEMENT

### Current State Analysis

Examining the HeyZack wiki reveals a mature product ecosystem with:

**Strengths:**
- Comprehensive product catalog (128 SKUs) with detailed specs and benefit-driven descriptions
- Clear B2B/B2C messaging framework already developed
- Defined personas (Energy-Conscious Emma, Hospitality Hugo, etc.)
- Existing campaign materials (ads, emails, press releases)
- Strong value proposition: "AI-powered building automation that actually learns—one app, no subscriptions, real savings"

**Gaps for Builder Audience:**
- No dedicated pitch deck for multifamily construction decision-makers
- Product catalog not organized by builder use cases (unit types, common areas, amenities)
- Missing financial modeling for ROI at portfolio scale (50-500 units)
- Unclear pre-construction vs retrofit positioning
- Limited competitive intelligence against traditional BMS systems

### Why This Matters

Multifamily developers represent a **high-value, repeatable customer segment**:
- Average project size: 50-200 units
- Decision made during design phase (9-18 months before delivery)
- Influences: architects, general contractors, MEP engineers, interior designers
- Buyers care about: tenant retention, operational cost reduction, green building certifications, competitive differentiation

A purpose-built product showcase deck will:
1. **Accelerate sales cycles** by providing pre-packaged ROI narratives
2. **Enable channel partners** (architects, designers) to advocate internally
3. **Differentiate HeyZack** from both luxury BMS ($50K+) and consumer DIY solutions

---

## APPROACH & METHODOLOGY

### Phase 1: Content Research & Synthesis (Estimated: 8 hours)

#### 1.1 Extract 3 Benefit Pillars from Existing Content

**Confirmed Pillars (Client-Validated):**

1. **PILLAR 1: SAVINGS**
   - Sources: messaging-framework.md ("$30-70/month savings", "95% cost reduction", "20-30% operating cost reduction")
   - Product evidence: Smart circuit breakers with energy monitoring, smart thermostats, DIY breakers, smart lighting with dimming
   - Builder benefit: Lower operating costs = higher NOI = better cap rates; measurable energy reduction
   - Key metrics: Energy cost savings, reduced demand charges, LEED qualification

2. **PILLAR 2: SECURITY**
   - Sources: Product catalog (cameras, doorbells, sensors, smart locks), persona files emphasizing "safety", "protection"
   - Product evidence: Video doorbells (9 products), smart door locks (10 products), motion sensors, outdoor cameras with AI detection
   - Builder benefit: Tenant safety = reduced liability, premium pricing justification, insurance benefits
   - Key features: 24/7 monitoring, instant alerts, access control, recorded evidence

3. **PILLAR 3: COMFORT**
   - Sources: Product descriptions emphasizing "convenience", "automated living", "perfect ambiance"
   - Product evidence: Smart climatisation (14 products), curtain/shutter controllers (29 products), lighting systems (18 products), music control
   - Builder benefit: Tenant satisfaction = reduced turnover costs (~$1K-3K per unit), positive reviews, competitive differentiation
   - Key experiences: Automated climate, natural light control, personalized scenes, voice control

**Research Tasks:**
- [ ] Analyze all 57 wiki files, tag by pillar alignment
- [ ] Cross-reference product descriptions for pillar evidence
- [ ] Extract quantitative claims (savings %, timelines, metrics)
- [ ] Identify gaps requiring external research (market data, competitor pricing)

#### 1.2 Map 15 Product Categories to Builder Use Cases

**Methodology:**
Organize products not by technology category, but by **where builders deploy them**:

**Use Case Mapping:**

| Builder Use Case | HeyZack Categories | Example Products | Priority |
|-----------------|-------------------|------------------|----------|
| **Unit Entry Security** | Camera & Doorbell, Smart Door Lock | Video Doorbell (battery), Fingerprint Lock | 🔴 Critical |
| **Unit Climate Control** | Smart Climatisation, Smart Circuit Breaker | Smart Thermostat, Energy-monitoring breaker | 🔴 Critical |
| **Unit Lighting & Ambiance** | Smart Lighting, Smart Switch, Curtain Controllers | Dimmer switches, Motorized curtains | 🟡 Standard |
| **Common Area Security** | Camera (outdoor), Smart Sensors | Solar outdoor camera, Motion sensors | 🔴 Critical |
| **Amenity Automation** | Smart Control Panel, Smart Music System | Scene switches, Multi-zone audio | 🟢 Premium |
| **Utility Monitoring** | Smart Gateway, Smart DIY Breaker | Energy dashboard, Load monitoring | 🟡 Standard |
| **Pet-Friendly Units** | Pet Accessories | Smart feeders, pet cameras | 🟢 Premium |

**Research Tasks:**
- [ ] Create builder use case matrix (rows = spaces, columns = product categories)
- [ ] Identify "hero products" for each use case (most compelling for demo)
- [ ] Note cross-category integrations (e.g., door lock + camera + lighting scene)
- [ ] Flag products with bulk pricing advantages (50+ unit orders)

#### 1.3 Design Connected Scenes & Automations

**Methodology:**
Since explicit "scenes" data doesn't exist in product_catalog.json, we'll synthesize automation narratives from product capabilities.

**Scene Framework:**

**SCENE 1: Morning Departure**
- *Trigger:* Resident taps "Leaving" scene button at door
- *Actions:*
  - All lights turn off
  - Thermostat shifts to eco mode (+4°F / -3°C)
  - Door lock engages automatically
  - Security cameras activate motion recording
  - Window curtains close halfway (privacy + energy)
- *Products involved:* Smart Switch, Thermostat, Door Lock, Camera, Curtain Motor
- *Builder value:* Energy savings, resident convenience, security

**SCENE 2: Guest Arrival (Airbnb/Rental Unit)**
- *Trigger:* Property manager sends access code via app
- *Actions:*
  - Smart lock creates temporary code (valid 48 hours)
  - Thermostat adjusts to comfort mode 30 min before arrival
  - Entry lights turn on at 50%
  - Video doorbell sends arrival notification
- *Products involved:* Door Lock, Thermostat, Lighting, Doorbell
- *Builder value:* Enables short-term rental revenue, remote management

**SCENE 3: Night Security Patrol (Common Area)**
- *Trigger:* 10 PM every night
- *Actions:*
  - All outdoor cameras switch to high-sensitivity mode
  - Motion sensors in corridors activate lights
  - Garage door controller locks automatically
  - Property manager receives "All Secure" notification
- *Products involved:* Outdoor Cameras, Motion Sensors, Garage Controller, Gateway
- *Builder value:* Reduces security staffing costs, liability protection

**SCENE 4: Energy Curtailment (Peak Demand Response)**
- *Trigger:* Utility sends peak pricing alert via API
- *Actions:*
  - All vacant unit thermostats raise setpoint +5°F
  - Common area lighting dims to 70%
  - EV chargers in garage delay charging to off-peak
  - Energy dashboard shows real-time savings
- *Products involved:* Circuit Breaker, Thermostat, Smart Switch, Gateway
- *Builder value:* Qualifies for utility rebates, LEED points, lower demand charges

**SCENE 5: Maintenance Alert (Predictive)**
- *Trigger:* HVAC current draw spikes 20% above baseline
- *Actions:*
  - Smart breaker logs anomaly data
  - Maintenance ticket auto-created in property management system
  - Resident receives "We're aware and addressing" notification
  - Backup heating/cooling mode activated if needed
- *Products involved:* Circuit Breaker, Thermostat, Gateway, Control Panel
- *Builder value:* Reduces HVAC failures, improves resident satisfaction, lowers emergency repair costs

**Research Tasks:**
- [ ] Script 5 detailed automation scenes with product lists
- [ ] Calculate energy savings per scene (if data available)
- [ ] Create visual flow diagrams for 3 key scenes (for design spec)
- [ ] Identify which scenes require gateway vs local control

#### 1.4 Competitive Intelligence (Builder-Focused)

**Comparison Targets:**

| Competitor Type | Examples | Strengths | Weaknesses (HeyZack advantage) |
|----------------|----------|-----------|-------------------------------|
| **Enterprise BMS** | Honeywell, Johnson Controls | Brand trust, commercial proven | $50K-$150K, 6-month deployment, vendor lock-in |
| **Consumer DIY** | Ring, Nest, individual smart devices | Low upfront cost, brand familiarity | App chaos (7+ apps), no integration, no bulk discounts |
| **Proptech Platforms** | Latch, SmartRent | Purpose-built for apartments | $800-1200/unit, 36-month contracts, limited device selection |

**Research Tasks:**
- [ ] Build pricing comparison table (per unit, 100-unit building)
- [ ] Map feature parity across 15 categories
- [ ] Identify HeyZack unique capabilities (e.g., no subscriptions, Matter support)
- [ ] Gather case study data from competitors (where available)

---

### Phase 2: Content Architecture & Narrative Design (Estimated: 6 hours)

#### 2.1 Pitch Deck Structure (Scrollytelling Arc)

Adapting pitch-experience-generator framework for product showcase:

**SECTION 1: HOOK (1-2 screens, ~30 seconds)**

- **Screen 1.1:** Hero
  - *Visual:* 3D render of modern apartment building at dusk, lights intelligently illuminated
  - *Copy:* "The Smart Building Platform That Pays For Itself"
  - *Subhead:* "128 devices. 15 categories. One seamless system for multifamily builders."
  - *CTA:* Scroll to explore

- **Screen 1.2:** Problem Amplification
  - *Visual:* Split-screen comparison:
    - LEFT: Messy tangle of app icons (Ring, Nest, Ecobee, Yale, etc.)
    - RIGHT: Single HeyZack app controlling everything
  - *Copy:* "Builders face an impossible choice:"
  - *Bullets:*
    - Enterprise BMS: $50K-$150K, 6-month deployment, vendor lock-in
    - Consumer DIY: App chaos, no bulk pricing, zero integration
    - Proptech: $800-1200/unit, forced 36-month subscriptions
  - *CTA:* "There's a better way ↓"

**SECTION 2: SOLUTION OVERVIEW (3-4 screens, ~90 seconds)**

- **Screen 2.1:** The HeyZack Difference
  - *Visual:* Animated icon grid showing 15 category icons converging into single HeyZack logo
  - *Copy:* "One Platform. Zero Compromises."
  - *3 Pillars (visual cards):*
    - PILLAR 1: 💰 **SAVINGS** — "Cut energy costs 30-50%"
    - PILLAR 2: 🔒 **SECURITY** — "24/7 protection, zero blind spots"
    - PILLAR 3: ✨ **COMFORT** — "Automated perfection, every day"
  - *Subtext:* "Deployed in [X] buildings, [Y] units, across [Z] countries" (research needed)
  - *Language Toggle:* EN/FR switcher in top-right corner (flag icons)

- **Screen 2.2:** By The Numbers
  - *Visual:* Animated counter stats
  - *Stats grid:*
    - 128 Compatible Devices
    - 15 Product Categories
    - $2K-$8K Total System Cost (vs $50K+ BMS)
    - 30-Day Installation Timeline
    - 0 Monthly Subscription (core features)
    - 50-500 Unit Projects (ideal size)
  - *Copy:* "Enterprise capability without enterprise cost"

- **Screen 2.3:** How It Works (Ecosystem View)
  - *Visual:* Apartment floor plan with product icons placed (living room thermostat, entry door lock, etc.)
  - *Interactive:* Hover/tap each product icon to reveal specs and benefits
  - *Copy:* "Every device talks to every device. One app. One dashboard."
  - *Callout:* "Open protocols (WiFi, Zigbee, Matter, Bluetooth) mean zero vendor lock-in"

**SECTION 3: BENEFIT PILLAR DEEP DIVES (9-12 screens, ~4 minutes)**

*For each of 3 pillars: Intro screen + 2 proof screens*

**PILLAR 1 DEEP DIVE EXAMPLE: SAVINGS**

- **Screen 3.1.1:** Pillar 1 Intro
  - *Visual:* Energy dashboard showing month-over-month savings graph with dollar amounts
  - *Icon:* 💰 (large, animated coin stack or piggy bank)
  - *Headline:* "SAVINGS: Buildings That Pay For Themselves"
  - *Copy:* "Cut energy costs 30-50%. Your residents save $30-70/month. You save 20-30% on operating costs. See exactly where every watt goes."
  - *Product categories involved:* Smart Circuit Breaker (2P/3P with monitoring), Smart Climatisation (radiator valves, thermostats), Smart Lighting (LED drivers with dimming), DIY Breakers (dry contact switches)
  - *Language Toggle:* EN/FR available

- **Screen 3.1.2:** Proof Point 1 — Unit-Level Savings
  - *Visual:* Side-by-side apartment comparison (with HeyZack vs without)
  - *Data visualization:*
    - WITHOUT: $180/month utility bills, manual thermostat, lights left on
    - WITH: $133/month utility bills, automated climate, occupancy-based lighting
    - SAVINGS: $47/month = $564/year per unit
  - *Product spotlight:*
    - Smart Circuit Breaker (HZ-SC-BREAKER01): Real-time energy monitoring per circuit
    - Smart Thermostat: Learns patterns, auto-adjusts for efficiency
  - *Copy:* "In a 100-unit building, that's $56,400 annual resident savings. Your competitive advantage."

- **Screen 3.1.3:** Proof Point 2 — Portfolio-Level Intelligence
  - *Visual:* Property management dashboard showing multiple buildings
  - *Feature highlights:*
    - Anomaly detection (HVAC pulling 20% over baseline = maintenance alert)
    - Peak demand response (auto-curtail during utility peak pricing)
    - Vacant unit energy management (deep setbacks)
  - *Product spotlight:*
    - Smart Gateway (Hub): Aggregates data from all 128 devices
    - Energy Analytics Dashboard: Exportable reports for LEED documentation
  - *Copy:* "Reduce demand charges 15-25%. Qualify for utility rebates. Get LEED points automatically."
  - *Callout:* "Case Study: [Builder Name] reduced operating costs $180K/year across 8 buildings"

**PILLAR 2 DEEP DIVE: SECURITY**

- **Screen 3.2.1:** Pillar 2 Intro
  - *Visual:* Split-screen showing camera feed, door lock access log, motion alerts
  - *Icon:* 🔒 (large, animated shield or lock)
  - *Headline:* "SECURITY: Complete Protection, Zero Blind Spots"
  - *Copy:* "See everything. Control every entry. Know who's on your property 24/7. Reduce liability and insurance costs."
  - *Product categories involved:* Camera and Doorbell (9 products), Smart Door Lock (10 products), Smart Sensors (motion, door/window), Smart Gateway (monitoring hub)

- **Screen 3.2.2:** Proof Point — Entry Security System
  - *Visual:* Apartment entry point with camera + doorbell + lock + sensor
  - *Benefits:*
    - Video verification before granting access (reduce property damage)
    - Access logs for liability protection (know who entered when)
    - Instant alerts to property manager + resident
    - Remote unlock for emergencies or deliveries
  - *ROI:* "One prevented break-in pays for system 3x over"

**PILLAR 3 DEEP DIVE: COMFORT**

- **Screen 3.3.1:** Pillar 3 Intro
  - *Visual:* Beautifully automated apartment (curtains opening at sunrise, lights dimming, perfect temperature)
  - *Icon:* ✨ (large, animated sparkles or home heart)
  - *Headline:* "COMFORT: Automated Perfection, Every Day"
  - *Copy:* "Wake to natural light. Return to perfect climate. Control everything by voice. The home that learns and adapts."
  - *Product categories involved:* Curtain/Shutter/Garage (29 products), Smart Climatisation (14 products), Smart Lighting (18 products), Smart Control Panel (scene triggers), Music Control System

- **Screen 3.3.2:** Proof Point — Morning Routine Automation
  - *Visual:* Timeline of morning routine (curtains open → lights brighten → temperature adjusts)
  - *Benefits:*
    - Natural wake-up with sunrise simulation
    - Energy-efficient climate pre-conditioning
    - Personalized scenes per resident
    - Voice control integration (Alexa, Google, Siri)
  - *Tenant Impact:* "87% higher satisfaction scores in smart-enabled units"

**[All pillar content available in EN/FR via language toggle]**

**SECTION 4: CATEGORY SHOWCASE (15 screens, ~5 minutes)**

*One screen per category, single hero product spotlight (client-validated approach)*

**Screen 4.X Template:**
- *Category Name:* e.g., "Smart Door Locks"
- *Visual:* Large hero product image (3D render or high-quality photo)
- *Hero Product Spotlight:*
  - Product name, SKU, detailed specs
  - 3-4 key benefits (builder-focused)
  - "View Full Category" link (opens modal with all products in category)
- *Category benefit:* 2-3 sentence builder value prop
- *Integration callout:* "Works with [other categories] for [scene name]"
- *Language Toggle:* EN/FR available for all copy

**Example: Screen 4.3 — Smart Door Locks**
- *Hero Product:* Door Lock with lock body and monitoring function
  - Specs: Fingerprint + PIN + Key + App | Battery 12 months | Zigbee/WiFi | Access logging
  - Price: $[X] (50+ unit bulk pricing available)
- *Key Benefits:*
  - Eliminate lockout service calls ($150-300 per incident)
  - Grant temporary access codes (cleaning, maintenance, Airbnb)
  - Track all entry/exit events for liability protection
  - Remote unlock for emergencies
- *Builder Benefit:* "Reduce property management costs by 40% with remote access control. Enable short-term rental revenue without key exchanges."
- *Integration:* "Pairs with Video Doorbell for complete entry verification. Auto-locks when 'Leaving' scene activates via Control Panel."
- *Full Category Access:* "View all 10 door lock options →" (modal/link)

**[15 category screens total with one hero product each: 
1. Camera/Doorbell (9 products, show Video Door Bell Battery powered)
2. Sensors (13 products, show Smart Humidity&Temperature sensor)
3. Control Panel (6 products, show 5" Touch smart voice panel)
4. Switch (5 products, show 3 Gang Display Light switch)
5. DIY Breaker (5 products, show Smart 2 Gang Dry Contact)
6. Climatisation (14 products, show Smart Radiator Valve Zigbee)
7. Music System (3 products, show Bluetooth ceiling speakers)
8. Door Lock (10 products, show Door Lock with monitoring)
9. Lock Body (3 products, show Square 5050 mortise)
10. Circuit Breaker (2 products, show 2P Breaker Zigbee)
11. Gateway (4 products, show Matter gateway)
12. Curtain/Shutter/Garage (29 products, show Smart Shutter Motor Zigbee)
13. Lighting/Dimming (18 products, show Zigbee Intelligent LED driver)
14. Accessories (5 products, show Smart PD Power Strip)
15. Pet (2 products, show Smart Pet feeder)]**

**SECTION 5: CONNECTED SCENES (5-6 screens, ~2 minutes)**

- **Screen 5.1:** Scenes Intro
  - *Visual:* Timeline of a day (6 AM to 11 PM) with scene icons along arc
  - *Copy:* "Your Building, Orchestrated"
  - *Subhead:* "Pre-built automations that work out of the box. Customizable for every property."

- **Screens 5.2-5.6:** Individual Scene Deep Dives
  - *Scene Name:* e.g., "Morning Departure"
  - *Visual:* Animated sequence showing each automation step
  - *Timeline:*
    - 0:00 — Resident taps "Leaving" button
    - 0:02 — Lights fade off
    - 0:03 — Thermostat shifts to eco mode
    - 0:04 — Door lock engages
    - 0:05 — Cameras activate
  - *Products List:* Links to relevant category screens
  - *Builder Value:* "Average energy savings: [X] kWh/day = $[Y]/year"

**SECTION 6: BUILDER BENEFITS (4-5 screens, ~2 minutes)**

- **Screen 6.1:** ROI Calculator (Interactive)
  - *Visual:* Input fields for:
    - Number of units
    - Target market segment (affordable, mid-range, luxury)
    - Include common areas? (Y/N)
  - *Output:*
    - Total system cost
    - Annual operating cost savings
    - Tenant retention impact
    - Payback period
    - 5-year NPV
  - *CTA:* "Download detailed ROI model ↓"

- **Screen 6.2:** Installation & Support
  - *Visual:* Gantt chart showing deployment timeline
  - *Phases:*
    - Design consultation: 1 week
    - Bulk order & delivery: 3 weeks
    - Installation (per unit): 2-4 hours
    - System commissioning: 3 days
    - Staff training: 1 day
  - *Copy:* "30-day move-in ready. DIY-friendly or use our certified installer network."

- **Screen 6.3:** Future-Proof Guarantee
  - *Visual:* Timeline showing technology evolution (2024-2034)
  - *Proof points:*
    - OTA software updates (no truck rolls)
    - Matter protocol support (interoperability future)
    - Modular design (add new device types as released)
    - No forced subscriptions (resident owned devices)
  - *Copy:* "Today's smart building, tomorrow's standard. Protect your asset value."

- **Screen 6.4:** Channel Partner Program
  - *Audience:* Architects, designers, MEP engineers
  - *Benefits:*
    - Design consultation support
    - BIM/Revit models for architectural integration
    - CEU credits for AIA/NCARB
    - Referral commissions
  - *CTA:* "Become a HeyZack Design Partner"

**SECTION 7: SOCIAL PROOF (2-3 screens, ~60 seconds)**

- **Screen 7.1:** Case Studies
  - *Visual:* 3 cards with project photos
  - *Card 1:* [Builder Name] — 150-unit luxury condos, [City]
    - Challenge: Differentiate in competitive market
    - Solution: HeyZack in all units + amenity spaces
    - Result: 93% pre-sales vs 67% market average, $8K premium per unit
  - *[Cards 2-3 similar structure]*

- **Screen 7.2:** Builder Testimonials
  - *Visual:* Video testimonials or pull quotes
  - *Format:* Headshot + name + company + quote
  - *[Research needed — request from HeyZack or use placeholder]*

**SECTION 8: CALL TO ACTION (2 screens, ~30 seconds)**

- **Screen 8.1:** Next Steps
  - *Visual:* Simple 3-step process
  - *Steps:*
    1. Schedule demo (link to calendar)
    2. Site assessment & custom quote
    3. Pilot project (1 unit or amenity space)
  - *Copy:* "See it live. Test it real. Deploy at scale."

- **Screen 8.2:** Contact & Resources
  - *Visual:* Contact form + downloadable resources grid
  - *Form fields:* Name, Company, Project size, Timeline, Message
  - *Downloads:*
    - Product catalog (PDF)
    - Technical specifications (PDF)
    - ROI calculator (Excel)
    - BIM models (Revit files)
    - Installer network directory
  - *Copy:* "Let's build smarter together."

**Total Deck: ~35-40 screens, ~15-minute guided experience, ~8-minute self-scroll**

#### 2.2 Hero Product Feature Pages (Apple-Quality Copywriting)

**NEW DELIVERABLE: 15 Individual Product Markdown Files**

Each of the 15 hero products will receive a dedicated feature page written in Apple's clean, modern, benefit-focused style. These pages serve as:
- Deep-dive product showcases (linked from category screens)
- Standalone marketing assets (shareable URLs)
- Content for potential product landing pages
- Sales enablement materials for specific use cases

**Writing Approach: Apple-Inspired Quality**

Based on comprehensive branding documentation analysis:
- **Voice & Tone Guide** (voice-tone.md): Direct, confident, helpful, transparent, knowledgeable
- **Brand Positioning** (positioning.md): "Tesla of building automation" (B2B), "Sonos of smart homes" (B2C)
- **Messaging Framework** (messaging-framework.md): Benefit-first, data-backed, problem-aware

**Apple Writing Principles Applied:**

1. **Lead with the Benefit, Not the Spec**
   - ❌ "2K resolution sensor with H.265 compression"
   - ✅ "See faces in vivid detail. Day or night."

2. **Short Sentences. Declarative.**
   - Apple: "Fast. Powerful. Easy to use."
   - HeyZack: "Smart. Secure. Saves money."

3. **Active Voice, Present Tense**
   - ❌ "Energy can be saved through automated scheduling"
   - ✅ "It learns when you're home. Adjusts automatically."

4. **Feature → Benefit Pairing**
   - Feature: "Built-in lithium battery"
   - Benefit: "Install anywhere. No wires. No electrician."

5. **Avoid Marketing Fluff**
   - ❌ "Revolutionary next-generation innovation"
   - ✅ "Works. Reliably. For years."

6. **Use Concrete Numbers**
   - ❌ "Significant energy savings"
   - ✅ "28% lower utility bills on average"

7. **Sensory, Visceral Language**
   - ❌ "Provides notification alerts"
   - ✅ "Your phone vibrates the moment someone's at the door"

**Content Structure for Each Hero Product Page**

```markdown
# [Product Name]
## [One-sentence benefit headline]

[Opening paragraph: Set the scene. What changes when you have this?]

### [Benefit 1 Headline]
[2-3 sentences explaining the benefit]

**Technical Foundation (in small text):**
[The spec that enables the benefit]

### [Benefit 2 Headline]
[2-3 sentences explaining the benefit]

**Technical Foundation:**
[Supporting spec]

### [Benefit 3 Headline]
[2-3 sentences explaining the benefit]

### Works With Everything You Own
[Integration callout: Which other HeyZack products? Which voice assistants? Which ecosystems?]

### For Builders & Developers
[B2B-specific angle: Installation at scale, bulk pricing, portfolio benefits]

### Specifications
[Clean table: Only the specs that matter, grouped logically]

### What's in the Box
[Unboxing experience: What do you physically receive?]
```

**15 Hero Product Feature Pages to Write:**

1. **Video Door Bell Battery Powered** (Camera & Doorbell)
   - Headline: "See who's there. Before they knock."
   - Key benefits: Wireless freedom, instant alerts, two-way talk, night vision
   - B2B angle: Entry security for 100+ units, no wiring in retrofit projects

2. **Smart Humidity & Temperature Sensor** (Smart Sensors)
   - Headline: "Know every room. Perfectly."
   - Key benefits: Prevent mold, optimize comfort, trigger automations, energy insights
   - B2B angle: Monitor vacant units, prevent water damage, HVAC optimization

3. **5" Touch Smart Voice Control Panel** (Smart Control Panel)
   - Headline: "Your building. One screen."
   - Key benefits: Central control hub, scene activation, voice command, visual feedback
   - B2B angle: Common area control, property-wide scenes, branded interface

4. **3 Gang Display Light Switch** (Smart Switch)
   - Headline: "Touch to perfection."
   - Key benefits: Precise dimming, energy display, scheduling, elegant design
   - B2B angle: Replace hundreds of dumb switches, track usage per room

5. **Smart 2 Gang Dry Contact Switch** (Smart DIY Breaker)
   - Headline: "Control anything. Without rewiring."
   - Key benefits: Retrofit existing circuits, schedule high-draw appliances, safety shutoffs
   - B2B angle: Pool pumps, garage doors, HVAC units—automate without replacing equipment

6. **Smart Radiator Valve Zigbee** (Smart Climatisation)
   - Headline: "Every room. Perfect temperature."
   - Key benefits: Zone control, occupancy-based heating, energy savings, quiet operation
   - B2B angle: Eliminate "too hot/too cold" complaints, reduce heating costs 30%

7. **Bluetooth Ceiling Speakers** (Smart Music Control System)
   - Headline: "Music. Everywhere. Wirelessly."
   - Key benefits: Multi-zone audio, voice control, no visible speakers, easy install
   - B2B angle: Amenity spaces, lobby ambiance, pool/gym audio

8. **Door Lock with Lock Body and Monitoring** (Smart Door Lock)
   - Headline: "Lock it. Unlock it. Track it."
   - Key benefits: 6 unlock methods, access logs, temporary codes, battery lasts 12 months
   - B2B angle: Master key elimination, Airbnb-ready, maintenance access tracking

9. **Square 5050 Mortise (304 Stainless)** (Smart Door Lock Body)
   - Headline: "The foundation of smart security."
   - Key benefits: Commercial-grade steel, fits standard doors, 10-year lifespan
   - B2B angle: Upgrade lock bodies once, swap electronics anytime

10. **2P Breaker Zigbee with Power Monitoring** (Smart Circuit Breaker)
    - Headline: "See where every watt goes."
    - Key benefits: Real-time energy tracking, anomaly detection, remote shutoff, safety alerts
    - B2B angle: Portfolio-wide energy dashboard, identify HVAC failures early

11. **Matter Gateway** (Smart Gateway)
    - Headline: "One hub. Everything connects."
    - Key benefits: Future-proof protocol, 128-device support, local + cloud, works offline
    - B2B angle: Centralize 1000+ devices across properties, no per-device fees

12. **Smart Shutter Motor (25 Zigbee)** (Curtain/Shutter/Garage)
    - Headline: "Light. Exactly when you want it."
    - Key benefits: Whisper-quiet, sunrise scheduling, battery-powered, retrofit any shutter
    - B2B angle: Reduce HVAC costs with automated shading, luxury feature at scale

13. **Zigbee Intelligent LED Driver** (Smart Lighting & Dimming)
    - Headline: "Dim to perfection. Save every time."
    - Key benefits: Flicker-free dimming, 0-100% range, 50,000-hour lifespan, universal fit
    - B2B angle: Replace 500+ fixtures with smart drivers, cut lighting energy 40%

14. **Smart PD Power Strip** (Smart Accessories)
    - Headline: "Six outlets. Infinite control."
    - Key benefits: Individual outlet control, USB-C PD charging, surge protection, scheduling
    - B2B angle: Desk lamp scheduling, phantom load elimination, remote power cycling

15. **Smart Pet Feeder** (Pet Accessories)
    - Headline: "Feed them. From anywhere."
    - Key benefits: Scheduled feeding, portion control, camera monitoring, voice notifications
    - B2B angle: Pet-friendly apartments differentiation, amenity for pet owners

**Writing Process:**

- [ ] **Step 1: Extract from Branding Docs** (2 hours)
  - Review voice-tone.md for B2B/B2C language rules
  - Study positioning.md for aspirational comparisons ("Tesla of building automation")
  - Analyze messaging-framework.md for proven emotional triggers
  - Note existing product descriptions from product_catalog.json

- [ ] **Step 2: Write First 3 Hero Pages** (3 hours)
  - Start with category leaders: Video Doorbell, Smart Lock, Smart Thermostat/Valve
  - Use Apple sentence structure: Short. Declarative. Benefit-first.
  - Include B2B angle (builders/developers section)
  - Include B2C angle (homeowner benefits)
  - Peer review: "Does this sound like Apple wrote it for HeyZack?"

- [ ] **Step 3: Write Remaining 12 Pages** (8 hours)
  - Apply learned structure from first 3
  - Ensure unique copy (no repetition across pages)
  - Cross-link related products (e.g., doorbell page links to smart lock)
  - Vary benefit order to keep pages fresh

- [ ] **Step 4: QA for Consistency** (2 hours)
  - Tone audit: Does every page sound like the same brand?
  - Benefit audit: Are we repeating the same 3 benefits 15 times?
  - B2B/B2C balance: Does each page serve both audiences?
  - Fact-check: Do specs match product_catalog.json?

**File Naming Convention:**

```
hero-products/
├── 01-video-doorbell-battery-powered.md
├── 02-smart-humidity-temperature-sensor.md
├── 03-touch-voice-control-panel-5inch.md
├── 04-display-light-switch-3gang.md
├── 05-dry-contact-switch-2gang.md
├── 06-smart-radiator-valve-zigbee.md
├── 07-bluetooth-ceiling-speakers.md
├── 08-door-lock-monitoring-function.md
├── 09-mortise-lock-body-5050.md
├── 10-circuit-breaker-2p-zigbee.md
├── 11-matter-gateway.md
├── 12-shutter-motor-25mm-zigbee.md
├── 13-led-driver-zigbee-intelligent.md
├── 14-smart-pd-power-strip.md
└── 15-smart-pet-feeder.md
```

**Integration with Pitch Deck:**

- Category screen (Section 4): "View Full Story →" link opens hero product page
- Hero product pages can be:
  - Standalone markdown files in repo
  - Rendered as separate web pages (`/products/[slug]`)
  - Exported as PDF for sales materials
  - Used in email campaigns ("Product Spotlight of the Week")

**Translation:**

- All 15 hero product pages written in EN first
- Professional FR translation for complete bilingual parity
- Estimated word count: 500-800 words per page × 15 = 7,500-12,000 words total
- Translation cost: $1,500-$2,500 for premium quality

**Example: Video Doorbell Hero Page (First 200 words)**

---

# Video Door Bell Battery Powered
## See who's there. Before they knock.

Your front door just got smarter than ever. Crystal-clear video shows faces in vivid detail. Two-way audio lets you talk to visitors from anywhere. Motion alerts reach your phone the instant someone approaches. All without a single wire.

### Install Anywhere
No wiring means no electrician. Screw in. Pair with app. Done in five minutes. The rechargeable battery lasts six months between charges.

**Technical Foundation:**  
5200mAh lithium battery, USB-C charging, IPX4 weatherproof housing

### See Everything, Day or Night
Infrared night vision captures faces up to 30 feet away. HDR imaging adjusts for bright sunlight or shadowy porches. 170° diagonal field of view means no blind spots.

**Technical Foundation:**  
2K resolution (2048×1536), f/2.5 lens, automatic IR cut filter

### Talk to Anyone
Crystal-clear two-way audio with echo cancellation. Answer the door from the grocery store. Tell the delivery driver where to leave the package. Warn intruders they're being recorded.

[continues with B2B section, integrations, specs table...]

---

#### 2.3 Content Extraction Workplan

- [ ] Write all section copy (hook, pillar deep dives, category showcases, scenes, CTA)
- [ ] Compile product data for all 128 items (category, features, builder benefits, pricing tier)
- [ ] Script 5 automation scenes with product lists and savings calculations
- [ ] Create ROI calculator logic (input variables, formulas, outputs)
- [ ] Draft case studies (or create placeholder structure if real data unavailable)
- [ ] Source testimonials or write placeholder quotes
- [ ] Compile technical specs for downloadable resources

#### 2.3 Visual Design Direction

*See separate DesignSpec.md for full 4000-word design system*

**Key Principles:**
- **Glassmorphism UI** — Frosted glass cards, subtle shadows, depth
- **Animated Transitions** — Scroll-triggered reveals, number counters, product carousels
- **Brand Colors** — HeyZack blue (#243984) + pink (#E82F89) gradient
- **3D Product Renders** — Showcase hardware with interactive rotation
- **Data Visualizations** — Energy graphs, ROI charts, building dashboards
- **Mobile-Responsive** — Deck works on tablet for on-site presentations

---

### Phase 3: Pitch Experience Generator Skill Execution (Estimated: 4 hours)

#### 3.1 Skill Invocation Strategy

The `pitch-experience-generator` skill (located at `.vscode/pitch-experience-generator/`) expects specific inputs based on SKILL.md:

**Required Inputs:**
- Company/Product name: "HeyZack"
- One-sentence pitch: "AI-powered smart building platform for multifamily developers"
- Problem being solved: "Builders face $50K+ enterprise BMS costs or consumer DIY fragmentation"
- Target customer: "Apartment/condo builders and developers (50-500 unit projects)"
- Stage: **revenue** (assuming HeyZack has existing sales)
- Traction highlights: [Research needed — # of buildings deployed, revenue, partnerships]
- Funding ask: N/A (product showcase, not investor pitch)
- Team highlights: [Research needed — founders, advisors]

**Industry Detection:**
Based on SKILL.md table, HeyZack aligns with **"Hardware"**:
- Signals: "device", "units" (128 products, per-unit pricing)
- Focus: BOM (bill of materials), margins
- *Note:* Could also be "DeepTech" if emphasizing AI learning capabilities

**Skill Workflow (per SKILL.md):**

1. **Gather Inputs** — Compile all data above
2. **Industry Detection** — Confirm "Hardware" or "DeepTech" positioning with user
3. **Parallel Research** (3 threads):
   - Thread 1: Market Intelligence (smart building market size, growth, funding trends)
   - Thread 2: Competitive Landscape (BMS providers, proptech platforms, DIY competitors)
   - Thread 3: Narrative Strategy (emotional journey, proof points, objection rebuttals)
4. **Generate Files** — Output to `{company-name}-pitch/` directory:
   - Overview.md (narrative arc, emotional journey)
   - DesignSpec.md (design system, components, animations)
   - Tasks.md (build checklist)
   - research/ (market-intelligence.md, competitor-analysis.md)
   - content/ (narrative-arc.md, copy-blocks.md)
   - design/ (tokens.css)
5. **React Artifact** — Generate interactive preview

#### 3.2 Customizations for Product Showcase

**Standard Pitch Deck vs Product Showcase Differences:**

| Element | Standard Investor Pitch | Product Showcase (Our Goal) |
|---------|------------------------|----------------------------|
| **Focus** | Team, traction, market size, funding ask | Product capabilities, use cases, ROI, integration |
| **Audience** | VCs, angels, institutional investors | Builders, architects, property managers |
| **Metrics** | ARR, MRR, growth rate, CAC/LTV | Cost savings, payback period, installation time |
| **Proof** | Revenue charts, user growth, partnerships | Case studies, testimonials, category breadth |
| **CTA** | Investment commitment | Schedule demo, pilot project |

**Customization Tasks:**
- [ ] Modify `narrative-arc.md` template to emphasize product benefits over fundraising
- [ ] Replace "Team" section with "Installation & Support"
- [ ] Replace "Market Opportunity" with "Builder Benefits & ROI"
- [ ] Add "Category Showcase" section (not in standard pitch framework)
- [ ] Add "Connected Scenes" section (not in standard pitch framework)
- [ ] Remove/minimize "Funding Ask" section

#### 3.3 File Generation Checklist

Using pitch-experience-generator outputs as foundation:

- [ ] **Overview.md** (Executive summary, narrative arc, emotional journey)
  - Adapt "Problem" section for builder audience
  - Adapt "Solution" section to highlight 15 categories + 3 pillars
  - Add "Product Ecosystem" section mapping categories to use cases

- [ ] **DesignSpec.md** (Complete design system, component specs, animations)
  - *See separate 4000-word DesignSpec.md file*

- [ ] **Tasks.md** (Step-by-step build checklist)
  - Development environment setup
  - Component library integration (React + Tailwind + Framer Motion)
  - Section build order (hero → pillars → categories → scenes → CTA)
  - Interactive element implementation (ROI calculator, product carousels)
  - Performance optimization (lazy loading, image compression)
  - Testing & QA (cross-browser, mobile, accessibility)

- [ ] **research/market-intelligence.md**
  - Smart building market size (TAM/SAM/SOM)
  - Multifamily construction trends
  - Green building certification requirements (LEED, WELL, etc.)
  - Proptech investment trends

- [ ] **research/competitor-analysis.md**
  - Enterprise BMS providers (Honeywell, Johnson Controls, Schneider)
  - Proptech platforms (Latch, SmartRent, Homebase)
  - Consumer DIY (Ring/Amazon, Google Nest, Apple HomeKit)
  - Pricing, feature parity, market positioning

- [ ] **content/narrative-arc.md**
  - Emotional journey mapping (skepticism → curiosity → confidence → desire)
  - Proof point sequencing (problem amplification → solution reveal → benefit proof → social proof → CTA)
  - Objection handling (cost, installation complexity, vendor lock-in, interoperability)

- [ ] **content/copy-blocks.md**
  - All headline, subhead, body copy for 35-40 screens
  - Product descriptions (128 SKUs with builder-focused benefits)
  - Scene descriptions (5 automation scenarios with product lists)
  - CTA copy (demo request, resource downloads)

- [ ] **design/tokens.css**
  - HeyZack brand colors (primary blue, primary pink, black, grey)
  - Typography scale (headings, body, captions)
  - Spacing system (8px grid)
  - Animation timing functions
  - Glassmorphism styles (backdrop-filter, shadows, opacity)

---

### Phase 4: Visual Asset Sourcing & Creation (Estimated: 6 hours)

#### 4.1 Asset Inventory

**Required Assets:**

1. **Product Images** (128 SKUs)
   - *Source:* Existing product catalog likely has images
   - *Format:* High-res PNG with transparent backgrounds
   - *3D renders:* If available, use for interactive product carousels
   - *Task:* Export all product images from catalog, organize by category

2. **Hero Imagery**
   - Modern apartment building exterior (dusk, lights on)
   - Apartment interior (living room with visible smart devices)
   - Property management dashboard screenshot (energy monitoring)
   - *Source:* Stock photography (Unsplash, Pexels) or commission renders

3. **Infographic Elements**
   - 15 category icons (consistent style)
   - Automation scene flow diagrams
   - Energy savings charts/graphs
   - ROI calculator UI
   - *Source:* Design in Figma or use icon libraries (Heroicons, Lucide)

4. **Data Visualizations**
   - Energy consumption graph (monthly, per unit)
   - Cost comparison chart (HeyZack vs BMS vs DIY)
   - Installation timeline Gantt chart
   - Building system dashboard mockup
   - *Tool:* Create in Figma or use Chart.js for interactive versions

5. **Video/Animation**
   - Scene automation walkthrough (15-30 sec each, 5 scenes)
   - Product installation tutorial (time-lapse)
   - Building dashboard tour
   - *Option:* Use Lottie animations for lightweight web delivery

#### 4.2 Asset Creation Workflow

- [ ] **Audit existing assets** — Check HeyZack wiki, website, product catalog
- [ ] **Create asset request list** — Identify gaps (what needs to be designed/sourced)
- [ ] **Source stock imagery** — Apartment buildings, interiors, people using devices
- [ ] **Design category icons** — 15 consistent icons (line style or solid)
- [ ] **Build scene flow diagrams** — 5 automation sequences with product icons
- [ ] **Create data visualizations** — Energy/cost/ROI charts
- [ ] **Commission 3D renders** (if budget allows) — Key hero products (door lock, thermostat, gateway)
- [ ] **Export all assets** — Organized folder structure (by section, by type)

#### 4.3 Asset Optimization

- [ ] Image compression (WebP format, 80% quality)
- [ ] Responsive image sets (1x, 2x, 3x for retina)
- [ ] Lazy loading preparation (blur placeholders)
- [ ] SVG optimization (remove unnecessary metadata)
- [ ] Lottie animation export (if used)

---

### Phase 5: Development & Technical Implementation (Estimated: 14 hours)

*Note: This phase assumes technical resources available. If not, adjust plan for no-code tools (Webflow, Framer) or outsource development.*

#### 5.1 Technology Stack

**Recommended Stack (per pitch-experience-generator SKILL.md):**

- **Framework:** React 18+
- **Styling:** Tailwind CSS + custom design tokens
- **Animations:** Framer Motion (scroll-triggered, page transitions)
- **UI Components:** shadcn/ui (buttons, cards, forms)
- **Scroll Library:** react-scroll or Locomotive Scroll (smooth scrolling, parallax)
- **Charts:** Recharts or Chart.js (interactive data visualizations)
- **Internationalization:** react-i18next or next-intl (EN/FR language switching)
- **Deployment:** Vercel or Netlify (static hosting, CI/CD)

**Alternative No-Code Stack:**

- **Tool:** Framer (built-in animations, CMS, hosting)
- **Advantages:** Faster development, no coding required, drag-and-drop
- **Limitations:** Less customization, harder to integrate complex logic (ROI calculator)

#### 5.2 Development Phases

**Phase 5.2.1: Environment Setup**

- [ ] Initialize React project (`npx create-react-app` or `vite`)
- [ ] Install dependencies (Tailwind, Framer Motion, shadcn/ui, Recharts, react-i18next)
- [ ] Configure Tailwind with HeyZack design tokens
- [ ] Set up folder structure (components, sections, assets, data, locales)
- [ ] Configure i18n (EN/FR translation files in locales/ folder)
- [ ] Configure deployment pipeline (Vercel/Netlify)

**Phase 5.2.2: Component Library**

- [ ] Build reusable components:
  - `<SectionContainer>` — Full-height scroll sections
  - `<AnimatedHeadline>` — Fade-in text with stagger
  - `<ProductSpotlight>` — Large hero product with detailed specs (single product focus, not carousel)
  - `<CategoryModal>` — Expandable "View Full Category" overlay showing all products
  - `<SceneTimeline>` — Animated automation sequence
  - `<ROICalculator>` — Interactive input form + results
  - `<StatCounter>` — Animated number counting
  - `<TestimonialCard>` — Quote, headshot, attribution
  - `<CTAButton>` — Primary/secondary button styles
  - `<LanguageToggle>` — EN/FR flag switcher (top-right, sticky)

**Phase 5.2.3: Section Build (Sequential)**

Build in order of user flow:

- [ ] **Section 1: Hero** (2 screens)
  - Hero background video/image
  - Headline with gradient text effect
  - Scroll indicator animation

- [ ] **Section 2: Solution Overview** (3 screens)
  - Animated icon grid (15 categories → HeyZack logo)
  - Stats counter grid
  - Ecosystem floor plan (interactive)

- [ ] **Section 3: Pillar Deep Dives** (9 screens)
  - Pillar intro cards (scroll-triggered reveal)
  - Proof point layouts (side-by-side comparisons)
  - Product spotlight embeds (image + specs)

- [ ] **Section 4: Category Showcase** (15 screens)
  - Category page template (reusable, one hero product per screen)
  - Product spotlight component (large image + detailed specs)
  - "View Full Category" modal (all products in category)
  - Integration callout boxes
  - Language toggle integration (all copy translatable)

- [ ] **Section 5: Connected Scenes** (5 screens)
  - Scene intro timeline
  - Animated scene walkthroughs
  - Product list with links

- [ ] **Section 6: Builder Benefits** (4 screens)
  - ROI calculator (functional logic)
  - Installation timeline Gantt chart
  - Future-proof guarantee timeline
  - Partner program cards

- [ ] **Section 7: Social Proof** (2 screens)
  - Case study cards (hover effects)
  - Testimonial carousel

- [ ] **Section 8: CTA** (2 screens)
  - Next steps process diagram
  - Contact form (integrate with email service)
  - Resource download grid

**Phase 5.2.4: Interactive Elements**

- [ ] **ROI Calculator Logic:**
  - Input fields: # units, market segment, common areas (Y/N)
  - Calculation formulas:
    - System cost = (base cost per unit * # units) + (common area cost if Y)
    - Annual savings = (energy savings per unit * # units) + (operational cost reduction)
    - Payback period = system cost / annual savings
    - 5-year NPV = (annual savings * 5) - system cost
  - Output display: Formatted currency, formatted years

- [ ] **Product Carousel Interactions:**
  - Swipe/drag navigation
  - Thumbnail navigation
  - Product detail modal (click to expand)

- [ ] **Scene Animations:**
  - Step-by-step timeline animation (triggered on scroll)
  - Product icon pop-ins
  - Connecting lines between products

**Phase 5.2.5: Performance Optimization**

- [ ] Lazy load images (below fold)
- [ ] Code splitting (by section)
- [ ] Preload critical assets (hero image, fonts)
- [ ] Compress images (WebP, responsive)
- [ ] Minify CSS/JS
- [ ] Enable CDN caching

#### 5.3 Data Management

**Approach:** Store product data, scene definitions, copy in structured JSON/YAML files (not hardcoded).

**Data Files:**

- `data/products.json` — All 128 products with specs, images, categories
- `data/categories.json` — 15 categories with descriptions, hero product ID, full product lists
- `data/hero-products.json` — 15 hero products (one per category) with detailed showcase data
- `data/scenes.json` — 5 automation scenes with steps, products, savings
- `data/testimonials.json` — Case studies, quotes, attribution
- `locales/en/copy.json` — All EN text (headlines, subheads, body copy, UI labels)
- `locales/fr/copy.json` — All FR translations (complete parallel structure)

**Benefits:**
- Easy content updates (no code changes)
- Reusable data across sections (product mentioned in multiple places)
- Potential CMS integration later (Sanity, Contentful)

---

### Phase 6: Content Population & QA (Estimated: 6 hours)

#### 6.1 Content Import

- [ ] Export product data from `product_catalog.json` to `data/products.json` (transform if needed)
- [ ] Identify 15 hero products (one per category, representative of category value)
- [ ] Create `data/hero-products.json` with detailed showcase content for each hero product
- [ ] Populate EN copy in `locales/en/copy.json`
- [ ] Translate all content to FR in `locales/fr/copy.json` (use DeepL or professional translation)
- [ ] Add scene definitions to `data/scenes.json`
- [ ] Import testimonials/case studies (or use placeholders)

#### 6.2 Quality Assurance

**Content QA:**
- [ ] Proofread all EN copy (spelling, grammar, tone)
- [ ] Proofread all FR copy (accuracy, natural phrasing, not machine-translated feel)
- [ ] Verify product specs accuracy (cross-check with catalog)
- [ ] Check pricing consistency (if displayed)
- [ ] Ensure builder-focused messaging (not consumer language)
- [ ] Validate ROI calculator math (spot-check calculations)
- [ ] Test language toggle (all content switches correctly, no missing translations)

**Technical QA:**
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile responsiveness (iOS/Android, tablet)
- [ ] Scroll performance (smooth, no jank)
- [ ] Animation timing (not too fast/slow)
- [ ] Interactive elements (ROI calc, category modals, product spotlights)
- [ ] Language switching (instant, no page reload, preserves scroll position)
- [ ] Form submission (test contact form integration)
- [ ] Link checking (all internal/external links work)

**Accessibility QA:**
- [ ] Keyboard navigation (all interactive elements)
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Color contrast ratios (WCAG AA minimum)
- [ ] Alt text for images
- [ ] ARIA labels for interactive elements

#### 6.3 User Testing (Optional)

If time allows, conduct user testing with 2-3 builder/developer personas:

- **Participants:** Real estate developers, architects, property managers
- **Tasks:**
  - "Find information about door lock products"
  - "Calculate ROI for your typical project size"
  - "Identify which automation scene is most relevant to you"
- **Feedback:** Navigation clarity, content relevance, missing information
- **Iterate:** Make adjustments based on feedback

---

### Phase 7: Deployment & Distribution (Estimated: 2 hours)

#### 7.1 Hosting & Deployment

**Recommended Host:** Vercel or Netlify (free tier sufficient)

**Deployment Steps:**
- [ ] Connect GitHub repo to Vercel/Netlify
- [ ] Configure build settings (React build command)
- [ ] Set custom domain (e.g., `builders.heyzack.ai` or `showcase.heyzack.ai`)
- [ ] Enable HTTPS (automatic with Vercel/Netlify)
- [ ] Configure analytics (Vercel Analytics or Google Analytics)

**Alternative: Self-Hosted**
- [ ] Export static build (`npm run build`)
- [ ] Upload to HeyZack server
- [ ] Configure web server (Nginx/Apache)
- [ ] Set up SSL certificate (Let's Encrypt)

#### 7.2 Distribution Strategy

**Primary Channels:**

1. **Sales Enablement**
   - Send deck link to all sales reps
   - Add to sales proposal templates
   - Create PDF version for email attachments
   - Train sales team on deck narrative

2. **Partner Enablement**
   - Share with architect/design partners
   - Add to partner portal
   - Create partner-specific landing page with tracking

3. **Event Presentations**
   - Multifamily conferences (NMHC, ULI)
   - Green building events (Greenbuild, USGBC)
   - Builder trade shows (NAHB International Builders Show)

4. **Inbound Marketing**
   - Add CTA on HeyZack website ("See Builder Showcase")
   - Link from B2B campaign ads
   - Feature in email nurture sequences

5. **Investor/Press (Secondary)**
   - Include in investor updates
   - Share with trade press (Multi-Housing News, Commercial Property Executive)

#### 7.3 Analytics & Tracking

**Metrics to Track:**

- [ ] **Engagement:**
  - Unique visitors
  - Average time on site
  - Scroll depth (which sections reached)
  - Interaction rate (ROI calc, carousels, modals)

- [ ] **Conversion:**
  - Contact form submissions
  - Resource downloads (PDF catalog, ROI Excel)
  - Demo requests
  - Referral source (ads, email, organic)

- [ ] **Content Performance:**
  - Most viewed product categories
  - Most interacted scenes
  - Drop-off points (where users leave)

**Tools:**
- Vercel Analytics (built-in)
- Google Analytics 4 (custom events)
- Hotjar (session recordings, heatmaps)

---

### Phase 8: Iteration & Maintenance (Ongoing)

#### 8.1 Feedback Collection

- [ ] Add "Feedback" CTA button (embedded form or email link)
- [ ] Survey sales reps after 2 weeks (what questions do builders ask?)
- [ ] Track contact form submissions (what information are they requesting?)
- [ ] Monitor analytics (where do users drop off?)

#### 8.2 Content Updates

**Quarterly Reviews:**
- [ ] Update product catalog (new releases, discontinued items)
- [ ] Refresh case studies (add new builder testimonials)
- [ ] Update pricing (if changed)
- [ ] Revise ROI calculator assumptions (energy costs, installation times)
- [ ] Add seasonal messaging (e.g., "Pre-construction planning season")

**As-Needed Updates:**
- [ ] Add new automation scenes (as developed by product team)
- [ ] Update competitive intelligence (new competitors, pricing changes)
- [ ] Refresh visual assets (better product photos, updated dashboards)

#### 8.3 Repurposing Content

**Derivative Deliverables:**

- **PDF Deck:** Static version for email/print
- **Video Walkthrough:** Screen recording with voice-over narration
- **Category One-Pagers:** Individual PDFs for each of 15 categories
- **Scene Explainer Videos:** 15-30 sec clips for social media
- **ROI Calculator Standalone:** Embeddable widget for website
- **BIM Models:** Revit families for each product (architect resource)

---

## SUCCESS METRICS

### Phase Completion Metrics

| Phase | Deliverable | Success Criteria |
|-------|------------|------------------|
| Phase 1 | Content research complete | 3 pillars validated, 15 categories mapped, 5 scenes scripted |
| Phase 2 | Content architecture finalized | 35-40 screen outline, copy drafted for all sections |
| Phase 3 | Skill execution complete | Overview.md, DesignSpec.md, Tasks.md, research files generated |
| Phase 4 | Visual assets ready | All product images, icons, charts exported and optimized |
| Phase 5 | Development complete | All 8 sections built, interactive elements functional |
| Phase 6 | QA passed | Content proofed, technical testing passed, accessibility compliant |
| Phase 7 | Deployed | Live URL, analytics configured, distributed to sales team |
| Phase 8 | Iteration plan | Feedback process established, quarterly update schedule set |

### Business Impact Metrics (3-6 months post-launch)

- **Sales Cycle:** Reduce average sales cycle by 20% (from first contact to contract)
- **Demo Requests:** Increase demo requests from builders by 50%
- **Partner Engagement:** 10+ architecture/design firms register for partner program
- **Event Performance:** 100+ booth visits at target trade shows with deck demos
- **Content Engagement:** 500+ unique visitors, 8+ minute average session duration
- **Conversion:** 5% contact form submission rate from deck visitors

---

## RISKS & MITIGATION

### Risk 1: Incomplete Product Data

**Risk:** Product catalog may be missing pricing, availability, or technical specs for all 128 SKUs.

**Mitigation:**
- Audit catalog early in Phase 1
- Use tiered approach: "Hero products" (complete data) vs "Secondary products" (basic info)
- Work with HeyZack product team to fill gaps
- Use "Contact for pricing" for items without public pricing

### Risk 2: Lack of Real Case Studies

**Risk:** HeyZack may not have deployed in 50+ unit buildings yet (limited B2B traction).

**Mitigation:**
- Create "pilot program" case studies (even 1-10 units)
- Use "projected ROI" instead of "proven results"
- Cite industry benchmarks (not HeyZack-specific data)
- Offer "First Mover Program" for builders willing to be beta customers

### Risk 3: Technical Complexity

**Risk:** Full React development may exceed available resources/timeline.

**Mitigation:**
- **Option A:** Use Framer (no-code) instead of custom React build
- **Option B:** MVP version first (simplified animations, fewer interactive elements)
- **Option C:** Outsource development to agency/freelancer
- **Option D:** Use Webflow or similar website builder (compromise on some interactivity)

### Risk 4: Asset Quality

**Risk:** Existing product images may be low-resolution or inconsistent style.

**Mitigation:**
- Commission 3D renders for "hero products" only (10-15 items)
- Use stock photography + product silhouettes for category showcases
- Prioritize consistency (same lighting, angles) over photorealism
- Phase asset upgrades (launch with good-enough, improve over time)

### Risk 5: Content Accuracy

**Risk:** Energy savings, ROI projections, pricing may be challenged by builders.

**Mitigation:**
- Add disclaimers ("Based on average usage patterns", "Results may vary")
- Cite sources for industry benchmarks (DOE, ENERGY STAR, etc.)
- Offer "custom ROI analysis" CTA (instead of one-size-fits-all calculator)
- Legal review of all claims (avoid "guaranteed savings" language)

---

## RESOURCE REQUIREMENTS

### Personnel

| Role | Time Commitment | Responsibilities |
|------|----------------|------------------|
| **Content Strategist** | 24 hours | Phase 1-2 (research, narrative design, hero product outlines) |
| **Copywriter (EN)** | 28 hours | Write all copy for 35-40 screens + 15 hero product pages (500-800 words each) |
| **Translator (FR)** | 20 hours | Translate all content EN→FR (pitch deck + 15 hero pages ~12K words total) |
| **Product Specialist (HeyZack)** | 12 hours | Validate product data, select 15 hero products, review technical accuracy of hero pages |
| **Graphic Designer** | 12 hours | Icons, infographics, data visualizations |
| **3D Artist (Optional)** | 20 hours | Product renders for 15 hero products |
| **Front-End Developer** | 48 hours | React build, animations, interactivity, i18n integration, hero product page templates |
| **QA Tester** | 12 hours | Cross-browser, accessibility, content proofing, FR testing, hero page review |
| **Project Manager** | 12 hours | Coordination, timeline management, content review cycles |

**Total Estimated Hours: 168 hours (without 3D artist) or 188 hours (with 3D artist)**  
**Previous:** 144 hours  
**Increase:** +24 hours for hero product feature page development

### Tools & Software

- **Design:** Figma ($15/month, 1 seat)
- **Development:** VS Code (free), Node.js (free), Vercel (free tier)
- **Stock Assets:** Unsplash/Pexels (free) or iStock ($200 budget)
- **3D Rendering (Optional):** Blender (free) or Cinema 4D ($60/month)
- **Analytics:** Vercel Analytics (free) + Google Analytics (free)
- **Project Management:** Notion (free) or Asana (free tier)

**Estimated Tool Costs: $15-$75/month (without 3D software)**

### External Resources (Optional)

- **3D Artist:** $1,500-$4,500 (15 hero product renders at $100-300 each)
- **Freelance Developer:** $4,000-$10,000 (full React build + i18n + hero product page system)
- **Copywriter (Pitch Deck):** $1,500-$3,000 (all EN copy for 35-40 screens)
- **Copywriter (Hero Products):** $2,500-$5,000 (15 Apple-quality product pages at $150-350 each)
- **Professional Translator:** $1,200-$2,500 (EN→FR translation, ~12,000 words including hero pages)
- **Video Production:** $2,000-$5,000 (scene animations)

**Total External Budget Range: $0 (DIY) to $30,000 (fully outsourced with professional copywriting, translation, and 3D renders)**  
**Previous:** $0 to $23,000  
**Increase:** +$7,000 for premium hero product copywriting

---

## TIMELINE

### Aggressive Timeline (4 weeks)

| Week | Phases | Key Milestones |
|------|--------|----------------|
| **Week 1** | Phase 1 + Phase 2 | Research complete, narrative designed, copy drafted |
| **Week 2** | Phase 3 + Phase 4 | Skill executed, assets sourced/created |
| **Week 3** | Phase 5 | Development complete (all sections built) |
| **Week 4** | Phase 6 + Phase 7 | QA, deploy, distribute |

### Realistic Timeline (8 weeks)

| Week | Phases | Key Milestones |
|------|--------|----------------|
| **Week 1-2** | Phase 1 | Deep research, pillar validation, category mapping |
| **Week 3-4** | Phase 2 | Content architecture, full copy draft, **15 hero product pages drafted** |
| **Week 5** | Phase 3 | Skill execution, file generation |
| **Week 6** | Phase 4 | Visual asset creation (icons, charts, 3D renders) |
| **Week 7-8** | Phase 5 | Development (sections, components, interactive elements, **hero product page templates**) |
| **Week 9** | Phase 6 + Phase 7 | QA, deployment, distribution |

### Conservative Timeline (12 weeks)

Adds buffer for:
- Stakeholder reviews (2 weeks)
- Asset commissioning (3D renders, video)
- User testing (1 week)
- Iteration based on feedback (1 week)

---

## NEXT STEPS

### Immediate Actions (Before Starting)

1. **[ ] Confirm Project Scope with Stakeholders**
   - Review this plan with HeyZack team
   - Align on timeline (4, 8, or 12 weeks)
   - Confirm budget (DIY vs outsourced development)
   - Approve 3 benefit pillars (once identified)

2. **[ ] Resource Allocation**
   - Assign personnel to roles
   - Reserve designer/developer time
   - Set up project management workspace (Notion, Asana)

3. **[ ] Data Audit**
   - Export full `product_catalog.json` for review
   - Identify missing product data (pricing, specs, images)
   - Confirm case study availability (or plan alternatives)

4. **[ ] Tool Setup**
   - Create Figma workspace for design
   - Set up GitHub repo for development
   - Configure Vercel/Netlify account for deployment

### Decision Points (Requires Stakeholder Input)

- **[ ] Industry Positioning:** Hardware or DeepTech? (affects pitch-experience-generator workflow)
- **[ ] Development Approach:** Custom React vs Framer/Webflow?
- **[ ] Asset Investment:** Commission 3D renders? ($1K-3K)
- **[ ] Testimonials:** Use real case studies or placeholder content?
- **[ ] Pricing Display:** Show pricing in deck or use "Contact for Quote"?

### Phase 1 Kickoff (Day 1)

- [ ] Review all 57 wiki markdown files
- [ ] Analyze product_catalog.json
- [ ] Begin 3 pillar extraction research
- [ ] Map product categories to builder use cases
- [ ] Initiate competitive intelligence gathering

---

## APPENDICES

### Appendix A: Product Category Summary (from product_catalog.json)

| # | Category Name | Product Count | Sample Products | Builder Use Case |
|---|---------------|---------------|-----------------|------------------|
| 1 | Camera and Doorbell | 9 | Video Doorbell (battery), Indoor Camera, Outdoor Solar Camera | Entry security, common area surveillance |
| 2 | Smart Sensors | 13 | Motion sensor, Door/window sensor, Water leak sensor | Security, safety, maintenance alerts |
| 3 | Smart Control Panel | 6 | Scene switch (2/4/6 button), Touch panel | Central control, automation triggers |
| 4 | Smart Switch | 5 | Dimmer switch, Relay switch, Touch switch | Lighting control, energy management |
| 5 | Smart DIY Breaker | 5 | Circuit breaker with monitoring | Energy tracking, safety, load management |
| 6 | Smart Climatisation | 14 | Thermostat, HVAC controller, Fan controller | Climate control, energy savings |
| 7 | Smart Music Control System | 3 | Multi-zone audio controller | Amenity spaces, luxury units |
| 8 | Smart Door Lock | 10 | Fingerprint lock, PIN lock, Face recognition lock | Unit entry, access control |
| 9 | Smart Door Lock Body | 3 | Lock mechanisms (Mortise, Cylindrical) | Hardware for door lock systems |
| 10 | Smart Circuit Breaker | 2 | Whole-home energy monitoring breaker | Portfolio-level energy analytics |
| 11 | Smart Gateway | 4 | Zigbee hub, Matter hub, WiFi hub | Central hub, device communication |
| 12 | Curtain, Shutter and Garage Door Controllers | 29 | Curtain motor, Shutter motor, Garage controller | Window automation, garage access |
| 13 | Smart Lighting System and Dimming Controller | 18 | LED bulbs, Strip lights, Dimmers | Lighting control, ambiance, energy |
| 14 | Smart Accessories | 5 | Remote control, Siren alarm, Buttons | User interface, alerts, convenience |
| 15 | Pet Accessories | 2 | Smart feeder, Pet camera | Pet-friendly units (differentiation) |

### Appendix B: Messaging Framework Excerpts (from messaging-framework.md)

**Universal Value Proposition:**
> "AI-powered building automation that actually learns—one app, no subscriptions, real savings."

**B2B Value Proposition:**
> "Portfolio-Scale Control at 95% Lower Cost. One dashboard. No vendor lock-in. Proven ROI."

**B2B Supporting Points:**
1. Portfolio Centralization — Manage unlimited properties from one dashboard
2. 95% Cost Reduction — $2K-$8K vs $50K-$85K traditional BMS
3. Zero Vendor Lock-In — DIY changes, no $200/hour service calls
4. Transparent ROI — Real-time energy analytics with dollar savings
5. 2-Hour Onboarding — New property setup in hours, not months

**Proof Points (B2B):**
- Operating cost reduction: 20-30%
- Retrofit installation: 30-minute per unit
- System cost: $2K-$8K vs $50K-$85K BMS
- Portfolio management: Unlimited properties, one dashboard

### Appendix C: Persona Summary (Builder-Adjacent)

While wiki contains B2C personas (Energy-Conscious Emma) and B2B personas (Hospitality Hugo for hotel managers), the **builder persona** will need to be synthesized:

**"Developer Dan" (Hypothetical Builder Persona):**
- **Role:** VP of Development, mid-sized multifamily builder (50-200 unit projects)
- **Challenges:** Rising construction costs, competitive rental market, ESG investor pressure
- **Goals:** Differentiate properties, reduce operating expenses, achieve green certifications
- **Decision Criteria:** ROI, installation simplicity, tenant appeal, future-proof
- **Objections:** "Too expensive", "Installation delays construction", "Tenants won't use it"

### Appendix D: Branding Documentation Analyzed

**Content Sources Used for Hero Product Copywriting:**

1. **voice-tone.md** — Complete voice & tone guidelines
   - Core brand voice: Direct, confident, helpful, transparent, knowledgeable
   - B2B voice: "The Helpful Peer" (experienced property operator sharing insights)
   - B2C voice: "The Knowledgeable Friend" (smart home enthusiast who figured it out)
   - Language rules (DO/DON'T examples for every context)
   - Emotional targets per audience
   - Empathy statements for common pain points

2. **positioning.md** — Strategic positioning framework
   - Brand aspiration: "Tesla of building automation" (B2B), "Sonos of smart homes" (B2C)
   - Points of difference vs. competitors
   - Value logic (ROI metrics, payback periods)
   - Usage environments and user types
   - Category positioning comparisons

3. **messaging-framework.md** — Master messaging document
   - Core value proposition: "AI-powered building automation that actually learns—one app, no subscriptions, real savings"
   - B2B messaging: Portfolio-scale control, 95% cost reduction, zero vendor lock-in
   - B2C messaging: Unified control, genuine AI, real savings, no subscription tax
   - Proof points with specific metrics
   - Objection handling frameworks

4. **product_catalog.json** — Existing product descriptions
   - All 128 products with benefit-driven copy
   - Specs formatted consistently
   - Keywords for SEO
   - Existing voice patterns to maintain consistency

5. **voice-b2b.md** — B2B-specific voice guidelines
   - ROI specificity examples
   - Operational reality language
   - Peer-to-peer credibility signals
   - Industry terminology reference

6. **voice-b2c.md** — B2C-specific voice guidelines
   - Benefit clarity examples
   - Relatable problem framing
   - Honest simplicity language
   - Consumer-friendly terminology

**Key Insights Applied to Hero Product Pages:**

- **No Marketing Fluff:** "Revolutionary" → "Works reliably for years"
- **Specific Numbers:** "Significant savings" → "28% lower utility bills"
- **Benefit → Technical:** Lead with what it does for you, then how it does it
- **Problem Awareness:** Acknowledge past frustrations ("You've been burned before")
- **Dual Audience:** Every page serves B2B (builders) and B2C (homeowners)
- **Apple Cadence:** Short sentences. Declarative. Present tense. Active voice.

### Appendix E: References & Sources

- `product_catalog.json` — Product data source
- `src/content/docs/heyzackv2/messaging/messaging-framework.md` — Messaging reference
- `src/content/docs/heyzackv2/personas/*` — Persona profiles
- `.vscode/pitch-experience-generator/SKILL.md` — Pitch generator workflow
- HeyZack website: https://heyzack.ai/ — Brand identity, public messaging
- Pitch-experience-generator references folder (to be reviewed)

### Appendix E: Glossary

- **BMS:** Building Management System (traditional enterprise solution)
- **BOM:** Bill of Materials (hardware cost breakdown)
- **Cap Rate:** Capitalization Rate (real estate investment metric)
- **LEED:** Leadership in Energy and Environmental Design (green building cert)
- **Matter:** Smart home interoperability protocol
- **Multifamily:** Apartment buildings, condos (5+ units)
- **NOI:** Net Operating Income (revenue - operating expenses)
- **Proptech:** Property Technology (software/hardware for real estate)
- **ROI:** Return on Investment
- **TAM/SAM/SOM:** Total/Serviceable/Serviceable Obtainable Market
- **Zigbee:** Wireless mesh networking protocol for smart devices

---

## WORKPLAN SUMMARY (Checklist)

### Phase 1: Content Research & Synthesis
- [ ] Analyze all 57 wiki files
- [ ] Extract and validate 3 benefit pillars
- [ ] Map 15 categories to builder use cases
- [ ] Script 5 automation scenes
- [ ] Conduct competitive intelligence research
- [ ] Compile quantitative claims/proof points

### Phase 2: Content Architecture & Narrative Design
- [ ] Design 35-40 screen pitch deck structure
- [ ] Write all section copy (hook, pillars, categories, scenes, CTA)
- [ ] **Write 15 hero product feature pages (Apple-quality, 500-800 words each)**
- [ ] **Extract insights from branding docs (voice-tone, positioning, messaging)**
- [ ] **Ensure unique, non-repetitive copy across all 15 hero pages**
- [ ] Define visual design direction
- [ ] Create content extraction checklist

### Phase 3: Pitch Experience Generator Skill Execution
- [ ] Gather required inputs for skill
- [ ] Confirm industry detection (Hardware vs DeepTech)
- [ ] Execute parallel research threads (market, competitive, narrative)
- [ ] Generate Overview.md, DesignSpec.md, Tasks.md, research files
- [ ] Customize output for product showcase (not investor pitch)

### Phase 4: Visual Asset Sourcing & Creation
- [ ] Audit existing assets
- [ ] Source stock imagery
- [ ] Design 15 category icons
- [ ] Create scene flow diagrams
- [ ] Build data visualizations
- [ ] Optimize all assets (compression, responsive)

### Phase 5: Development & Technical Implementation
- [ ] Set up development environment
- [ ] Build component library
- [ ] Implement 8 sections sequentially
- [ ] **Build hero product page template system (route: `/products/[slug]`)**
- [ ] Add interactive elements (ROI calculator, carousels)
- [ ] Optimize performance (lazy loading, code splitting)
- [ ] Structure data management (JSON files)

### Phase 6: Content Population & QA
- [ ] Import product data
- [ ] Populate all copy fields
- [ ] **Import 15 hero product markdown files into CMS/data layer**
- [ ] Content QA (proofread, accuracy)
- [ ] **Hero page QA (unique copy, no repetition, brand voice consistency)**
- [ ] Technical QA (cross-browser, mobile, accessibility)
- [ ] User testing (optional)

### Phase 7: Deployment & Distribution
- [ ] Deploy to Vercel/Netlify
- [ ] Configure custom domain
- [ ] Set up analytics
- [ ] Distribute to sales team, partners, events
- [ ] Create PDF version

### Phase 8: Iteration & Maintenance
- [ ] Collect feedback (sales reps, builders)
- [ ] Quarterly content updates
- [ ] Repurpose content (PDFs, videos, widgets)
- [ ] Monitor analytics and optimize

---

**Plan Version:** 1.2  
**Created:** 2026-01-26  
**Last Updated:** 2026-01-26 (Added 15 hero product feature pages, Apple-quality copywriting section)  
**Next Review:** After branding doc analysis and hero product copywriting sample approval  
**Owner:** [To be assigned]  
**Estimated Total Effort:** 168-188 hours over 4-12 weeks  
**Status:** ✅ DRAFT COMPLETE — Includes hero product feature page strategy, ready for stakeholder review and Phase 1 kickoff decision
