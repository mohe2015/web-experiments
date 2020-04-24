import * as QRCode from 'qrcode'

export async function setQRCodeData(data: string) {
  let image = document.getElementById('qrcode') as HTMLImageElement
  
  let options: QRCode.QRCodeToDataURLOptions = {
    rendererOpts: { quality: 1 },
    scale: 8,
    errorCorrectionLevel: "H"
  }

  image.setAttribute('src', await QRCode.toDataURL(data, options))

}