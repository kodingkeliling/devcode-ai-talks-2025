"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { memorySchema, MemoryFormValues } from "@/schemas/memory-schema"
import { useGoogleAuth } from "@/hooks/use-google-auth"
import { Loader2, Plus, UploadCloud } from "lucide-react"

export function UploadMemory() {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { isAuthenticated, login, accessToken, userName } = useGoogleAuth()

    const form = useForm<MemoryFormValues>({
        resolver: zodResolver(memorySchema),
        defaultValues: {
            caption: "",
        },
    })

    async function onSubmit(values: MemoryFormValues) {
        if (!accessToken || !userName) return

        setIsSubmitting(true)
        try {
            // 1. Upload to Google Drive
            const uploadFormData = new FormData()
            uploadFormData.append("file", values.image)

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: uploadFormData,
            })

            const uploadData = await uploadRes.json()

            if (!uploadRes.ok) throw new Error(uploadData.error || "Gagal upload ke Drive")

            // 2. Save to Database
            const dbRes = await fetch("/api/memories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName,
                    imageUrl: uploadData.imageUrl,
                    caption: values.caption,
                }),
            })

            if (!dbRes.ok) throw new Error("Gagal menyimpan ke database")

            toast.success("Kenanganmu berhasil diabadikan!")
            setOpen(false)
            form.reset()

            // Refresh list
            window.dispatchEvent(new Event("refresh-memories"))
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "Terjadi kesalahan")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="rounded-full shadow-lg fixed bottom-8 right-8 z-40 gap-2 h-14 px-6 md:px-8">
                    <Plus className="h-6 w-6" />
                    <span className="hidden md:inline">Unggah Kenangan</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Abadikan Kenangan</DialogTitle>
                    <DialogDescription>
                        Bagikan momen terbaikmu dari Devcode AI Talk 2025 ke scrapbook digital.
                    </DialogDescription>
                </DialogHeader>

                {!isAuthenticated ? (
                    <div className="flex flex-col items-center justify-center py-10 gap-4">
                        <div className="bg-primary/5 p-4 rounded-full">
                            <UploadCloud className="h-10 w-10 text-primary" />
                        </div>
                        <p className="text-center text-sm text-muted-foreground max-w-[250px]">
                            Kamu perlu menyambungkan Google Drive untuk mengunggah foto.
                        </p>
                        <Button onClick={login} className="w-full">
                            Sambungkan Google Drive
                        </Button>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field: { onChange, value: _value, ...rest } }) => (
                                    <FormItem>
                                        <FormLabel>Foto Kenangan</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => onChange(e.target.files?.[0])}
                                                {...rest}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="caption"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pesan / Caption</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Apa yang sedang terjadi di momen ini?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sedang Diproses...
                                    </>
                                ) : (
                                    "Simpan Kenangan"
                                )}
                            </Button>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    )
}
