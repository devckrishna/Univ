import { db } from "@/utils/db";
import { NextResponse,NextRequest } from "next/server";
import {google} from 'googleapis';
import axios from "axios";

// const prisma = new PrismaClient();

// export async function GET(req: Request) {
//   try {
//     const mentors = await db.mentor.findMany();
//     return NextResponse.json(mentors);
//   } catch (err) {
//     return NextResponse.json({
//       message: "Error finding the mentors {GET: api/mentor}",
//     });
//   }
// }

export async function GET() {
 
  //   const auth = new google.auth.OAuth2(
  //     process.env.GOOGLE_CLIENT_ID,
  //     process.env.GOOGLE_CLIENT_SECRET,
  //     process.env.GOOGLE_REDIRECT_URI
  //   );
  //   // const scopes = ['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.events'];
  //   const calendar = google.calendar({version:'v3',auth});
  //   const startTime = new Date();
  //   const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    
  //   const event = {
  //     summary: 'Meeting Room Title',
  //     description: 'Meeting Room Description',
  //     start: { dateTime: startTime.toISOString() },
  //     end: { dateTime: endTime.toISOString() },
  //     conferenceData: {
  //       createRequest: { requestId: 'meet-request' }
  //     }
  //   };
  // try {
  //   const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events',{
  //     method:'POST',
  //     headers:{
  //       'Authorization':`Beared ${process.env.GOOGLE_CLIENT_SECRET}`
  //     },
  //     body:JSON.stringify(event)
  //   }).then((data)=>{
  //     console.log(data.json());
  //   })

    // const calendarResponse = await calendar.events.insert({
    //     calendarId: 'primary', // You can use a specific calendar ID if needed
    //     // resource: event,
    //     conferenceDataVersion: 1,
    //   });

    // const calendarResponse = await calendar.events.insert({
    //   calendarId: 'primary', // You can use a specific calendar ID if needed
    //   resource: event,
    //   conferenceDataVersion: 1,
    // });

    // const meetLink = calendarResponse.data.conferenceData.entryPoints[0].uri;

    // return NextResponse.json({message: "meeting created",data:response});

    const meet = await CreateZoomMeeting();
    console.log("meeting details are ", meet);
    // return CreateZoomMeeting();
    return NextResponse.json({message: "meeting created",data:meet});
    
    // const {
    //   date,
    //   student_id,
    //   mentor_id,
    //   duration,
    //   start_time,
    //   end_time,
    //   // rate
    // } = await req.json();

    // const mentor = await db.mentor.findUnique({
    //     where: {id:mentor_id}
    // });
    // const student = await db.student.findUnique({
    //     where: {id:student_id}
    // })

    // if(!student || !mentor){
    //     return NextResponse.json({
    //         message: "Invalid credentials ! Unable to add booking",
    //         data : {
    //           student:student,
    //           mentor:mentor
    //         }
    //       });
    // }

    // const newbooking = await db.booking.create({
    //   data: {
    //     date,
    //     student_id,
    //     mentor_id,
    //     duration,
    //     start_time,
    //     end_time
    //     // rate
    //   },
    // });

    // await prisma?.student.update({
    //     where: {id:student_id},
    //     data:{
    //         bookings:{
    //             connect:{id:newbooking.id}
    //         }
    //     }
    // });

    // await prisma?.mentor.update({
    //     where:{id:mentor_id},
    //     data:{
    //         bookings:{
    //             connect:{id:newbooking.id}
    //         }
    //     }
    // })

  }

  //  catch (err) {
  //   console.log(err);
  //   return NextResponse.json({
  //     message: "Error creating mentor {POST: api/student/:id/addBooking}",
  //     error: err,
  //   });
  // }
// }



