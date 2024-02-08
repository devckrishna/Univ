import { db } from "@/utils/db";
import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const PlatformLayout = async ({ children }: { children: React.ReactNode }) => {
    const isUserRegistered = async () => {
        const {userId} = auth();
        if(userId){
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
                if (!dbUsermentor && !dbUserStudent) {
                    redirect("/onboarding");
                }
                if(dbUserStudent){
                    redirect(`/mentee/${dbUserStudent.id}`);
                }
                if(dbUsermentor){
                    redirect(`/mentor/${dbUsermentor.id}`);
                }
        }
    }
    await isUserRegistered();
    return (
        <>
            {children}
        </>
    )
};

export default PlatformLayout;