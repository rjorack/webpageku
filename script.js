// Menampilkan tanggal saat ini di halaman
const date = new Date();
const currentDate = date.toISOString().slice(0, 10); // Format: YYYY-MM-DD
document.getElementById('currentDate').innerText = `Tanggal: ${currentDate}`;

// Fungsi untuk menghasilkan total bayar acak
function generateRandomAmount() {
    return Math.floor(1000 + Math.random() * 9000); // Menghasilkan total bayar antara 1000 hingga 10000
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

    // Generate total bayar acak
    const amount = generateRandomAmount(); 
    document.getElementById('totalAmount').innerText = `Total Bayar: Rp ${amount}`; // Update total bayar

    // Menggabungkan informasi untuk barcode
    const barcodeData = `${currentDate} | WillCloud Market | ${amount} | ${barcodeInput}`;

    try {
        // Generate barcode menggunakan JsBarcode
        JsBarcode(barcodeCanvas, barcodeData, {
            format: "CODE128", // Format barcode
            lineColor: "#000",
            width: 2, // Lebar garis barcode
            height: 100, // Tinggi barcode
            displayValue: true, // Menampilkan teks di bawah barcode
            fontSize: 14 // Ukuran font untuk nilai teks
        });
    } catch (error) {
        console.error("Gagal menghasilkan barcode:", error);
        alert("Terjadi kesalahan saat menghasilkan barcode. Cek input Anda.");
    }
}

// Event listener untuk tombol generate manual
document.getElementById('generateManual').addEventListener('click', function() {
    const manualInput = document.getElementById('manualInput').value; // Input manual
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

// Fungsi untuk menghasilkan nomor transaksi acak
function generateRandomTransactionNumber() {
    const prefix = "TRX"; // Prefix untuk nomor transaksi
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // Membuat nomor acak
    return `${prefix}${randomNumber}`; // Menggabungkan prefix dan nomor acak
}
