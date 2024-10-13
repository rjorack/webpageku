// script.js
document.getElementById('generateBarcode').addEventListener('click', function() {
    const barcodeInput = document.getElementById('barcodeInput').value;
    const barcodeCanvas = document.getElementById('barcode');

    // Cek apakah input tidak kosong
    if (barcodeInput.trim() === '') {
        alert('Silakan masukkan nomor transaksi!');
        return;
    }

    // Generate barcode menggunakan JsBarcode
    JsBarcode(barcodeCanvas, barcodeInput, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: true
    });
});
