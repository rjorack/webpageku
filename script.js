// Fungsi untuk mengubah input menjadi huruf besar secara otomatis
document.getElementById('barcodeInput').addEventListener('input', function() {
    const inputElement = document.getElementById('barcodeInput');
    inputElement.value = inputElement.value.toUpperCase(); // Ubah input menjadi huruf besar
});

// Event listener untuk tombol generate barcode
document.getElementById('generateBarcode').addEventListener('click', function() {
    const barcodeInput = document.getElementById('barcodeInput').value;
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
});
