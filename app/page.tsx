import { MemoryList } from "@/components/features/scrapbook";
import { UploadMemory } from "@/components/features/upload-memory";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Ceritakan Momenmu di <span className="text-primary italic">AI Talk 2025</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Selamat datang di digital scrapbook resmi Devcode AI Talk 2025.
            Simpan foto terbaikmu dan lihat kenangan dari teman-teman lainnya.
          </p>
        </div>
      </section>

      {/* Scrapbook Section */}
      <section className="flex-1 bg-background pb-32">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-between px-4 mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Koleksi Kenangan</h2>
            <div className="h-px flex-1 bg-border mx-4 md:block hidden" />
          </div>
          <MemoryList />
        </div>
      </section>

      {/* Fixed Sticky Action */}
      <UploadMemory />
    </div>
  );
}
