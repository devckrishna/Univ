'use client'
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ComponentProps } from "react";


type BookingInterface = {
  id:string,
  date:string,
  start_time:string,
  end_time:string,
  duration:number,
  student_id:string,
  mentor_id:string,
  amount:Number,
  mentorFeedbackFlag:Boolean,
  menteeFeedbackFlag:Boolean,
  mentorFeedback: string,
  menteeFeedback: string,
  menteeFeedbackRating: number
}

type Props = {
  bookings:BookingInterface[],
  type: String
}

export default function Feedbacks({bookings,type}:Props){

    return (
      <>
      {bookings.length == 0 && 
        <div id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
              <div className="flex items-center">
                <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium">No Feedback From {type}s Yet !</h3>
              </div>
              <div className="mt-2 mb-4 text-sm">
                Hey there ! 
                You don't have any feedbacks from any mentors ! Kindly contact the mentors to submit a feedback.  
              </div>
        </div>}
        { bookings.length>0 && 
            <ScrollArea className={bookings.length>4?"h-screen bg-white":"bg-white"}>
              <div className="flex flex-col gap-2 p-4 pt-0">
                {bookings.map((b) => (
                  <div key={b.id}>
                      <button
                        key={b.id}
                        className={cn(
                          "flex flex-col items-start gap-2 rounded-lg border p-3 mt-2 text-left text-sm transition-all hover:bg-accent",
                        )}
                      >
                        <div className="flex w-full flex-col gap-1">
                          <div className="flex items-center">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold">{b.date}</div>
                              {type == "Student" && (
                                <>
                                  <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                  </svg>
                                  <p className="text-sm font-bold text-gray-900 dark:text-white">{b.menteeFeedbackRating.toString()}</p>
                                </>
                              )}
                            </div>
                            <div
                              className={cn(
                                "ml-auto text-xs",
                                // mail.selected === item.id
                                //   ? "text-foreground"
                                  "text-muted-foreground"
                              )}
                            >
                            </div>
                          </div>
                          {/* <div className="text-xs font-medium">{item.subject}</div> */}
                        </div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">
                          {type == "Student"?b.menteeFeedback:b.mentorFeedback}
                        </div>
                          <div className="flex items-center gap-2">
                              <Badge variant={getBadgeVariantFromLabel("-")}>
                                {b.start_time + "-" + b.end_time} IST
                              </Badge>
                          </div>
                      </button>
                  </div>
                ))}
              </div>
            </ScrollArea>
        }
        </>
      )
}


function getBadgeVariantFromLabel(
    label: string
  ): ComponentProps<typeof Badge>["variant"] {
    if (["work"].includes(label.toLowerCase())) {
      return "default"
    }
  
    if (["personal"].includes(label.toLowerCase())) {
      return "outline"
    }
  
    return "secondary"
  }

// const Feedbacks:  React.FC = () => {
//     return (
//         <>
//             <List sx={{
//                 width: '100%',
//                 bgcolor: 'background.paper',
//                 position: 'relative',
//                 overflow: 'auto',
//                 maxHeight: 150,
//                 '& ul': { padding: 0 },
//             }}>
//                 <ListItem alignItems="flex-start">
//                     <ListItemAvatar>
//                     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//                     </ListItemAvatar>
//                     <ListItemText
//                     primary="Brunch this weekend?"
//                     secondary={
//                         <React.Fragment>
//                         <Typography
//                             sx={{ display: 'inline' }}
//                             component="span"
//                             variant="body2"
//                             color="text.primary"
//                         >
//                             Ali Connors
//                         </Typography>
//                         {" — I'll be in your neighborhood doing errands this…"}
//                         </React.Fragment>
//                     }
//                     />
//                     <Button>Go To Post</Button>
//                 </ListItem>
//                 <Divider variant="inset" component="li" />
//                 <ListItem alignItems="flex-start">
//                     <ListItemAvatar>
//                     <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
//                     </ListItemAvatar>
//                     <ListItemText
//                     primary="Summer BBQ"
//                     secondary={
//                         <React.Fragment>
//                         <Typography
//                             sx={{ display: 'inline' }}
//                             component="span"
//                             variant="body2"
//                             color="text.primary"
//                         >
//                             to Scott, Alex, Jennifer
//                         </Typography>
//                         {" — Wish I could come, but I'm out of town this…"}
//                         </React.Fragment>
//                     }
//                     />
//                 </ListItem>
//                 <Divider variant="inset" component="li" />
//                 <ListItem alignItems="flex-start">
//                     <ListItemAvatar>
//                     <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//                     </ListItemAvatar>
//                     <ListItemText
//                     primary="Oui Oui"
//                     secondary={
//                         <React.Fragment>
//                         <Typography
//                             sx={{ display: 'inline' }}
//                             component="span"
//                             variant="body2"
//                             color="text.primary"
//                         >
//                             Sandra Adams
//                         </Typography>
//                         {' — Do you have Paris recommendations? Have you ever…'}
//                         </React.Fragment>
//                     }
//                     />
//                 </ListItem>
//                 <Divider variant="inset" component="li" />
//                 <ListItem alignItems="flex-start">
//                     <ListItemAvatar>
//                     <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//                     </ListItemAvatar>
//                     <ListItemText
//                     primary="Oui Oui"
//                     secondary={
//                         <React.Fragment>
//                         <Typography
//                             sx={{ display: 'inline' }}
//                             component="span"
//                             variant="body2"
//                             color="text.primary"
//                         >
//                             Sandra Adams
//                         </Typography>
//                         {' — Do you have Paris recommendations? Have you ever…'}
//                         </React.Fragment>
//                     }
//                     />
//                 </ListItem>
//             </List>
//         </>
//     )
// }

// export default Feedbacks;