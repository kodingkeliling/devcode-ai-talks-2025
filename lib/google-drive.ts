import { google } from 'googleapis';

const getOauth2Client = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL;

    if (!clientId || !clientSecret || !redirectUri) {
        throw new Error('Missing Google OAuth environment variables. Check your .env file.');
    }

    return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
};

const SCOPES = ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/userinfo.profile'];

export const getAuthUrl = () => {
    const client = getOauth2Client();
    return client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent',
    });
};

export const getTokens = async (code: string) => {
    const client = getOauth2Client();
    const { tokens } = await client.getToken(code);
    return tokens;
};

export const getDriveClient = (accessToken: string) => {
    const client = getOauth2Client();
    client.setCredentials({ access_token: accessToken });
    return google.drive({ version: 'v3', auth: client });
};

export const getUserInfo = async (accessToken: string) => {
    const client = getOauth2Client();
    client.setCredentials({ access_token: accessToken });
    const oauth2 = google.oauth2({ version: 'v2', auth: client });
    const { data } = await oauth2.userinfo.get();
    return data;
};
