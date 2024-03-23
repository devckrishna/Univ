import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: [
        "/",
        "/dashboard",
        "/dashboard/post/:id",
        "/onboarding",
        "/mentor",
        "/mentee",
        "/university",
        "/api/mentor/:id/",
        "/api/mentor/:id/getSlot/",
        "/api/student/addbooking",
        "/api/mentor/addAvailability",
        "/api/posts",
        "/api/mentor/Feedback",
        "/api/student/Feedback",
        // "/api/user/mentor",
        // "/api/user/student",
        // "/api/user/:id",
        // "/api/user/mentor/getbyemail",
        // "/api/user/mentor/createslot",
        // "/api/user/mentor/getSlot",
        // "/api/booking",
        // "/api/booking/getmentorbookings",
        // "/api/booking/getuserbookings",
      ],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};