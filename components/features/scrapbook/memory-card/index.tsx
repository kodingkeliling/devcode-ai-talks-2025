"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

interface MemoryCardProps {
    userName: string
    imageUrl: string
    caption: string | null
    createdAt: string
}

export function MemoryCard({ userName, imageUrl, caption, createdAt }: MemoryCardProps) {
    return (
        <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={caption || `Memory by ${userName}`}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4 gap-2">
                {caption && (
                    <p className="text-sm font-medium leading-relaxed line-clamp-3">
                        {caption}
                    </p>
                )}
                <div className="flex items-center justify-between w-full mt-2">
                    <span className="text-xs font-semibold text-primary/80 uppercase tracking-wider">
                        {userName}
                    </span>
                    <span className="text-[10px] text-muted-foreground italic">
                        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                    </span>
                </div>
            </CardFooter>
        </Card>
    )
}
