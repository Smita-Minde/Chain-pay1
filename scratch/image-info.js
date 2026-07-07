const fs = require('fs');

function getJpegSize(filepath) {
    const buffer = fs.readFileSync(filepath);
    let i = 2; // skip magic FF D8
    while (i < buffer.length) {
        if (buffer[i] !== 0xFF) {
            throw new Error('Invalid JPEG marker: ' + buffer[i].toString(16));
        }
        const marker = buffer[i + 1];
        if (marker === 0xD9 || marker === 0xDA) { // EOI or SOS (start of scan, scan data follows)
            break;
        }
        const length = buffer.readUInt16BE(i + 2);
        // SOF0 (Start of Frame 0) is 0xC0
        // SOF2 (Progressive Start of Frame) is 0xC2
        if (marker === 0xC0 || marker === 0xC2) {
            // height is at offset 5 (2 bytes)
            // width is at offset 7 (2 bytes)
            const height = buffer.readUInt16BE(i + 5);
            const width = buffer.readUInt16BE(i + 7);
            return { width, height };
        }
        i += 2 + length;
    }
    throw new Error('SOF marker not found');
}

try {
    console.log('ecommerce.gif:', getJpegSize('public/images/ecommerce.gif'));
} catch (e) {
    console.error('GIF (JPEG) error:', e.message);
}

try {
    console.log('ecommerce_crypto_payment.png:', getJpegSize('public/images/ecommerce_crypto_payment.png'));
} catch (e) {
    console.error('PNG (JPEG) error:', e.message);
}
