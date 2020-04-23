import * as QRCode from 'qrcode'

const generateQR = async (text: string) => {
  try {
    console.log(await QRCode.toDataURL(text))
  } catch (err) {
    console.error(err)
  }
}

console.log(generateQR('hallo'))