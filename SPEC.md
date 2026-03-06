# LAST NIGHT - Technical Specification Document

## Project Overview

**Project Name:** LAST NIGHT - The Blacklist
**Type:** High-utility event landing page with membership loyalty system
**Core Functionality:** Immersive anti-gravity starfield background with Blacklist membership cards, QR verification, and digital wallet integration
**Target Users:** Event attendees, VIP members, door staff (scanners)

---

## 1. Visual Identity & Design System

### Color Palette

| Role | Color | Hex Code |
|------|-------|----------|
| Background (Base) | Pitch Black | `#000000` |
| Background (Cards) | Deep Space | `rgba(18, 18, 18, 0.8)` |
| Primary Accent | Electric Indigo | `#8A2BE2` |
| Secondary Accent | Neon Purple | `#9932CC` |
| Text Primary | Static White | `#FFFFFF` |
| Text Secondary | Cold Gray | `#A0A0A0` |
| Success/Active | Matrix Green | `#00FF41` |
| Error/Inactive | Alert Red | `#FF3333` |
| Glass Border | Ethereal White | `rgba(255, 255, 255, 0.1)` |

### Typography

| Element | Font Family | Weight | Size (Desktop) | Size (Mobile) |
|---------|-------------|--------|----------------|---------------|
| Main Logo/Brand | Monument Extended | 400 | 48px | 32px |
| Hero Headlines | Archivo Black | 400 | 72px | 40px |
| Section Headers | Monument Extended | 400 | 36px | 24px |
| Body Text | Inter | 300 | 16px | 14px |
| Buttons/Labels | Inter | 600 | 14px | 12px |
| Countdown Timer | Monument Extended | 400 | 96px | 48px |

### Layout Structure

**Navigation (Fixed)**
- Logo: "LAST NIGHT" (left)
- Links: TICKETS | BLACKLIST (center-right)
- Remove: TBT, Merch Store, The Architect

**Page Sections (Single Page Flow)**
1. Hero Section (100vh) - Countdown + CTA
2. The Event Section - Event description
3. Ticket Tiers Section - 3-column pricing
4. The Blacklist Section - Membership CTA
5. Footer - Privacy, Terms, Contact

### UI Effects

**Glassmorphism Cards**
```css
.glass-card {
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
```

**Neon Glow Effects**
```css
.neon-glow {
  box-shadow: 0 0 20px rgba(138, 43, 226, 0.5),
              0 0 40px rgba(138, 43, 226, 0.3),
              0 0 60px rgba(138, 43, 226, 0.1);
}
```

**3D Tilt Effect (Membership Cards)**
- Use `@react-three/drei` for 3D transforms
- Mouse/touch reactive tilt
- Gyroscope reactive on mobile

---

## 2. Anti-Gravity Starfield (Three.js)

### Technical Implementation

**Particle Count:** 15,000 stars (BufferGeometry for GPU performance)

**Motion Algorithm:** 3D Simplex/Perlin Noise for organic, floating movement

