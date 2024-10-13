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
    const intervalInput = document.getElementById('timeInterval').value;

    // Cek apakah input tidak kosong
    if (barcodeInput.trim() === '') {
        alert('Silakan masukkan teks atau nomor transaksi sebelum memulai generate otomatis!');
        return;
    }

    // Cek apakah interval waktu valid
    const intervalTime = parseInt(intervalInput);
    if (isNaN(intervalTime) || intervalTime < 15 || intervalTime > 60) {
        alert('Masukkan waktu interval antara 15 hingga 60 detik!');
        return;
    }

    // Generate barcode setiap interval waktu yang ditentukan oleh pengguna
    let elapsedTime = 0; // untuk menghitung waktu
    const totalInterval = intervalTime * 1000; // total waktu dalam milidetik
    const interval = setInterval(() => {
        generateBarcode(barcodeInput); // menghasilkan barcode

        elapsedTime += 5000; // menambah waktu 5 detik
        if (elapsedTime >= totalInterval) { // jika sudah mencapai total waktu
            clearInterval(interval); // menghentikan interval
            alert("Generate otomatis selesai!");
            return;
        }
    }, 5000); // interval 5 detik
});
