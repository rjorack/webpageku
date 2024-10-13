// script.js
document.getElementById('generateQR').addEventListener('click', function() {
    const qrInput = document.getElementById('qrInput').value;
    const qrCanvas = document.getElementById('qrCanvas');

    // Kosongkan canvas sebelum menggambar QR Code baru
    qrCanvas.innerHTML = '';

    // Cek apakah input tidak kosong
    if (qrInput.trim() === '') {
        alert('Silakan masukkan kode transaksi atau URL!');
        return;
    }

    // Generate QR Code untuk transaksi atau URL
    $(qrCanvas).qrcode({
        text: qrInput,
        width: 150,
        height: 150
    });
});
