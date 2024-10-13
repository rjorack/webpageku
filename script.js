document.getElementById('generateBarcode').addEventListener('click', function() {
    const barcodeInput = document.getElementById('barcodeInput').value;
    const barcodeCanvas = document.getElementById('barcode');

    // Cek apakah input tidak kosong
    if (barcodeInput.trim() === '') {
        alert('Silakan masukkan nomor transaksi atau teks!');
        return;
    }

    try {
        // Generate barcode menggunakan JsBarcode
        JsBarcode(barcodeCanvas, barcodeInput, {
            format: "CODE128", // Format barcode yang mendukung berbagai jenis karakter
            lineColor: "#000",
            width: 2,
            height: 100,
            displayValue: true
        });
    } catch (error) {
        console.error("Gagal menghasilkan barcode:", error);
        alert("Terjadi kesalahan saat menghasilkan barcode. Cek input Anda.");
    }
});
