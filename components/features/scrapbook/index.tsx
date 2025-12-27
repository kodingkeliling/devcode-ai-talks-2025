"use client"

import { useEffect, useState } from "react"
import { MemoryCard } from "./memory-card"
import { Skeleton } from "@/components/ui/skeleton"

interface Memory {
    id: string
    userName: string
    imageUrl: string
    caption: string | null
    createdAt: string
}

export function MemoryList() {
    const [memories, setMemories] = useState<Memory[]>([])
    const [loading, setLoading] = useState(true)

    const fetchMemories = async () => {
        try {
            const res = await fetch("/api/memories")
            const data = await res.json()
            if (Array.isArray(data)) {
                setMemories(data)
            }
        } catch (error) {
            console.error("Failed to fetch memories", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMemories()

        // Refresh list when a new memory is uploaded (can be event-based, but here we just expose the refetch)
        const handleRefresh = () => fetchMemories()
        window.addEventListener("refresh-memories", handleRefresh)
        return () => window.removeEventListener("refresh-memories", handleRefresh)
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 py-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[250px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (memories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <h3 className="text-2xl font-semibold tracking-tight">Belum ada kenangan</h3>
                <p className="text-muted-foreground mt-2 max-w-xs">
                    Jadilah orang pertama yang mengabadikan momen Devcode AI Talk 2025 di sini!
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 py-8 max-w-[1600px] mx-auto">
            {memories.map((memory) => (
                <MemoryCard
                    key={memory.id}
                    userName={memory.userName}
                    imageUrl={memory.imageUrl}
                    caption={memory.caption}
                    createdAt={memory.createdAt}
                />
            ))}
        </div>
    )
}
