CERITANYA:
Aku ingin membuat website scrapbook digital sederhana, dengan nama website nya Kenangan Devcode AI Talk 2025. dengan fitur sebagai berikut:
1. Data di simpan ke database.
2. Hanya ada satu halaman (tidak termasuk page callback page) saja berisi modal popup form unggah kenangan dan list unggahan kenangan.
3. Upload gambar menggunakan google drive oauth, yang mana user connect terlebih dahulu ke google drive lalu gambar tersebut akan di upload terlebih dahulu ke google drive masing masing pengguna dan harus support di tampilkan lagi di website dengan tech next 15.


STRUCTURE DATABASE:
Buat Planing khusus database terlebih dahulu berbentuk file database.md (jangan langsung eksekusi) untuk database ai-talks, database akan menggunakan supabase dan buatkan structure connection supabase nya dari env yang di sediakan. Harapan saya ada satu tabel yaitu Memory (gunakan bahasa inggris).

Gunakan prisma versi 6.x untuk membuat migrations nya (tidak perlu menggunakan prisma config).
Dengan .env database seperti berikut:
DATABASE_URL=
DIRECT_URL=




SOFTWARE REQUIREMENT:
Buatkan saya beberapa planing yang di masukan ke file .md untuk membuat tampilan website Kenangan Devcode AI Talk 2025 bertema scrapbook digital, dengan tampilan yang modern dan sederhana dari sturktur folder sampai rencana pembangunannya.

berikut beberapa tools dan aturan yg harus anda gunakan:
1. next.js v15+ app route versi terbaru support dengan bahasa pemrograman typescript (sudah saya install)
2. tailwind css versi terbaru.
3. Next js ini harus bisa handle backend api dan menggunakan prisma.
4. Gunakan konsep re-use components
5. Gunakan konsep hooks
6. Gunaan konsep stores
7. Gunakan zod untuk validasi input form
8. Gunakan format penamaan folder “/kebab-case/index.tsx”
9. Components yang bisa di gunakan di semua file maka masuk ke “/components/shared”, selebihnya bisa masuk ke “/components/features”.
10. Hanya ada satu halaman saja berisi unggah kenangan dan list unggahan kenangan.
11. Upload gambar menggunakan google drive oauth, yang mana user connect terlebih dahulu ke google drive lalu gambar tersebut akan di upload terlebih dahulu ke google drive masing masing pengguna dan url nya (contoh: “https://drive.google.com/uc?export=view&id=1GH7GkNWeA-W4zovYWdIHzbyynaFgqFBK” -> harus support di tampilkan oleh next js) akan disimpan di database.
12 .Component menggunakan Shadcn UI supports dark dan light mode.
13. Color palette dominan warna putih modern simple.
14. Gunakan font Inter dan icon react jika icon dari shadcn tidak tersedia.

Page yang harus ada hanya:
/ (Lending page)

ENV yang akan ada di project ini:
NEXT_PUBLIC_OAUTH_REDIRECT_URL=http://localhost:3000/auth/google/callback
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=
DATABASE_URL=
DIRECT_URL=
