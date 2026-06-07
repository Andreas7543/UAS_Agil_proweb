-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Jun 2026 pada 14.53
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lab_inventaris`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `jadwal`
--

CREATE TABLE `jadwal` (
  `id_jadwal` int(11) NOT NULL,
  `mata_kuliah` varchar(100) DEFAULT NULL,
  `nama_dosen` varchar(100) DEFAULT NULL,
  `hari` varchar(20) DEFAULT NULL,
  `jam_mulai` time DEFAULT NULL,
  `jam_selesai` time DEFAULT NULL,
  `id_lab` int(11) DEFAULT NULL,
  `penanggung_jawab` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `jadwal`
--

INSERT INTO `jadwal` (`id_jadwal`, `mata_kuliah`, `nama_dosen`, `hari`, `jam_mulai`, `jam_selesai`, `id_lab`, `penanggung_jawab`) VALUES
(14, 'Pemrograman Web', 'Pak Budi', 'Senin', '08:00:00', '10:00:00', 1, NULL),
(15, 'IOT', 'Bu Sari', 'Senin', '10:00:00', '12:00:00', 2, NULL),
(26, 'Basis Data', 'Pak Tono', 'Rabu', '10:00:00', '12:30:00', 3, 'Agil');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jenis_kerusakan`
--

CREATE TABLE `jenis_kerusakan` (
  `id_jenis` int(11) NOT NULL,
  `nama_kerusakan` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `jenis_kerusakan`
--

INSERT INTO `jenis_kerusakan` (`id_jenis`, `nama_kerusakan`) VALUES
(1, 'Hardware'),
(2, 'Software'),
(3, 'Jaringan');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori_perangkat`
--

CREATE TABLE `kategori_perangkat` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kategori_perangkat`
--

INSERT INTO `kategori_perangkat` (`id_kategori`, `nama_kategori`) VALUES
(1, 'Komputer'),
(2, 'Monitor'),
(3, 'Keyboard'),
(4, 'Mouse');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kerusakan`
--

CREATE TABLE `kerusakan` (
  `id_kerusakan` int(11) NOT NULL,
  `id_perangkat` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_jenis` int(11) DEFAULT NULL,
  `tanggal` varchar(30) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `status` enum('baru','proses','selesai') DEFAULT NULL,
  `biaya` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kerusakan`
--

INSERT INTO `kerusakan` (`id_kerusakan`, `id_perangkat`, `id_user`, `id_jenis`, `tanggal`, `deskripsi`, `status`, `biaya`) VALUES
(1, 1, 1, 1, '2026-05-20', 'Keyboard rusak', 'baru', 150000),
(2, 1, 6, 1, '2025-03-03', 'monitor rusak', 'proses', 100000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `laboratorium`
--

CREATE TABLE `laboratorium` (
  `id_lab` int(11) NOT NULL,
  `nama_lab` varchar(100) NOT NULL,
  `lokasi` varchar(100) DEFAULT NULL,
  `kapasitas` int(11) DEFAULT NULL,
  `status` enum('aktif','nonaktif') DEFAULT 'aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `laboratorium`
--

INSERT INTO `laboratorium` (`id_lab`, `nama_lab`, `lokasi`, `kapasitas`, `status`) VALUES
(1, 'Lab A', 'Gedung A', 30, 'aktif'),
(2, 'Lab B', 'Gedung B', 25, 'aktif'),
(3, 'Lab C', 'Gedung C', 40, 'aktif');

-- --------------------------------------------------------

--
-- Struktur dari tabel `peran`
--

CREATE TABLE `peran` (
  `id_peran` int(11) NOT NULL,
  `nama_peran` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `peran`
--

INSERT INTO `peran` (`id_peran`, `nama_peran`) VALUES
(4, 'admin'),
(5, 'asisten'),
(6, 'mahasiswa');

-- --------------------------------------------------------

--
-- Struktur dari tabel `perangkat`
--

CREATE TABLE `perangkat` (
  `id_perangkat` int(11) NOT NULL,
  `id_lab` int(11) DEFAULT NULL,
  `id_kategori` int(11) DEFAULT NULL,
  `nama_perangkat` varchar(100) DEFAULT NULL,
  `no_seri` varchar(100) DEFAULT NULL,
  `status` enum('tersedia','dipinjam','rusak','perbaikan') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `perangkat`
--

INSERT INTO `perangkat` (`id_perangkat`, `id_lab`, `id_kategori`, `nama_perangkat`, `no_seri`, `status`, `created_at`) VALUES
(1, 1, 1, 'PC ASUS', 'AS001', 'tersedia', '2026-05-17 10:56:21'),
(14, 1, 1, 'PC LENOVO', 'LE001', 'tersedia', '2026-06-05 17:11:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `id_peran` int(11) DEFAULT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` text NOT NULL,
  `status` enum('aktif','nonaktif') DEFAULT 'aktif',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `id_peran`, `nama`, `email`, `password_hash`, `status`, `created_at`, `role`, `password`) VALUES
