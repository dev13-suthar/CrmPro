// app/api/google/callback/route.js
import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import db from "@/lib/db"
import { authOptions } from '@/lib/authOptions';

export async function GET(req:NextRequest) {
  const { searchParams } = new URL(req.url);
  const server = await getServerSession(authOptions);
  const code = searchParams.get('code'); // Extract the 'code' from the query parameters

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
  );

  try {
    const { tokens } = await oauth2Client.getToken(code!); // Get the access token
    oauth2Client.setCredentials(tokens);
    await db.user.update({
        where: { id: server?.user.id },
        data: {
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          tokenExpiry: tokens.expiry_date ? new Date(tokens.expiry_date) : null // St, // Save expiry time
        },
      });

    // Optionally: Store tokens in session, cookie, or database for future use

    // Redirect back to the /calendar page
    return NextResponse.redirect(new URL('/objects/calender ', req.url));
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return NextResponse.json({ error: 'Error retrieving access token' }, { status: 500 });
  }
}
