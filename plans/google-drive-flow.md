# Google Drive Integration Flow

## Objective
Enable users to upload images to their own Google Drive and share the "view" link on the scrapbook website.

## Workflow Detail

### 1. Authentication (OAuth 2.0)
- **Initiation**: User clicks "Connect Google Drive" in the upload modal.
- **Scope**: `https://www.googleapis.com/auth/drive.file` (Allows creating and reading only files created by this app).
- **Callback**: Redirects to `/auth/google/callback`.
- **Session**: Token is stored securely (e.g., in an HTTP-only cookie or handled by NextAuth, but we'll use a custom hook for flexibility).

### 2. File Uploading
- **Client Side**: User selects an image.
- **Process**:
  1. The image is sent to the Next.js API `/api/upload`.
  2. The API uses the saved OAuth token to upload the file to the user's Google Drive.
  3. The API sets the file permission to `anyone with the link can view`.
- **Result**: Retrieve the `webViewLink` or construct the display URL:
  `https://drive.google.com/uc?export=view&id={FILE_ID}`

### 3. Database Storage
After a successful upload, the app sends the following to the Prisma database:
- `userName`: User's profile name.
- `caption`: User's input.
- `imageUrl`: The constructed view URL.

### 4. Display Logic
- Since Google Drive `uc?export=view` URLs can be finicky with Next.js Image optimization, we must:
  1. Add `drive.google.com` to `remotePatterns` in `next.config.ts`.
  2. Ensure the file permissions are correctly set to Public View via API.

## API Requirements
- `google-auth-library` for handling tokens.
- `googleapis` for interacting with the Drive API.