async function CreateZoomMeeting(){
  try{

  
  //   const response = await axios.post('https://webexapis.com/v1/meetings',
  //   meetingdetails,
  //   {
  //     headers: {
  //       Authorization: `Bearer Njg0YWUwZGEtMTgzZC00MjJkLTllNzQtZTI5YTNlZTI3YjAwZWFmNDE5ZGYtODg4_P0A1_06dac141-bf80-46e0-b15e-a135dc5a069b`,
  //     },
  //   }
  //   )
        
        const opt = {
          "agenda": "My Meeting",
          "default_password": false,
          "duration": 60,
          "password": "123456",
          "pre_schedule": false,
          "recurrence": {
            "end_date_time": "2022-04-02T15:59:00Z",
            "end_times": 7,
            "monthly_day": 1,
            "monthly_week": 1,
            "monthly_week_day": 1,
            "repeat_interval": 1,
            "type": 1,
            "weekly_days": "1"
          },
          "schedule_for": "jchill@example.com",
          "settings": {
            "additional_data_center_regions": [
              "TY"
            ],
            "allow_multiple_devices": true,
            "alternative_hosts": "jchill@example.com;thill@example.com",
            "alternative_hosts_email_notification": true,
            "approval_type": 2,
            "approved_or_denied_countries_or_regions": {
              "approved_list": [
                "CX"
              ],
              "denied_list": [
                "CA"
              ],
              "enable": true,
              "method": "approve"
            },
            "audio": "telephony",
            "audio_conference_info": "test",
            "authentication_domains": "example.com",
            "authentication_exception": [
              {
                "email": "jchill@example.com",
                "name": "Jill Chill"
              }
            ],
            "authentication_option": "signIn_D8cJuqWVQ623CI4Q8yQK0Q",
            "auto_recording": "cloud",
            "breakout_room": {
              "enable": true,
              "rooms": [
                {
                  "name": "room1",
                  "participants": [
                    "jchill@example.com"
                  ]
                }
              ]
            },
            "calendar_type": 1,
            "close_registration": false,
            "contact_email": "jchill@example.com",
            "contact_name": "Jill Chill",
            "email_notification": true,
            "encryption_type": "enhanced_encryption",
            "focus_mode": true,
            "global_dial_in_countries": [
              "US"
            ],
            "host_video": true,
            "jbh_time": 0,
            "join_before_host": false,
            "language_interpretation": {
              "enable": true,
              "interpreters": [
                {
                  "email": "interpreter@example.com",
                  "languages": "US,FR"
                }
              ]
            },
            "sign_language_interpretation": {
              "enable": true,
              "interpreters": [
                {
                  "email": "interpreter@example.com",
                  "sign_language": "American"
                }
              ]
            },
            "meeting_authentication": true,
            "meeting_invitees": [
              {
                "email": "jchill@example.com"
              }
            ],
            "mute_upon_entry": false,
            "participant_video": false,
            "private_meeting": false,
            "registrants_confirmation_email": true,
            "registrants_email_notification": true,
            "registration_type": 1,
            "show_share_button": true,
            "use_pmi": false,
            "waiting_room": false,
            "watermark": false,
            "host_save_video_order": true,
            "alternative_host_update_polls": true,
            "internal_meeting": false,
            "continuous_meeting_chat": {
              "enable": true,
              "auto_add_invited_external_users": true
            },
            "participant_focused_meeting": false,
            "push_change_to_calendar": false,
            "resources": [
              {
                "resource_type": "whiteboard",
                "resource_id": "X4Hy02w3QUOdskKofgb9Jg",
                "permission_level": "editor"
              }
            ]
          },
          "start_time": "2022-03-25T07:32:55Z",
          "template_id": "Dv4YdINdTk+Z5RToadh5ug==",
          "timezone": "America/Los_Angeles",
          "topic": "My Meeting",
          "tracking_fields": [
            {
              "field": "field1",
              "value": "value1"
            }
          ],
          "type": 2
        }

    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      opt,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.ZOOM_SECRET}`,
        },
      }
    );

    console.log(response);
    // var asyncres = thenrequest('POST',"https://dev.zoom.us/v1/meeting/create",Moptions).done(function (res) {
    // console.log(res.getBody('utf8'));
    // });
    return response;

  }catch(err){
    console.log('error thrown at', err);
  }

}