(1, NULL, 'Agil', 'agil@test.com', '', 'aktif', '2026-05-12 13:08:24', 'mahasiswa', '$2b$10$PGIUqlhRHv53e/osLzTQVuR8Lm.6QHxSuVi/SufsUCEpmS7OQHAF6'),
(3, NULL, '', 'mhs@test.com', '', 'aktif', '2026-05-12 14:26:31', 'mahasiswa', '123'),
(6, NULL, 'Asisten Lab', 'asisten@test.com', '', 'aktif', '2026-05-12 15:05:24', 'asisten', '$2b$10$OspsMBdDMA0rRMWlGEY0E.itmheV0H3TyNbB3lbuq.ONHNMES658S'),
(8, NULL, 'Administrator', 'admin@test.com', '', 'aktif', '2026-05-20 00:58:58', 'admin', '$2b$10$SC9k8yMT6TavcqEOABU7tuowcF04DgnJE3RoXKZ2AcuoDSJoxU9RS');

-- --------------------------------------------------------

--
-- Stand-in struktur untuk tampilan `v_tren_kerusakan`
-- (Lihat di bawah untuk tampilan aktual)
--
CREATE TABLE `v_tren_kerusakan` (
`bulan` varchar(7)
,`jumlah` bigint(21)
);

-- --------------------------------------------------------

--
-- Struktur untuk view `v_tren_kerusakan`
--
DROP TABLE IF EXISTS `v_tren_kerusakan`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_tren_kerusakan`  AS SELECT date_format(`kerusakan`.`tanggal`,'%Y-%m') AS `bulan`, count(0) AS `jumlah` FROM `kerusakan` GROUP BY date_format(`kerusakan`.`tanggal`,'%Y-%m') ;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `jadwal`
--
ALTER TABLE `jadwal`
  ADD PRIMARY KEY (`id_jadwal`),
  ADD KEY `id_lab` (`id_lab`);

--
-- Indeks untuk tabel `jenis_kerusakan`
--
ALTER TABLE `jenis_kerusakan`
  ADD PRIMARY KEY (`id_jenis`);

--
-- Indeks untuk tabel `kategori_perangkat`
--
ALTER TABLE `kategori_perangkat`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indeks untuk tabel `kerusakan`
--
ALTER TABLE `kerusakan`
  ADD PRIMARY KEY (`id_kerusakan`),
  ADD KEY `id_perangkat` (`id_perangkat`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_jenis` (`id_jenis`);

--
-- Indeks untuk tabel `laboratorium`
--
ALTER TABLE `laboratorium`
  ADD PRIMARY KEY (`id_lab`);

--
-- Indeks untuk tabel `peran`
--
ALTER TABLE `peran`
  ADD PRIMARY KEY (`id_peran`),
  ADD UNIQUE KEY `nama_peran` (`nama_peran`);

--
-- Indeks untuk tabel `perangkat`
--
ALTER TABLE `perangkat`
  ADD PRIMARY KEY (`id_perangkat`),
  ADD UNIQUE KEY `no_seri` (`no_seri`),
  ADD KEY `id_lab` (`id_lab`),
  ADD KEY `id_kategori` (`id_kategori`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_peran` (`id_peran`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `jadwal`
--
ALTER TABLE `jadwal`
  MODIFY `id_jadwal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT untuk tabel `jenis_kerusakan`
--
ALTER TABLE `jenis_kerusakan`
  MODIFY `id_jenis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `kategori_perangkat`
--
ALTER TABLE `kategori_perangkat`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `kerusakan`
--
ALTER TABLE `kerusakan`
  MODIFY `id_kerusakan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `laboratorium`
--
ALTER TABLE `laboratorium`
  MODIFY `id_lab` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `peran`
--
ALTER TABLE `peran`
  MODIFY `id_peran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `perangkat`
--
ALTER TABLE `perangkat`
  MODIFY `id_perangkat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `jadwal`
--
ALTER TABLE `jadwal`
  ADD CONSTRAINT `jadwal_ibfk_1` FOREIGN KEY (`id_lab`) REFERENCES `laboratorium` (`id_lab`);

--
-- Ketidakleluasaan untuk tabel `kerusakan`
--
ALTER TABLE `kerusakan`
  ADD CONSTRAINT `kerusakan_ibfk_1` FOREIGN KEY (`id_perangkat`) REFERENCES `perangkat` (`id_perangkat`),
  ADD CONSTRAINT `kerusakan_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `kerusakan_ibfk_3` FOREIGN KEY (`id_jenis`) REFERENCES `jenis_kerusakan` (`id_jenis`);

--
-- Ketidakleluasaan untuk tabel `perangkat`
--
ALTER TABLE `perangkat`
  ADD CONSTRAINT `perangkat_ibfk_1` FOREIGN KEY (`id_lab`) REFERENCES `laboratorium` (`id_lab`),
  ADD CONSTRAINT `perangkat_ibfk_2` FOREIGN KEY (`id_kategori`) REFERENCES `kategori_perangkat` (`id_kategori`);

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_peran`) REFERENCES `peran` (`id_peran`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