**Color Variation:**
- 70% Cold White (#FFFFFF)
- 20% Electric Indigo (#8A2BE2)
- 10% Varying opacity for depth

### Interactive Features

| Interaction | Behavior |
|-------------|----------|
| Mouse Move | Subtle parallax tilt (max 5 degrees) |
| Scroll | Warp speed effect - stars accelerate on z-axis |
| Idle | Slow organic drift using noise function |
| Page Load | Fade-in animation (2 seconds) |

### Code Structure

```javascript
// components/Starfield.js
- Use THREE.Points with BufferGeometry
- Custom vertex shader for noise-based movement
- Custom fragment shader for star rendering
- requestAnimationFrame loop
- scroll listener for warp effect
- mouse move listener for parallax
```

---

## 3. Database Schema (Google Firebase)

### Firestore Collections

**Collection: members**

```javascript
{
  // Auto-generated
  uid: string,           // Firebase Auth UID
  member_id: string,     // Format: LN-XXXXXX (unique)
  
  // User Info
  name: string,
  email: string,
  phone: string,         // Primary login key
  
  // Loyalty Status
  tier: string,          // "Guest" | "Blacklist" | "Inner Circle" | "Founder"
  points: number,        // Loyalty points
  attendance_count: number,
  member_since: timestamp,
  
  // Status
  status: boolean,       // Active/Inactive
  banned: boolean,
  
  // Security
  qr_token: string,      // Unique token for QR generation
  last_active: timestamp
}
```

**Collection: events**

```javascript
{
  event_id: string,
  name: string,
  date: timestamp,
  location: string,
  capacity: number,
  tickets_sold: number,
  
  // Pricing Tiers
  tiers: {
    first_hour: { price: number, limit: number },
    ga: { price: number, limit: number },
    vip: { price: number, limit: number },
    blacklist: { price: number, limit: number }  // Discounted
  }
}
```

**Collection: scans**

```javascript
{
  scan_id: string,
  member_id: string,
  event_id: string,
  timestamp: timestamp,
  location: string,      // Entry point
  result: string         // "success" | "failed" | "banned"
}
```

### Authentication

- **Method:** Firebase Auth with Phone OTP
- **Flow:** User enters phone number → receives SMS code → enters code → logged in
- **No password required** - passwordless for ease of use

---

## 4. Digital Membership Card

### Visual Design

**Card Dimensions:** 324 x 204 pixels (standard card ratio)

**Layout:**
- Background: Glassmorphism with starfield visible
- Logo: "LAST NIGHT" top left
- Member Name: Center-left
- Member Number: Bottom left (LN-XXXXXX)
- Tier Badge: Top right
- QR Code: Bottom right
- Expiry: Below QR code

**Animations:**
- 3D tilt on hover (max 15 degrees)
- Subtle pulse glow on QR code
- Holographic shimmer effect (CSS)

### QR Code Integration

**Library:** `qrcode.react`

**Data Encoded:**
```javascript
{
  member_id: "LN-XXXXXX",
  token: "unique_secure_token",
  timestamp: Date.now()
}
```

**Security:**
- Time-sensitive tokens (expire after 1 hour)
- Regenerate on each portal login
- Cannot be screenshot-shared (detect via canvas)

---

## 5. Apple/Google Wallet Integration

### Apple Wallet (PassKit)

**Pass Type:** Generic

**Pass Structure:**
```javascript
{
  formatVersion: 1,
  passTypeIdentifier: "pass.com.lastnight.blacklist",
  serialNumber: "LN-XXXXXX",
  teamIdentifier: "XXXXXXXXXX",
  
  organizationName: "LAST NIGHT",
  description: "Blacklist Membership Card",
  
  logo: "/logo.png",
  icon: "/icon.png",
  strip: "/strip.png",    // Hero image
  
  barcode: {
    message: "LN-XXXXXX-token",
    format: "PKBarcodeFormatQR"
  },
  
  auxiliaryFields: [
    { key: "member", label: "MEMBER", value: "LN-XXXXXX" },
    { key: "tier", label: "TIER", value: "BLACKLIST" }
  ]
}
```

### Google Wallet

**API:** Google Wallet API

**Pass Class:** Generic

**Similar structure to Apple PassKit**

### Generation Flow

1. User logs into Member Portal
2. User clicks "Add to Apple/Google Wallet"
3. Server generates .pkpass file (Apple) or JWT (Google)
4. User receives pass in their wallet app
5. Pass updates automatically via push notifications

---

## 6. Ticket Sales Integration

### Stripe Checkout

**Implementation:** Stripe Checkout (embedded modal)

**Ticket Tiers:**

| Tier | Price | Features |
|------|-------|----------|
| First Hour | $40 | Early entry, general admission |
| General Admission | $60 | Standard entry |
| VIP | $120 | Priority entry, dedicated bar |
| Blacklist Member | $45 | Discounted (must be logged in) |

**Member Pricing Logic:**
```javascript
if (user.isBlacklistMember) {
  showBlacklistTier();
  applyDiscount(code: "BLACKLIST10");
}
```

**Webhook Integration:**
- Listen for `checkout.session.completed`
- Increment `attendance_count` in member record
- Trigger wallet pass update notification

---

## 7. Door Scanner (Bouncer App)

### Route: `/scan` (Hidden, password protected)

### Features

- Full-screen camera view
- Real-time QR code detection
- Instant verification against database

### Display States

| State | Color | Message |
|-------|-------|---------|
| Active Member | Green | "WELCOME [NAME]" + Tier |
| Invalid | Red | "INVALID - Call Manager" |
| Banned | Red | "GET LOST" |
| Not Found | Yellow | "NOT ON LIST" |

### Technical Stack

- Library: `react-qr-reader` or `html5-qrcode`
- API call to Firebase for verification
- Offline mode: Cache last 24 hours of members

---

## 8. Page Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Landing page (Hero + Tickets + Blacklist) | Public |
| `/login` | Phone OTP authentication | Public |
| `/portal` | Member dashboard with digital card | Authenticated |
| `/scan` | QR verification for door staff | Protected (password) |
| `/admin` | Event management (future) | Admin only |

---

## 9. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| 3D/Starfield | Three.js + React Three Fiber |
| Database | Firebase Firestore |
| Auth | Firebase Auth (Phone OTP) |
| Payments | Stripe Checkout |
| QR Codes | qrcode.react |
| Wallet | PassKit (Apple) + Google Wallet API |
| Hosting | Vercel |

---

## 10. Sections to Remove

**DELETE entirely:**
- TBT (The Throwback)
- Merch Store
- The Architect (JJ Bio section)

**KEEP and refine:**
- The Event / Hero
- Tickets
- The Blacklist (transform into full portal)

---

## 11. Acceptance Criteria

### Visual
- [ ] Starfield renders with 15,000+ particles
- [ ] Stars move organically with noise algorithm
- [ ] Mouse parallax works smoothly
- [ ] Scroll warp effect activates on scroll
- [ ] Glassmorphism cards have visible blur
- [ ] Neon glow effects on buttons
- [ ] Typography uses Monument Extended / Archivo Black

### Functionality
- [ ] Phone authentication works
- [ ] Member portal displays unique card
- [ ] QR code generates per member
- [ ] Blacklist tier pricing shows for members
- [ ] Scanner verifies member status
- [ ] Add to Wallet buttons functional

### Performance
- [ ] Starfield runs at 60fps
- [ ] Page loads under 3 seconds
- [ ] Lighthouse score > 90

---

## 12. Developer Notes

**For the Developer:**

1. Start with `npx create-next-app@latest lastnight --typescript --tailwind`
2. Install dependencies: `npm install three @react-three/fiber @react-three/drei framer-motion firebase qrcode.react @stripe/stripe-js`
3. Set up Firebase project and add config to `.env.local`
4. Copy components from the code provided
5. Test with test phone numbers in Firebase

**Important:** This is a "Private OS" feel - no unnecessary buttons, high-speed transitions, everything must feel "UNREAL."
