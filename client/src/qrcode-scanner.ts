import QrScanner from 'qr-scanner';
QrScanner.WORKER_PATH = '/build/qr-scanner-worker.min.js';

function main() {
  let videoElem = document.getElementsByTagName('video')[0]
  let qrScanner = new QrScanner(videoElem,
    (result: string) => alert('decoded qr code:' + result));
  qrScanner.start()
}

main()