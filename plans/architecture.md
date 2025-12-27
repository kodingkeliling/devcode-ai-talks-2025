# System Architecture - Kenangan Devcode AI Talk 2025

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: Supabase + Prisma
- **State Management**: Zustand (Stores)
- **Validation**: Zod
- **Icons**: Lucide React (standard in Shadcn) + React Icons (fallback)
- **Auth & Storage**: Google Drive OAuth + Google Drive API

## Folder Structure
Following the `/kebab-case/index.tsx` naming convention and component organization rules:

```text
/src
  /app
    /api
      /memories
        /route.ts        # GET/POST memories
      /auth
        /google
          /callback      # OAuth callback handler
    /layout.tsx
    /page.tsx            # Main Landing Page
  /components
    /shared              # Global reusable components
      /header
        /index.tsx
      /footer
        /index.tsx
      /button
        /index.tsx
      /theme-toggle
        /index.tsx
    /features            # Page-specific components
      /scrapbook
        /memory-card     # Individual memory display
        /index.tsx       # Memory list container
      /upload-memory
        /form            # Zod validation here
        /modal           # Shadcn Dialog
        /index.tsx
  /hooks                 # Custom hooks
    /use-google-drive.ts # Handle OAuth and upload logic
    /use-memories.ts     # Data fetching logic
  /stores                # Zustand stores
    /use-auth-store.ts   # Store Google tokens
  /lib
    /prisma.ts           # Prisma client singleton
    /google-drive.ts     # Google Drive API helpers
    /utils.ts            # Shadcn utils
  /schemas               # Zod schemas
    /memory-schema.ts
```

## Architectural Concepts
1. **Reuse Components**: Common UI elements (buttons, inputs) are abstracted into `/shared`.
2. **Feature-Based UI**: Complex UI logic like "Upload Memory" or "Scrapbook List" resides in `/features`.
3. **Hooks for Logic**: UI components should be thin. Data fetching and OAuth logic live in `/hooks`.
4. **Stores for Global State**: OAuth tokens and user preferences are managed via Zustand.
5. **API Route Handlers**: Prisma interactions stay server-side within Next.js API routes.
