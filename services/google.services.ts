import { google } from 'googleapis';
import db from "@/lib/db"; // Import your database

export async function refreshAccessToken(userId:number) {
  const user = await db.user.findUnique({ where: { id: userId } });
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({ refresh_token: user?.refreshToken});

  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    await db.user.update({
      where: { id: userId },
      data: {
        accessToken: credentials.access_token,
        tokenExpiry: credentials.expiry_date ? new Date(credentials.expiry_date) : null,
      },
    });
    return credentials.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw new Error('Unable to refresh access token');
  }
}
