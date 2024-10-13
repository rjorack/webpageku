document.getElementById('generateQR').addEventListener('click', function() {
    const qrInput = document.getElementById('qrInput').value;
    const qrCanvas = document.getElementById('qrCanvas');

    // Kosongkan canvas sebelum menggambar QR Code baru
    qrCanvas.innerHTML = '';

    // Generate QR Code
    $(qrCanvas).qrcode({
        text: qrInput,
        width: 200,
        height: 200
    });
});
