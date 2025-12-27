# Implementation Roadmap

## Phase 1: Environment & Setup
1. [ ] Configure `.env` with provided Google and Supabase credentials.
2. [ ] Initialize Prisma with `schema.prisma` (as defined in `database.md`).
3. [ ] Run `npx prisma migrate dev`.
4. [ ] Setup Shadcn UI components (Card, Button, Dialog, Input, Form).
5. [ ] Configure `next.config.ts` for Google Drive images.

## Phase 2: Core Foundation
1. [ ] Implement `PrismaClient` singleton.
2. [ ] Create `use-auth-store` using Zustand.
3. [ ] Build the `/shared` components (Header, ThemeToggle).
4. [ ] Define Zod schemas for the memory upload form.

## Phase 3: Google Drive & API
1. [ ] Implement Google OAuth logic and callback route.
2. [ ] Create API route for file upload to Google Drive.
3. [ ] Create API route for saving and fetching `Memory` records.

## Phase 4: Frontend Development
1. [ ] Develop the main `page.tsx` layout.
2. [ ] Implement `scrapbook/memory-list` feature to fetch and display memories.
3. [ ] Implement `upload-memory/modal` and `form` logic.
4. [ ] Connect Google Drive upload hook to the form.

## Phase 5: Polishing
1. [ ] Implement Dark Mode styles.
2. [ ] Add micro-animations (Framer Motion or CSS transitions).
3. [ ] Final responsive testing.
4. [ ] Lint and Build verification.
