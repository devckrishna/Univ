import { db } from "@/utils/db";
import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

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

export async function GET(req: NextRequest) {
  try {
    const meet = await CreateZoomMeeting();
    console.log("meeting details are ", meet);
    // return CreateZoomMeeting();
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


    return NextResponse.json({ message: "Booking added !", data: meet });
  } catch (err) {
    // console.log(err);
    return NextResponse.json({
      message: "Error creating mentor {POST: api/student/:id/addBooking}",
      error: err,
    });
  }
}



async function CreateZoomMeeting(){
  try{

  //   const meetingdetails = {
  //     "title": "Example Daily Meeting",
  //     "agenda": "Example Agenda",
  //     "password": "BgJep@43",
  //     "start": "2019-11-01 20:00:00",
  //     "end": "2019-11-01 21:00:00",
  //     "timezone": "Asia/Shanghai",
  //     "recurrence": "FREQ=DAILY;INTERVAL=1;COUNT=10",
  //     "enabledAutoRecordMeeting": false,
  //     "allowAnyUserToBeCoHost": false,
  //     "enabledJoinBeforeHost": false,
  //     "enableConnectAudioBeforeHost": false,
  //     "joinBeforeHostMinutes": 0,
  //     "excludePassword": false,
  //     "publicMeeting": false,
  //     "reminderTime": 10,
  //     "unlockedMeetingJoinSecurity": "allowJoin",
  //     "enableAutomaticLock": false,
  //     "automaticLockMinutes": 0,
  //     "allowFirstUserToBeCoHost": false,
  //     "allowAuthenticatedDevices": false,
  //     "invitees": [
  //         {
  //             "email": "john.andersen@example.com",
  //             "displayName": "John Andersen",
  //             "coHost": false,
  //             "panelist": false
  //         },
  //         {
  //             "email": "brenda.song@example.com",
  //             "displayName": "Brenda Song",
  //             "coHost": false,
  //             "panelist": false
  //         }
  //     ],
  //     "sendEmail": true,
  //     "hostEmail": "john.andersen@example.com",
  //     "siteUrl": "site4-example.webex.com",
  //     "registration": {
  //         "requireFirstName": true,
  //         "requireLastName": true,
  //         "requireEmail": true,
  //         "requireCompanyName": true,
  //         "requireCountryRegion": false,
  //         "requireWorkPhone": true,
  //         "customizedQuestions": [
  //             {
  //                 "question": "What color do you like?",
  //                 "required": true,
  //                 "type": "checkbox",
  //                 "options": [
  //                     {
  //                         "value": "green"
  //                     },
  //                     {
  //                         "value": "black"
  //                     },
  //                     {
  //                         "value": "yellow"
  //                     },
  //                     {
  //                         "value": "red"
  //                     }
  //                 ],
  //                 "rules": [
  //                     {
  //                         "condition": "notEquals",
  //                         "value": "red",
  //                         "result": "reject",
  //                         "matchCase": true,
  //                         "order": 2
  //                     }
  //                 ]
  //             },
  //             {
  //                 "question": "Project Team",
  //                 "type": "singleLineTextBox",
  //                 "maxLength": 120
  //             },
  //             {
  //                 "question": "How are you",
  //                 "type": "multiLineTextBox"
  //             },
  //             {
  //                 "question": "Dropdownlist Q",
  //                 "type": "dropdownList",
  //                 "options": [
  //                     {
  //                         "value": "A1"
  //                     },
  //                     {
  //                         "value": "A2"
  //                     }
  //                 ]
  //             },
  //             {
  //                 "question": "weather",
  //                 "required": false,
  //                 "type": "radioButtons",
  //                 "maxLength": 120,
  //                 "options": [
  //                     {
  //                         "value": "sunny"
  //                     },
  //                     {
  //                         "value": "rain"
  //                     }
  //                 ]
  //             }
  //         ],
  //         "rules": [
  //             {
  //                 "question": "lastName",
  //                 "condition": "endsWith",
  //                 "value": "tom",
  //                 "result": "reject",
  //                 "matchCase": false,
  //                 "order": 1
  //             }
  //         ]
  //     },
  //     "integrationTags": [
  //         "dbaeceebea5c4a63ac9d5ef1edfe36b9",
  //         "85e1d6319aa94c0583a6891280e3437d",
  //         "27226d1311b947f3a68d6bdf8e4e19a1"
  //     ],
  //     "simultaneousInterpretation": {
  //         "enabled": true,
  //         "interpreters": [
  //             {
  //                 "languageCode1": "en",
  //                 "languageCode2": "de",
  //                 "email": "marcus.hoffmann@example.com",
  //                 "displayName": "Hoffmann"
  //             },
  //             {
  //                 "languageCode1": "en",
  //                 "languageCode2": "fr",
  //                 "email": "antoine.martin@example.com",
  //                 "displayName": "Martin"
  //             }
  //         ]
  //     },
  //     "enabledBreakoutSessions": true,
  //     "breakoutSessions": [
  //         {
  //             "name": "Breakout Session 1",
  //             "invitees": [
  //                 "rachel.green@example.com",
  //                 "monica.geller@example.com"
  //             ]
  //         },
  //         {
  //             "name": "Breakout Session N",
  //             "invitees": [
  //                 "ross.geller@example.com",
  //                 "chandler.bing@example.com"
  //             ]
  //         }
  //     ],
  //     "trackingCodes": [
  //         {
  //             "name": "Department",
  //             "value": "Engineering"
  //         },
  //         {
  //             "name": "Division",
  //             "value": "Full-time"
  //         }
  //     ]
  // }

  //   const response = await axios.post('https://webexapis.com/v1/meetings',
  //   meetingdetails,
  //   {
  //     headers: {
  //       Authorization: `Bearer Njg0YWUwZGEtMTgzZC00MjJkLTllNzQtZTI5YTNlZTI3YjAwZWFmNDE5ZGYtODg4_P0A1_06dac141-bf80-46e0-b15e-a135dc5a069b`,
  //     },
  //   }
  //   )
  var Moptions = {
    qs: {api_key: 'FPxFfR_qTd0vCRVE7PvQ', api_secret: 'XzhxxLIVmM8J2CXqDn6lUkCdyqjwGfOw', data_type: "JSON", host_id: '123456' , topic: 'my meet', type: 3}
  };
  var opt = {
    "location_id": "49D7a0xPQvGQ2DCMZgSe7w",
    "name": "My Personal Meeting Room",
    "type": "ZoomRoom",
    "calendar_resource_id": "u7GQ3q_zQbqJnNp02-oMjQ",
    "tag_ids": [
      "90bdda6c226f4f10a4b9a34be8d69f30",
      "1234ds6c226f4f10a4b9a34be8d69f30"
    ]
  }
  const response = await axios.post(
      'https://api.zoom.us/v2/rooms',
      opt,
      // {
      //   topic: `Meeting for username`,
      //   type: 2, // Scheduled Meeting
      // },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer XzhxxLIVmM8J2CXqDn6lUkCdyqjwGfOw`,
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
