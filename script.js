// Fungsi untuk mengubah input menjadi huruf besar secara otomatis
document.getElementById('barcodeInput').addEventListener('input', function() {
    const inputElement = document.getElementById('barcodeInput');
    inputElement.value = inputElement.value.toUpperCase(); // Ubah input menjadi huruf besar
});

// Fungsi untuk menghasilkan barcode
function generateBarcode(barcodeInput) {
    const barcodeCanvas = document.getElementById('barcode');

    // Kosongkan konten barcode sebelumnya
    barcodeCanvas.innerHTML = '';

    // Cek apakah input tidak kosong
    if (barcodeInput.trim() === '') {
        alert('Silakan masukkan teks atau nomor transaksi!');
        return;
    }

    try {
        // Generate barcode menggunakan JsBarcode
        JsBarcode(barcodeCanvas, barcodeInput, {
            format: "CODE128", // Tetap gunakan format CODE128 yang mendukung berbagai jenis karakter
            lineColor: "#000",
            width: 2,
            height: 100,
            displayValue: true // Menampilkan teks di bawah barcode
        });
    } catch (error) {
        console.error("Gagal menghasilkan barcode:", error);
        alert("Terjadi kesalahan saat menghasilkan barcode. Cek input Anda.");
    }
}

// Event listener untuk tombol generate manual
document.getElementById('generateManual').addEventListener('click', function() {
    const barcodeInput = document.getElementById('barcodeInput').value;
    generateBarcode(barcodeInput);
});

// Event listener untuk tombol generate otomatis
document.getElementById('generateAuto').addEventListener('click', function() {
    const barcodeInput = document.getElementById('barcodeInput').value;

    // Cek apakah input tidak kosong
    if (barcodeInput.trim() === '') {
        alert('Silakan masukkan teks atau nomor transaksi sebelum memulai generate otomatis!');
        return;
    }

    // Generate barcode setiap 5 detik selama 1 menit
    let elapsedTime = 0; // untuk menghitung waktu
    const interval = setInterval(() => {
        if (elapsedTime >= 60) { // 60 detik
            clearInterval(interval); // menghentikan interval setelah 1 menit
            alert("Generate otomatis selesai!");
            return;
        }
        generateBarcode(barcodeInput); // menghasilkan barcode
        elapsedTime += 5; // menambah waktu
    }, 5000); // interval 5 detik
});
