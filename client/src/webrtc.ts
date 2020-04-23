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
    const cert = await RTCPeerConnection.generateCertificate({
        name: 'RSASSA-PKCS1-v1_5',
        // @ts-ignore
        hash: 'SHA-256',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1])
    })
    console.log(cert);

    const peerConnection = new RTCPeerConnection({certificates: [cert]})

    peerConnection.addEventListener('negotiationneeded', async event => {
        const offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)
        prompt('copy', JSON.stringify(offer))

        let remoteDescription = new RTCSessionDescription(JSON.parse(window.prompt("Remote description: ") as string))
        await peerConnection.setRemoteDescription(remoteDescription);
    })

    peerConnection.addEventListener('connectionstatechange', event => {
        alert(peerConnection.connectionState)
    })

    peerConnection.addEventListener('icecandidate', event => {
        console.log(event)
    })

    var channel = peerConnection.createDataChannel("main")
    channel.onopen = function(event) {
        channel.send('1')
    }
    channel.onclose = function(event) {
        console.log(event)
    }
    channel.onerror = function(event) {
        console.log(event)
    }
    channel.onmessage = function(event) {
        console.log(event.data)
    }
}

export async function receiveCall() {
    const cert = await RTCPeerConnection.generateCertificate({
        name: 'RSASSA-PKCS1-v1_5',
        // @ts-ignore
        hash: 'SHA-256',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1])
    })
    console.log(cert); // basically your peer identifier

    const peerConnection = new RTCPeerConnection({certificates: [cert]})

    let remoteDescription = new RTCSessionDescription(JSON.parse(window.prompt("Remote description: ") as string))
    peerConnection.setRemoteDescription(new RTCSessionDescription(remoteDescription))
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    prompt('copy', JSON.stringify(answer))

    peerConnection.addEventListener('icecandidate', event => {
        console.log(event)
        if (event.candidate) {
            // send to remote
        }
    })

    peerConnection.addEventListener('connectionstatechange', event => {
        alert(peerConnection.connectionState)
    })

    peerConnection.addEventListener('datachannel', (event: RTCDataChannelEvent) => {
        event.channel.addEventListener('open', function(e) {
            event.channel.send('2')
        })
        event.channel.onclose = function(event) {
            console.log(event)
        }
        event.channel.onerror = function(event) {
            console.log(event)
        }
        event.channel.onmessage = function(event) {
            console.log(event.data)
        }
    })

}
