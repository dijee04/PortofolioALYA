-- 1. Buat Tabel Users (Jika Belum Ada)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Masukkan User Admin Baru
-- Password default adalah: password
-- Hash: $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi (Standard Bcrypt)

INSERT INTO users (name, email, password, created_at, updated_at)
VALUES (
    'Alya Dijayanti',
    'alyadijayanti4@gmail.com',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    NOW(),
    NOW()
)
ON CONFLICT (email) DO UPDATE
SET 
    name = EXCLUDED.name,
    password = EXCLUDED.password;

-- 3. Cek hasil
SELECT * FROM users;
