# Panduan Penggunaan Website Portfolio (New Version)
**Versi Dokumen: 2.0 (Nuxt.js Migration)**

## 1. Pendahuluan
Website ini adalah versi modern dari Portfolio Alya Dijayanti yang telah dimigrasi dari Laravel ke **Nuxt.js (Fullstack)**. Arsitektur ini menggabungkan frontend dan backend dalam satu framework yang efisien, cepat, dan modern.

---

## 2. Spesifikasi Teknis (Tech Stack)
Aplikasi ini menggunakan teknologi terbaru:
*   **Framework**: Nuxt 3 (Vue 3 + Nitro Engine) - Menangani Frontend dan Backend Server sekaligus.
*   **Database**: PostgreSQL - Database relasional yang robust.
*   **Driver Database**: `pg` (node-postgres) - Konektor native Node.js untuk kinerja tinggi.
*   **Styling**: Tailwind CSS - Utility-first CSS framework.

---

## 3. Cara Menjalankan Aplikasi
Berbeda dengan versi Laravel, versi Nuxt ini lebih simpel untuk dijalankan.

### Prasyarat
1.  Pastikan **Node.js** terinstall (v18+).
2.  Pastikan **PostgreSQL** berjalan.
3.  File `.env` sudah dikonfigurasi dengan benar (Lihat `PANDUAN_SETUP_DATABASE.md`).

### Langkah-langkah
1.  **Install Dependency** (hanya pertama kali):
    ```bash
    npm install
    ```

2.  **Setup Database**:
    Jalankan script ini untuk membuat database dan tabel otomatis:
    ```bash
    node scripts/init-db.js
    ```

3.  **Jalankan Server Development**:
    ```bash
    npm run dev
    ```
    *Aplikasi akan berjalan di: http://localhost:3000*

---

## 4. Fitur & Status Migrasi
Saat ini aplikasi sedang dalam tahap migrasi. Berikut adalah status fitur:

### ✅ Tersedia (Completed)
*   **Halaman Beranda (Landing Page)**: Tampilan utama dengan Hero section.
*   **API Projects**: Endpoint `/api/projects` untuk mengambil data dari database PostgreSQL.
*   **Integrasi Database**: Koneksi aktif ke PostgreSQL.

### 🚧 Dalam Pengembangan (Coming Soon)
*   **Admin Dashboard**: Halaman login dan manajemen konten sedang dimigrasi dari Laravel.
*   **Tech Matrix Dinamis**: Sedang disesuaikan dengan struktur data baru.

---

## 5. Struktur Folder Penting
*   `pages/` - Halaman frontend (Vue components).
*   `server/api/` - Backend API endpoints (pengganti Controller Laravel).
*   `server/utils/` - Utilitas backend (koneksi database, dll).
*   `scripts/` - Script bantu untuk maintenance database.
*   `nuxt.config.ts` - Konfigurasi utama aplikasi.

---

## 6. Troubleshooting
*   **Error "password authentication failed"**: Cek password di `.env` dan pastikan sama dengan password PostgreSQL di komputer Anda.
*   **Error "Cannot find module"**: Coba hapus folder `node_modules` dan jalankan `npm install` lagi.
