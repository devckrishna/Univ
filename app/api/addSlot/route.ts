import { db } from "@/utils/db";
import { NextResponse,NextRequest } from "next/server";
import {google} from 'googleapis';
import axios from "axios";

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
        
 const scopes = [
    'https://www.googleapis.com/auth/calendar'
  ];


export async function GET() {
    // console.log("scopes are ",scopes);
    const url = auth.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        // If you only need one scope you can pass it as a string
        scope: scopes
      });
    //   console.log("url is ",url);
      
      const calendar = google.calendar({ version: "v3", auth });
        console.log(calendar)

    // const {mentorEmail, menteeEmail, slot, duration} = await req.json();
    const reqId = "MeetId ";
    const event = {
        summary: `1:1 Session Univ-Connect`,
        description: "Google add event testing.",
        start: {
            dateTime: '2024-01-28T01:00:00-07:00',
            timeZone: 'Asia/kolkata',
        },
        end: {
            dateTime: '2024-01-28T05:00:00-10:00',
            timeZone: 'Asia/Kolkata',
        },
        attendees:[
            {'email':'chiragije7@gmail.com'},
            {'email':'chiragcompprog@gmail.com'}
        ],
        reminders: {
            useDefault: false,
            overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 30 },
            ],
        },
        conferenceData: {
            createRequest: {
              conferenceSolutionKey: {
                type: 'hangoutsMeet',
              },
              requestId: reqId,
            },
          }
    }
    
    calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        requestBody: event,
      })
      .then((event) =>  console.log('Event created: %s', event))
      .catch((error) => console.log('Error created: %s', error));
    
    return NextResponse.json({message:'Slot added successfully',data:event});
}