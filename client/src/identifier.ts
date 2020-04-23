function bufferToHex (buffer: Uint8Array) {
  return Array
      .from (buffer)
      .map (b => b.toString (16).padStart (2, "0"))
      .join ("");
}

// TODO persistent storage and quota estimation
function uniqueIdentifier(): string {
  return bufferToHex(crypto.getRandomValues(new Uint8Array(16)))
}

export default function getIdentifier(): string {
  let currentValue: string | null = window.localStorage.getItem('uuid')
  if (currentValue) {
    return currentValue
  }
  let newValue: string = uniqueIdentifier()
  window.localStorage.setItem('uuid', newValue)
  return newValue
}