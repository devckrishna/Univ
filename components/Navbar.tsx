'use client'
import { cn } from "@/lib/utils";
import { db } from "@/utils/db";
import { UserButton, auth, clerkClient } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    profile:string
}

export default function Navbar(props:Props) {

  return (
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
                        href={props.profile}
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
  )
}
