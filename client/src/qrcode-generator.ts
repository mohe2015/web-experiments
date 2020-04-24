import * as QRCode from 'qrcode'

export async function setQRCodeData(data: string) {
  let image = document.getElementById('qrcode') as HTMLImageElement
  image.setAttribute('src', await QRCode.toDataURL(data))

}