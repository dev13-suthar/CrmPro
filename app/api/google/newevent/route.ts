import { authOptions } from '@/lib/authOptions';
import { google } from 'googleapis';
import { getServerSession } from 'next-auth/next';
import db from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { refreshAccessToken } from '@/services/google.services';

export const POST = async (req: NextRequest) => {
  // Check if the user is authenticated
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  // Retrieve the user's access token from the database
  const user = await db.user.findFirst({
    where: {
      id: session.user.id
    }
  });
  if(!user){
      return NextResponse.json('User not found', { status: 404 });
  }

  // Initialize Google Calendar API
  const newAccessToken = await refreshAccessToken(user.id);
  if (!newAccessToken) {
    return NextResponse.json('Failed to refresh token', { status: 401 });
  }
  
  const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  
  oauth2Client.setCredentials({
    access_token: newAccessToken,
  });
  
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  // Extract event details from the request body
  const event = await req.json();

  try {
    // Insert the event into the user's primary Google Calendar
    const response = await calendar.events.insert({
      calendarId: 'primary', // Primary calendar
      requestBody: {
        summary: event.summary,         // Event title
        description: event.summary, // Event description
        start: {
          dateTime: event.start,        // Start date and time
          timeZone: "Asia/Kolkata"      // Timezone
        },
        end: {
          dateTime: event.end,          // End date and time
          timeZone: "Asia/Kolkata"      // Timezone
        },
         // Optional: List of attendees
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // Reminder 24 hours before
            { method: 'popup', minutes: 10 },      // Reminder 10 minutes before
          ]
        },
      },
    });

    // Return the link to the newly created event
    return new Response(JSON.stringify({ link: response.data }), { status: 200 });
  } catch (error:any) {
    console.error('Error creating event:', error);
  if (error.response) {
    console.error('Error response:', error.response.data);
  }
  return NextResponse.json({ error: 'Error creating event', details: error.message }, { status: 500 });
  }
};
  