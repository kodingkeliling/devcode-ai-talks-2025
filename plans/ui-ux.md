# UI/UX Planning - Kenangan Devcode AI Talk 2025

## Visual Identity
- **Concept**: Digital Scrapbook.
- **Style**: Minimalist, Paper-like, Modern, Clean.
- **Color Palette**: 
  - Main: Pure White (#FFFFFF) & Soft White (#F9FAFB).
  - Accents: Subtle Greys, Soft Shadows.
  - Dark Mode: Sleek charcoal/black with white typography.
- **Typography**: Inter (Clean, Modern).

## Layout Structure (Single Page)
The landing page (`/`) will consist of:

1. **Header**:
   - Website Title: "Kenangan Devcode AI Talk 2025".
   - Theme Toggle (Light/Dark).
   - "Unggah Kenangan" Button (Triggers Modal).

2. **Hero/Intro**:
   - Short welcome message or subtitle about capturing memories from the event.

3. **Memory Grid (The Scrapbook)**:
   - A masonry or standard grid layout.
   - Each card represents a `Memory`.
   - Hover effects for interaction.
   - Loading states using Shadcn Skeletons.

4. **Upload Modal**:
   - Shadcn `Dialog` component.
   - Step 1: Connect to Google Drive (OAuth).
   - Step 2: Form (Caption + Image Selection).
   - Step 3: Progressive Uploading indicator.

## Component Aesthetics (Shadcn UI)
- **Cards**: Using `Card` component with subtle borders and shadows to look like paper clippings.
- **Buttons**: Premium feel with soft round corners.
- **Transitions**: Smooth fade-ins for content loading.

## Accessibility & Responsiveness
- Full responsiveness from mobile to desktop.
- Semantic HTML tags.
- Aria-labels for interactive elements.
