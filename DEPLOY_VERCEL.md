# Panduan Deployment ke Vercel & Cloudinary

## 1. Persiapan Cloudinary (Wajib untuk Upload Gambar)

1.  Buka situs [cloudinary.com](https://cloudinary.com/) dan daftar akun (Gratis).
2.  Masuk ke **Dashboard**.
3.  Di bagian atas, Anda akan melihat **"Product Environment Credentials"**.
4.  Copy data ini:
    *   **Cloud Name**
    *   **API Key**
    *   **API Secret**
5.  Simpan data ini.

## 2. Persiapan Database (PostgreSQL)

Vercel membutuhkan database yang di-hosting secara online. Anda bisa menggunakan:
*   **Vercel Postgres** (Bisa dibuat langsung di dashboard Vercel).
*   **Neon** (https://neon.tech) - Gratis tier-nya bagus.
*   **Supabase** (https://supabase.com).

Apapun pilihannya, pastikan Anda mendapatkan URL koneksi database:
`postgres://user:password@host:port/database_name`

## 3. Deployment ke Vercel

1.  Pastikan kode sudah di-push ke GitHub.
2.  Buka [vercel.com](https://vercel.com/) -> **Add New Project**.
3.  Import repository **PortofolioALYA**.
4.  Di pengaturan "Build & Development Settings", pastikan **Root Directory** dipilih **`portfolio`** (karena project Nuxt ada di dalam folder tersebut).
5.  Buka bagian **Environment Variables** dan masukkan:

    | NAME | VALUE |
    | :--- | :--- |
    | `DATABASE_URL` | `postgres://...` (URL Database dari langkah 2) |
    | `CLOUDINARY_CLOUD_NAME` | (dari langkah 1) |
    | `CLOUDINARY_API_KEY` | (dari langkah 1) |
    | `CLOUDINARY_API_SECRET` | (dari langkah 1) |
    | `NUXT_SECRET` | `rahasia123` (bebas, untuk sesi) |

6.  Klik **Deploy**.

## 4. Jalankan Migration (Agar Tabel Terbuat)

Setelah deploy, database di cloud masih kosong. Anda harus menjalankan perintah ini dari laptop Anda (terminal) untuk membuat tabel di database cloud:

1.  Edit file `.env` di laptop Anda sementara.
2.  Ubah `DATABASE_URL` menjadi URL database CLOUD Anda.
3.  Jalankan perintah:
    ```bash
    npx prisma migrate deploy
    ```
4.  Kembalikan `DATABASE_URL` di `.env` ke localhost jika ingin develop lokal lagi.
