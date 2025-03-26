"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MessageSquare } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        <span className="hidden font-semibold sm:inline-block">Review Response Manager</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-primary",
            pathname === "/" ? "text-primary font-semibold" : "text-muted-foreground",
          )}
        >
          Dashboard
        </Link>
        <Link
          href="/reviews"
          className={cn(
            "transition-colors hover:text-primary",
            pathname === "/reviews" ? "text-primary font-semibold" : "text-muted-foreground",
          )}
        >
          Reviews
        </Link>
        <Link
          href="/analytics"
          className={cn(
            "transition-colors hover:text-primary",
            pathname === "/analytics" ? "text-primary font-semibold" : "text-muted-foreground",
          )}
        >
          Analytics
        </Link>
        <Link
          href="/settings"
          className={cn(
            "transition-colors hover:text-primary",
            pathname === "/settings" ? "text-primary font-semibold" : "text-muted-foreground",
          )}
        >
          Settings
        </Link>
      </nav>
    </div>
  )
}

