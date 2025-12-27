# User Requirements (UR) - Kenangan Devcode AI Talk 2025

| ID | Category | Requirement Name | Requirement Description | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **UR-001** | Functional | Google OAuth Integration | Users must be able to securely connect their Google account to the application. | High |
| **UR-002** | Functional | Google Drive File Upload | Authenticated users can upload image files directly to their own Google Drive storage. | High |
| **UR-003** | Functional | Memory Feed Display | A public list displaying all uploaded memories (images, captions, uploader names). | High |
| **UR-004** | Functional | Public Visibility Logic | App must automatically set uploaded Drive files to 'Public View' for website rendering. | High |
| **UR-005** | Functional | Memory Upload Modal | A multi-step form modal for connecting auth and submitting memory metadata (caption + image). | High |
| **UR-006** | Functional | Logout / Disconnect | Users can revoke the app's access or disconnect their Google session locally. | Medium |
| **TR-001** | Technical | Next.js 15+ App Router | System must be built using the latest Next.js 15 App Router architecture. | High |
| **TR-002** | Technical | TypeScript Implementation | Entire codebase must maintain strict typing and follow clean TypeScript patterns. | High |
| **TR-003** | Technical | Prisma 6.x ORM | Database interactions must use Prisma version 6 for model management and migrations. | High |
| **TR-004** | Technical | Folder Pattern | Strict adherence to `/folder-name/index.tsx` structure for all components. | Medium |
| **TR-005** | Technical | Zustand State Management | Global state (auth/tokens) must be managed using Zustand stores. | Medium |
| **DR-001** | Database | Memory Model | Single PostgreSQL table storing `id`, `userName`, `caption`, `imageUrl`, and timestamps. | High |
| **UI-001** | UI/UX | Digital Scrapbook Aesthetic | Modern, minimalist paper-like design with a cleaner white-dominant palette. | High |
| **UI-002** | UI/UX | Dark & Light Mode | High-quality implementation of theme toggling with system preference support. | High |
| **UI-003** | UI/UX | Mobile Responsive | Interface must be fully functional and aesthetically pleasing on all devices. | High |
| **UI-004** | UI/UX | Micro-animations | Subtle transitions and loading states (Skeletons) for enhanced user experience. | Medium |
