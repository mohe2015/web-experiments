import * as QRCode from 'qrcode'

async function tessst() {
  let image = document.getElementById('qrcode') as HTMLImageElement
  image.setAttribute('src', await QRCode.toDataURL('hello'))
}

tessst()