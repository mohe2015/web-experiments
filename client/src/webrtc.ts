// RTCPeerConnection
// RTCDataChannel
// https://webrtc.org/getting-started/peer-connections
// https://webrtc.org/getting-started/data-channels
// https://webrtc.org/getting-started/turn-server
// https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API
// https://w3c.github.io/webrtc-pc/#dom-rtcpeerconnection-generatecertificate
// https://www.w3.org/TR/WebCryptoAPI/#Crypto-method-getRandomValues
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API

//const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}

export async function makeCall() {
    console.log('new RTCPeerConnection()')
    const peerConnection: RTCPeerConnection = new RTCPeerConnection()

    peerConnection.addEventListener('icecandidate', event => {
        console.log('peerConnection.addEventListener(\'icecandidate\'' + event)
        if (event.candidate) {
            console.log(JSON.stringify(event.candidate))
        }
    })

    peerConnection.addEventListener('connectionstatechange', event => {
        console.log('peerConnection.addEventListener(\'connectionstatechange\'' + peerConnection.connectionState)
    })



    peerConnection.addEventListener('negotiationneeded', async event => {
        console.log('peerConnection.addEventListener(\'negotiationneeded\'')
        const offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)
        console.log('offer', JSON.stringify(offer))

        let input = null;
        do {
            input = window.prompt("ICE candidate: ")
            if (input) {
                let rtcIceCandidate = new RTCIceCandidate(JSON.parse(input))
                await peerConnection.addIceCandidate(rtcIceCandidate)
            }
        } while (input)

        let remoteDescription = new RTCSessionDescription(JSON.parse(window.prompt("Remote description: ") as string))
        await peerConnection.setRemoteDescription(remoteDescription);
    })


    peerConnection.createDataChannel('main'); // this initiates negotiationneeded
}

export async function receiveCall() {
    const peerConnection = new RTCPeerConnection()
    console.log('new RTCPeerConnection()')

    peerConnection.addEventListener('icecandidate', event => {
        console.log('peerConnection.addEventListener(\'icecandidate\'' + event)
        if (event.candidate) {
            console.log(JSON.stringify(event.candidate))
        }
    })

    peerConnection.addEventListener('connectionstatechange', event => {
        console.log('peerConnection.addEventListener(\'connectionstatechange\'' + peerConnection.connectionState)
    })



    peerConnection.addEventListener('negotiationneeded', async event => {
        let remoteDescription = new RTCSessionDescription(JSON.parse(window.prompt("Remote description: ") as string))
        peerConnection.setRemoteDescription(new RTCSessionDescription(remoteDescription))
        const answer = await peerConnection.createAnswer()
        await peerConnection.setLocalDescription(answer)

        let input = null;
        do {
            input = window.prompt("ICE candidate: ")
            if (input) {
                let rtcIceCandidate = new RTCIceCandidate(JSON.parse(input))
                await peerConnection.addIceCandidate(rtcIceCandidate)
            }
        } while (input)

        console.log('answer', JSON.stringify(answer))
    })

    peerConnection.createDataChannel('main'); // this initiates negotiationneeded
}
