// app/api/google/connect/route.ts
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
    );

    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    });

    // Redirect the user to Google's OAuth 2.0 server for authentication
    return NextResponse.redirect(authorizationUrl);
  } catch (error) {
    console.error('Error generating auth URL:', error);
    // Return a response with an error message
    return NextResponse.json({ error: 'Error generating auth URL' }, { status: 500 });
  }
}
