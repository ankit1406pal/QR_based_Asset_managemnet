# Design Guidelines: Visual Search for New Homeowners

## Design Approach
**Reference-Based Approach** drawing inspiration from Pinterest's visual discovery, Airbnb's sophisticated home aesthetics, and Houzz's product browsing patterns. This creates an image-first, discovery-focused experience that prioritizes visual appeal and intuitive exploration.

## Core Design Principles
1. **Visual Supremacy**: Images are the primary navigation and discovery mechanism
2. **Effortless Exploration**: Minimize cognitive load through visual patterns over text
3. **Aspiration & Trust**: Sophisticated aesthetics that inspire confidence in new homeowners
4. **Seamless Flow**: Smooth transitions create fluid product discovery journey

## Typography System
- **Primary Font**: Inter or DM Sans (Google Fonts) - clean, modern sans-serif for UI
- **Display Font**: Playfair Display or Cormorant Garamond for hero headlines - adds sophistication
- **Hierarchy**:
  - Hero headline: 4xl to 6xl, display font, font-medium
  - Section titles: 2xl to 3xl, primary font, font-semibold
  - Product names: lg to xl, primary font, font-medium
  - Body text: base, primary font, font-normal
  - Labels/metadata: sm, primary font, font-medium

## Layout System
**Spacing primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Micro spacing (gaps, padding): 2, 4, 6
- Component spacing: 8, 12, 16
- Section spacing: 20, 24, 32 (py-20 desktop, py-12 mobile)

**Grid Strategy**:
- Masonry/Pinterest-style grid for product discovery
- 1 column mobile, 2-3 columns tablet, 3-4 columns desktop
- Asymmetric heights based on image aspect ratios

## Component Library

### Hero Section
- Full-viewport immersive hero with large background image showing beautifully styled home interior
- Centered overlay content with blurred background container for text/CTA
- Headline: "Find Your Perfect Home Products Through Photos"
- Subtext explaining visual search capability
- Primary CTA: Upload photo button with camera icon
- Smooth fade-in animation on load (0.8s ease)

### Visual Search Upload Interface
- Large drag-and-drop zone with dashed border and subtle hover state
- Camera capture option for mobile users
- Example thumbnails showing "Try searching with these" sample images
- Instant visual feedback on upload with smooth scale animation

### Room Category Navigation
- Horizontal scrolling card carousel below hero
- Cards: Kitchen, Bedroom, Bathroom, Living Room, Dining, Outdoor
- Each card: Full-bleed category image (400x300px), overlay label, subtle zoom on hover
- Smooth scroll behavior with momentum

### Product Grid (Search Results)
- Masonry layout with varying card heights
- Each card: Product image fills card, overlay gradient from bottom with product name and price
- Hover: Subtle lift (translate-y-1), overlay darkens slightly to reveal "View Details" 
- Cards have rounded corners (rounded-lg)

### Product Detail Modal/Page
- Large hero image carousel (3-5 images) with smooth slide transitions
- Image thumbnails below for quick navigation
- Right column: Product name, price, description, "Shop Now" CTA
- Related products section below with 4-column grid

### AI-Powered Similar Products Section
- "Products matching your photo" headline
- 3-4 column grid of visually similar items
- Confidence indicator (subtle opacity or border styling)

### Feature Highlights Section
- 3-column grid showcasing key features
- Icons from Heroicons (camera, sparkles, home icons)
- Title + brief description for each: "Visual Search", "AI-Powered", "Curated Selection"
- Spacing: gap-8 between cards, p-8 within cards

## Animations & Interactions
**Micro-interactions** (subtle, purposeful only):
- Fade-in on scroll for sections (0.6s ease, triggered once)
- Card hover: transform scale(1.02) with 0.2s ease
- Upload zone: pulsing border on drag-over
- Product carousel: smooth slide with 0.4s cubic-bezier

**Prohibited**: Continuous animations, parallax backgrounds, excessive motion

## Navigation
- Fixed header: Logo left, "Browse by Room" center, "Upload Photo" CTA right
- Transparent on hero, solid background on scroll with smooth backdrop-blur
- Mobile: Hamburger menu with slide-in drawer

## Footer
- 3-column layout: About + Quick Links + Newsletter signup
- Social icons (Instagram, Pinterest appropriate for visual platform)
- Trust indicators: "AI-Powered Search" badge

## Images

### Required Images:
1. **Hero Background** (1920x1080): Beautiful, aspirational modern home interior - bright, airy living room with designer furniture, soft natural lighting, styled shelves
2. **Category Cards** (400x300 each): 
   - Kitchen: Modern kitchen with pendant lights, marble countertops
   - Bedroom: Cozy bed with layered textiles, nightstand styling
   - Bathroom: Spa-like bathroom with plants, natural materials
   - Living Room: Inviting space with sofa, coffee table, art
   - Dining: Elegant table setting with chairs
   - Outdoor: Patio furniture, plants, outdoor living
3. **Product Images** (Variable aspect ratios for masonry): Mix of furniture, decor, lighting, textiles - all professionally photographed with white/neutral backgrounds
4. **Sample Search Images** (200x200): 3-4 example product photos users can click to try the search

**Hero Image**: Yes, large immersive hero image is central to the design.