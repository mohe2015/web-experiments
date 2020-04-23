import * as QRCode from 'qrcode'
//import encodeUtf8 from 'encode-utf8';

async function tessst() {
  let image = document.getElementById('qrcode') as HTMLImageElement
  image.setAttribute('src', await QRCode.toDataURL('hello'))

  //encodeUtf8('hi')
}

tessst()