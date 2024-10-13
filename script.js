document.getElementById('generateQR').addEventListener('click', function() {
    const qrInput = document.getElementById('qrInput').value;
    const qrCanvas = document.getElementById('qrCanvas');

    // Kosongkan canvas sebelum menggambar QR Code baru
    qrCanvas.innerHTML = '';

    // Cek apakah input tidak kosong
    if (qrInput.trim() === '') {
        alert('Silakan masukkan teks atau URL!');
        return;
    }

    // Generate QR Code
    $(qrCanvas).qrcode({
        text: qrInput,
        width: 200,
        height: 200
    });
});
