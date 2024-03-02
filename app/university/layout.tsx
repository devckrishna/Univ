import { db } from "@/utils/db";
import { UserButton, auth, clerkClient } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MenteeLayout = async ({ children }: { children: React.ReactNode }) => {
    let profile = "/";
    const isUserRegistered = async () => {
        const {userId} = auth();
        console.log("user id is ",userId);
        if(userId){
                const user = clerkClient.users.getUser(userId ?? "");
                const email = (await user).emailAddresses[0].emailAddress;
                const dbUniversity = await db.university.findFirst({
                    where:{
                        email:email
                    }
                })
                if(dbUniversity){
                    profile = `/mentee/${dbUniversity.id}`;
                }
        }
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

export default MenteeLayout;