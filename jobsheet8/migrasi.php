<?php
require __DIR__ . '/includes/koneksi.php';

$jsonPath = __DIR__ . '/data/buku.json';

if (!file_exists($jsonPath)) {
    die("File buku.json tidak ditemukan!");
}

$jsonContent = file_get_contents($jsonPath);
$bukuList = json_decode($jsonContent, true);

if (empty($bukuList)) {
    die("Data JSON kosong atau format tidak valid.");
}

$sql = "INSERT INTO buku (judul, pengarang, tahun, isbn, stok, kategori) 
        VALUES (:judul, :pengarang, :tahun, :isbn, :stok, :kategori)";
$stmt = $pdo->prepare($sql);

$jumlahBerhasil = 0;

foreach ($bukuList as $buku) {
    $stmt->execute([
        'judul'     => $buku['judul'] ?? '',
        'pengarang' => $buku['pengarang'] ?? '',
        'tahun'     => (int) ($buku['tahun'] ?? 0),
        'isbn'      => $buku['isbn'] ?? null,
        'stok'      => (int) ($buku['stok'] ?? 0),
        'kategori'  => $buku['kategori'] ?? null,
    ]);
    $jumlahBerhasil++;
}

echo "Migrasi selesai! Berhasil memasukkan {$jumlahBerhasil} data buku ke database.";