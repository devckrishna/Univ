import { db } from "@/utils/db";
import { redirect } from "next/navigation";
import { UserButton, auth, clerkClient } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PlatformLayout = async ({ children }: { children: React.ReactNode }) => {
    let profile = "/";
    const isUserRegistered = async () => {
        const {userId} = auth();
        console.log('my user is id ',userId);
        if(!userId)redirect("/");
        const user = clerkClient.users.getUser(userId ?? "");
        const email = (await user).emailAddresses[0].emailAddress;
        const dbUsermentor = await db.mentor.findFirst({
            where: {
              email: email,
            },
          });
        const dbUserStudent = await db.student.findFirst({
            where:{
                email:email
            }
        })
        const dbUniversity = await db.university.findFirst({
          where: {
          email: email,
          },
      });
      if (!dbUsermentor && !dbUserStudent && !dbUniversity) {
        console.log("chalo bhyii onboarding page pr");
        redirect("/onboarding");
      }
      if(dbUsermentor)profile = `/mentor/${dbUsermentor.id}`;
      else if(dbUserStudent)profile = `/mentee/${dbUserStudent.id}`;
      else if(dbUniversity) profile = `/university/${dbUniversity.id}`;
    }
    await isUserRegistered();
    
    if(profile == "/"){
        return ({children});
    }else{
        return (
            <>
                    <div className="border-b">
                        <div className="flex h-16 items-center px-4">
                            <nav className={cn("flex items-center space-x-4 lg:space-x-6", "mx-6")}>
                                <Link
                                    href="/dashboard"
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={profile}
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                >
                                    Profile
                                </Link>
                            </nav>
                            <div className="ml-auto flex items-center space-x-4">
                                <UserButton afterSignOutUrl="/"/>
                            </div>
                        </div>
                    </div>
                    {children}
                </>
        )
    }
};

export default PlatformLayout;