DOKUMENTASI PEMBUATAN SISTEM MANAJEMEN INVENTARIS LABORATORIUM KOMPUTER

1. ANALISIS KEBUTUHAN SISTEM

Sistem Manajemen Inventaris Laboratorium Komputer dibuat untuk membantu pengelolaan laboratorium akademik secara terpusat. Sistem ini menyediakan pengelolaan data perangkat, jadwal penggunaan laboratorium, laporan kerusakan perangkat, serta monitoring kondisi laboratorium melalui dashboard.

Tujuan sistem:

• Mengelola inventaris perangkat laboratorium.
• Mengelola jadwal penggunaan laboratorium.
• Mencatat kerusakan perangkat.
• Menampilkan statistik kondisi laboratorium.
• Menerapkan hak akses berdasarkan peran pengguna.

2. PERANCANGAN DATABASE

Database yang digunakan adalah MySQL dengan nama database:

lab_inventaris

Tabel yang digunakan:

a. users

Berfungsi menyimpan data pengguna sistem.

Atribut:
• id
• nama
• email
• password
• role

b. laboratorium

Berfungsi menyimpan data laboratorium.

Atribut:
• id_lab
• nama_lab
• lokasi

c. kategori_perangkat

Berfungsi menyimpan kategori perangkat.

Atribut:
• id_kategori
• nama_kategori

d. perangkat

Berfungsi menyimpan inventaris perangkat laboratorium.

Atribut:
• id_perangkat
• nama_perangkat
• no_seri
• id_lab
• id_kategori
• status

e. jadwal

Berfungsi menyimpan jadwal penggunaan laboratorium.

Atribut:
• id_jadwal
• mata_kuliah
• nama_dosen
• hari
• jam_mulai
• jam_selesai
• id_lab
• penanggung_jawab

f. jenis_kerusakan

Berfungsi menyimpan kategori kerusakan.

Atribut:
• id_jenis
• nama_jenis

g. kerusakan

Berfungsi mencatat laporan kerusakan perangkat.

Atribut:
• id_kerusakan
• id_perangkat
• id_user
• id_jenis
• tanggal
• deskripsi
• status
• biaya

3. PERANCANGAN HAK AKSES

Sistem menggunakan autentikasi berbasis JWT.

Role yang tersedia:

a. Admin Lab

Hak akses:

• Melihat dashboard.
• CRUD jadwal.
• CRUD perangkat.
• CRUD kerusakan.

b. Asisten Lab

Hak akses:

• Melihat dashboard.
• Menambah jadwal.
• Mengedit jadwal.
• Melihat perangkat.
• Menambah kerusakan.
• Melihat kerusakan.

c. Mahasiswa

Hak akses:

• Melihat jadwal laboratorium saja.

4. PEMBUATAN BACKEND

Framework yang digunakan:

• Node.js
• Express.js
• MySQL2
• JWT
• BcryptJS

Struktur folder:

src/
├── config/
├── controllers/
├── middleware/
├── routes/
├── app.js

5. PEMBUATAN AUTENTIKASI

Fitur autentikasi terdiri dari:

a. Register

Pengguna baru disimpan ke tabel users.

Password dienkripsi menggunakan bcrypt.

b. Login

Sistem memverifikasi email dan password.

Jika valid maka sistem membuat JWT Token yang berisi:

• id pengguna
• email
• role pengguna

6. PEMBUATAN MIDDLEWARE

Middleware Authentication

Fungsi:

• Memvalidasi JWT.
• Mengambil informasi user dari token.

Middleware Authorization

Fungsi:

• Membatasi akses berdasarkan role.
• Mengatur hak akses admin, asisten, dan mahasiswa.

7. PEMBUATAN FITUR JADWAL LAB

Fitur:

• Menampilkan jadwal laboratorium.
• Menambah jadwal.
• Mengubah jadwal.
• Menghapus jadwal.

Data yang ditampilkan:

• Mata kuliah
• Dosen
• Hari
• Jam
• Laboratorium
• Penanggung jawab

8. PEMBUATAN FITUR INVENTARIS PERANGKAT

Fitur:

• Menampilkan perangkat.
• Menambah perangkat.
• Mengubah perangkat.
• Menghapus perangkat.

Data yang ditampilkan:

• Nama perangkat
• Nomor seri
• Laboratorium
• Kategori
• Status

9. PEMBUATAN FITUR KERUSAKAN

Fitur:

• Menampilkan laporan kerusakan.
• Menambah laporan kerusakan.
• Mengubah status kerusakan.
• Menghapus laporan kerusakan.

Status kerusakan:

• Baru
• Proses
• Selesai

Saat kerusakan dibuat, status perangkat otomatis berubah menjadi:

Rusak

Saat kerusakan selesai diperbaiki, status perangkat kembali menjadi:

Aktif

10. PEMBUATAN DASHBOARD

Dashboard digunakan untuk monitoring laboratorium.

Informasi yang ditampilkan:

a. Total Perangkat

Menghitung seluruh perangkat yang tersedia.

b. Peminjaman Aktif

Menggunakan jumlah data jadwal laboratorium sebagai representasi penggunaan laboratorium.

c. Total Kerusakan

Menghitung seluruh laporan kerusakan.

d. Total Laboratorium

Menghitung jumlah laboratorium yang tersedia.

11. VISUALISASI DATA

Dashboard menggunakan Chart.js.

Jenis grafik:

Pie Chart

Data yang divisualisasikan:

• Total perangkat
• Total jadwal
• Total kerusakan
• Total laboratorium

12. IMPLEMENTASI SIDEBAR

Sidebar ditampilkan hanya untuk:

• Admin Lab
• Asisten Lab

Menu Sidebar:

• Jadwal Lab
• Data Perangkat
• Data Kerusakan

Konten dashboard tetap ditampilkan pada bagian atas.

Saat menu dipilih, hanya tabel yang berubah tanpa me-refresh halaman.

13. IMPLEMENTASI ROLE BADGE

Pada bagian kanan atas dashboard ditambahkan badge role pengguna.

Contoh:

Admin Lab

Asisten Lab

Mahasiswa

Role diambil langsung dari JWT setelah login.

14. PENGUJIAN SISTEM

Pengujian dilakukan pada tiga role:

Admin Lab

• Login berhasil.
• Dashboard tampil.
• CRUD jadwal berhasil.
• CRUD perangkat berhasil.
• CRUD kerusakan berhasil.

Asisten Lab

• Login berhasil.
• Dashboard tampil.
• Tambah jadwal berhasil.
• Tambah kerusakan berhasil.
• Tidak dapat menghapus perangkat.

Mahasiswa

• Login berhasil.
• Hanya melihat jadwal laboratorium.
• Tidak dapat mengakses dashboard.
• Tidak dapat mengakses perangkat.
• Tidak dapat mengakses kerusakan.

15. HASIL AKHIR SISTEM

Sistem berhasil mengimplementasikan:

• Autentikasi JWT.
• Manajemen inventaris perangkat.
• Manajemen jadwal laboratorium.
• Manajemen kerusakan perangkat.
• Dashboard monitoring laboratorium.
• Visualisasi statistik menggunakan Chart.js.
• Pembatasan akses berbasis role.
• Sidebar navigasi dinamis.
• Monitoring kondisi laboratorium secara real time.
