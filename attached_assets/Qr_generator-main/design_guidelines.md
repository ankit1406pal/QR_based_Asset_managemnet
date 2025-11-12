# IT Asset Buyback Tracking System - Design Guidelines

## Design Approach

**Selected Approach:** Design System - Material Design Adaptation

This utility-focused application prioritizes efficiency, data clarity, and learnability for IT team workflows. Material Design provides the structured foundation needed for form-heavy, information-dense interfaces while maintaining professional polish.

**Core Principles:**
- Clear information hierarchy for quick data scanning
- Efficient form workflows with minimal friction
- Scannable dashboard layouts for asset tracking
- Mobile-responsive for field scanning scenarios

## Typography

**Font Family:** Inter (Google Fonts) for optimal readability in data-dense interfaces

**Hierarchy:**
- Page Titles: text-3xl, font-semibold
- Section Headers: text-xl, font-semibold
- Card Titles: text-lg, font-medium
- Body Text: text-base, font-normal
- Labels: text-sm, font-medium
- Helper Text: text-xs, font-normal

## Layout System

**Spacing Scale:** Tailwind units of 3, 4, 6, 8, 12 for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: space-y-6 to space-y-8
- Form field gaps: gap-4 to gap-6

**Container Structure:**
- Max-width: max-w-6xl for dashboard views
- Max-width: max-w-2xl for form-centric pages
- Grid layouts: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for asset cards

## Component Library

### Navigation
**Top App Bar:**
- Fixed header with application title "IT Asset Buyback Manager"
- Right-aligned navigation: Dashboard, New Asset, Scan QR
- Icon library: Heroicons (outline style)
- Height: h-16 with px-6 horizontal padding

### Asset Submission Form
**Structure:**
- Card-based container with rounded-lg borders
- Two-column layout on desktop (grid-cols-2), single on mobile
- Form fields in vertical rhythm with space-y-4
- Field grouping with logical sections

**Input Fields:**
- Text inputs with border, rounded-md, px-4 py-3
- Labels above inputs with mb-2 spacing
- Required field indicators
- Helper text below inputs when needed
- Consistent focus states

**Form Fields:**
1. PC Name (text input)
2. Employee Number (text input)
3. Username (text input - pre-filled with logged-in user)
4. Serial Number (text input)
5. MAC Address (formatted text input)
6. Buyback Status (dropdown: Pending, Approved, In Process, Completed)
7. Date (date picker)

**Action Buttons:**
- Primary: "Generate QR Code" - full-width on mobile, auto-width desktop
- Secondary: "Clear Form" - outline style
- Button heights: py-3, px-6

### QR Code Display Section
**Layout:**
- Centered card appearing after generation
- QR code display: 300x300px centered
- Asset details summary below QR in two-column grid
- Download button: "Download QR Code" with download icon
- Share functionality for mobile devices

### QR Scanner Interface
**Camera View:**
- Full-width video preview with rounded-lg container
- Centered scan area indicator overlay
- Instructions above: "Position QR code within the frame"
- Auto-focus feedback when code detected
- Switch camera button for mobile devices

**Scanned Result Display:**
- Slide-in bottom sheet on mobile, modal on desktop
- Asset information in definition list format (dl, dt, dd)
- Actions: "View in Dashboard", "Close"

### Asset Dashboard
**Table Layout:**
- Responsive table with horizontal scroll on mobile
- Column headers: PC Name, Employee, Status, Date, Actions
- Row heights: py-4 for comfortable touch targets
- Alternating row treatment for scannability

**Filters & Search:**
- Search bar: Prominent placement with search icon, w-full md:w-96
- Status filter chips: Inline, clickable with active states
- Date range filter: Compact date pickers

**Asset Cards (Mobile Alternative):**
- Card grid for mobile: space-y-4
- Each card shows key info with status badge
- Tap to expand for full details

### Status Indicators
**Badge System:**
- Pending: Neutral treatment
- Approved: Positive treatment
- In Process: Informational treatment  
- Completed: Success treatment
- Rounded-full, px-3 py-1, text-xs font-medium

### Empty States
**Dashboard Empty:**
- Centered icon (document with QR code)
- "No assets registered yet" heading
- "Create your first asset entry" subtext
- Primary CTA: "Add New Asset"

## Icons

**Library:** Heroicons via CDN (outline style for navigation, solid for actions)

**Key Icons:**
- QR code generation/scanning
- Download
- Camera/scan
- Search
- Filter
- Status indicators (check, clock, arrow)
- Navigation (home, plus, grid)

## Responsive Behavior

**Breakpoints:**
- Mobile: Base styles, single column layouts
- Tablet (md:): Two-column forms, compact table
- Desktop (lg:): Full table, optimized layouts

**Mobile Optimizations:**
- Bottom navigation bar for primary actions
- Full-screen scanner interface
- Sheet-style modals instead of centered dialogs
- Thumb-friendly touch targets (min h-12)

## Accessibility

- All form inputs paired with labels
- ARIA labels for icon-only buttons
- Keyboard navigation support
- Focus indicators on all interactive elements
- Sufficient contrast ratios throughout
- Error messages linked to form fields

## Images

No hero images required. This is a utility application focused on functionality over marketing appeal. All visual communication handled through icons, QR codes, and structured data presentation.