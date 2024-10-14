
function generateRandomTransactionNumber() {
    const prefix = "TRX"; 
    const randomNumber = Math.floor(100000 + Math.random() * 900000); 
    return `${prefix}${randomNumber}`; 
}


function generateBarcode(barcodeInput) {
    const barcodeCanvas = document.getElementById('barcode');

    
    barcodeCanvas.innerHTML = '';

    
    if (barcodeInput.trim() === '') {
        alert('Silakan masukkan teks atau nomor transaksi!');
        return;
    }

    try {
        
        JsBarcode(barcodeCanvas, barcodeInput, {
            format: "CODE128", 
            lineColor: "#000",
            width: 1.5, 
            height: 80, 
            displayValue: true, 
            fontSize: 12 
        });
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

    
    let generatedCount = 0;
    const interval = setInterval(() => {
        const transactionNumber = generateRandomTransactionNumber(); 
        generateBarcode(transactionNumber); 
        generatedCount++;

        
        if (generatedCount >= barcodeCount) {
            clearInterval(interval); 
            alert("Generate otomatis selesai!");
            return;
        }
    }, intervalTime * 1000); 
});
