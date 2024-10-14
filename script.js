
// Menampilkan tanggal saat ini
function displayCurrentDate() {
    const dateLabel = document.getElementById('dateLabel');
    const currentDate = new Date().toLocaleDateString(); // Format tanggal
    dateLabel.textContent = `Tanggal: ${currentDate}`; // Mengupdate konten tanggal
}

// Fungsi untuk menghasilkan nomor transaksi acak
function generateRandomTransactionNumber() {
    const prefix = "TRX"; // Prefix untuk nomor transaksi
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // Membuat nomor acak
    return `${prefix}${randomNumber}`; // Menggabungkan prefix dan nomor acak
}

// Fungsi untuk menghasilkan jumlah bayar acak
function generateRandomAmount() {
    return Math.floor(Math.random() * 1000) + 1; // Menghasilkan jumlah acak antara 1 hingga 1000
}

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
            width: 1.5, // Lebar garis barcode (semakin besar, semakin mudah dipindai)
            height: 80, // Tinggi barcode (dalam piksel)
            displayValue: true, // Menampilkan teks di bawah barcode
            fontSize: 12 // Ukuran font untuk nilai teks
        });

        // Mengupdate jumlah bayar ke nilai baru
        const amountLabel = document.getElementById('amountLabel');
        const randomAmount = generateRandomAmount(); // Menghasilkan jumlah acak
        amountLabel.textContent = `Jumlah Bayar: ${randomAmount}`; // Update label jumlah bayar
    } catch (error) {
        console.error("Gagal menghasilkan barcode:", error);
        alert("Terjadi kesalahan saat menghasilkan barcode. Cek input Anda.");
    }
}

// Event listener untuk tombol generate manual
document.getElementById('generateManual').addEventListener('click', function() {
    const manualInput = document.getElementById('manualInput').value;
    generateBarcode(manualInput); // Menghasilkan barcode berdasarkan input manual
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

    // Cek apakah interval waktu valid
    const intervalTime = parseInt(intervalInput);
    if (isNaN(intervalTime) || intervalTime < 5 || intervalTime > 60) {
        alert('Masukkan waktu interval antara 5 hingga 60 detik!');
        return;
    }

    // Generate barcode setiap interval waktu yang ditentukan oleh pengguna
    let generatedCount = 0; // untuk menghitung jumlah barcode yang dihasilkan
    const interval = setInterval(() => {
        const transactionNumber = generateRandomTransactionNumber(); // Menghasilkan nomor transaksi acak
        generateBarcode(transactionNumber); // Menghasilkan barcode
        generatedCount++;

        // Jika sudah mencapai jumlah barcode yang diinginkan
        if (generatedCount >= barcodeCount) {
            clearInterval(interval); // menghentikan interval
            alert("Generate otomatis selesai!");
            return;
        }
    }, intervalTime * 1000); // interval sesuai waktu yang ditentukan
});

// Menampilkan tanggal saat halaman dimuat
displayCurrentDate();
