/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/google/events/route.js
import { google } from 'googleapis';
import prisma from "@/lib/db"; // Assuming you are using Prisma
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function GET() {
  const session = await getServerSession(authOptions) // Example to get the user ID, change accordingly
  if(!session || !session.user.id){
      return NextResponse.json({err:"No Session found"},{status:403})
  }

  // Retrieve the stored tokens from the database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id!},
  });

  if (!user?.accessToken || !user?.refreshToken) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
  );

  // Set the stored credentials
  oauth2Client.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.refreshToken,
  });

  // Optional: Refresh the token if needed
  if (new Date() >= user.tokenExpiry!) {
    const { credentials } = await oauth2Client.refreshAccessToken();
    await prisma.user.update({
      where: { id: session?.user.id },
      data: {
        accessToken: credentials.access_token,
      },
    });
    oauth2Client.setCredentials(credentials);
  }

  // Fetch events from Google Calendar API
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items;
    return NextResponse.json({ events });
  } catch (error:any) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
