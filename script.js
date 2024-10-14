// Menampilkan tanggal saat ini
function tampilkanTanggalSaatIni() {
    const dateLabel = document.getElementById('dateLabel');
    const tanggalSaatIni = new Date().toLocaleDateString(); // Format tanggal
    dateLabel.textContent = `Tanggal: ${tanggalSaatIni}`; // Update konten tanggal
}

// Generate nomor transaksi acak
function generateNomorTransaksiAcak() {
    const prefix = "TRX"; // Awalan untuk nomor transaksi
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // Membuat nomor acak
    return `${prefix}${randomNumber}`; // Gabungkan awalan dan nomor acak
}

// Generate jumlah bayar acak
function generateJumlahBayarAcak() {
    return Math.floor(Math.random() * 1000) + 1; // Generate jumlah bayar antara 1 hingga 1000
}

// Generate barcode
function generateBarcode(barcodeInput) {
    const barcodeCanvas = document.getElementById('barcode');

    // Kosongkan barcode sebelumnya
    barcodeCanvas.innerHTML = '';

    // Cek apakah input tidak kosong
    if (barcodeInput.trim() === '') {
        alert('Silakan masukkan teks atau nomor transaksi!');
        return;
    }

    try {
        // Generate barcode menggunakan JsBarcode
        JsBarcode(barcodeCanvas, barcodeInput, {
            format: "CODE128", // Format CODE128 untuk mendukung berbagai karakter
            lineColor: "#000",
            width: 1.5, // Lebar garis barcode (lebih besar agar mudah dipindai)
            height: 80, // Tinggi barcode (dalam piksel)
            displayValue: true, // Tampilkan teks di bawah barcode
            fontSize: 12 // Ukuran font untuk teks nilai
        });

        // Update jumlah bayar ke nilai baru
        const amountLabel = document.getElementById('amountLabel');
        const randomAmount = generateJumlahBayarAcak(); // Generate jumlah acak
        amountLabel.textContent = `Jumlah Bayar: $${randomAmount}`; // Update label jumlah
    } catch (error) {
        console.error("Gagal menghasilkan barcode:", error);
        alert("Terjadi kesalahan saat menghasilkan barcode. Cek input Anda.");
    }
}

// Event listener untuk tombol generate manual
document.getElementById('generateManual').addEventListener('click', function() {
    const manualInput = document.getElementById('manualInput').value;
    generateBarcode(manualInput); // Generate barcode berdasarkan input manual
});

// Event listener untuk tombol generate otomatis
document.getElementById('generateAuto').addEventListener('click', function() {
    const barcodeCount = parseInt(document.getElementById('barcodeCount').value);
    const intervalInput = document.getElementById('timeInterval').value;

    // Cek apakah jumlah barcode valid
    if (isNaN(barcodeCount) || barcodeCount < 1 || barcodeCount > 50) {
        alert('Masukkan jumlah barcode antara 1 hingga 50!');
        return;
    }

    // Cek apakah waktu interval valid
    const intervalTime = parseInt(intervalInput);
    if (isNaN(intervalTime) || intervalTime < 5 || intervalTime > 60) {
        alert('Masukkan waktu interval antara 5 hingga 60 detik!');
        return;
    }

    // Generate barcode pada interval yang ditentukan oleh pengguna
    let generatedCount = 0; // untuk menghitung jumlah barcode yang dihasilkan
    const interval = setInterval(() =>
