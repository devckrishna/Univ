import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
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
                    href="/examples/dashboard"
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
