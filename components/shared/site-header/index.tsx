"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { useAuthStore } from "@/stores/use-auth-store"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export function SiteHeader() {
    const { isAuthenticated, userName, logout } = useAuthStore()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between mx-auto px-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="inline-block font-bold text-xl tracking-tight">
                            Kenangan Devcode AI Talk 2025
                        </span>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <User className="h-4 w-4" />
                                <span>{userName}</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : null}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
