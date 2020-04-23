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

    peerConnection.addEventListener('negotiationneeded', async event => {
        console.log('peerConnection.addEventListener(\'negotiationneeded\'')
        const offer = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offer)
        prompt('copy', JSON.stringify(offer))

        let remoteDescription = new RTCSessionDescription(JSON.parse(window.prompt("Remote description: ") as string))
        await peerConnection.setRemoteDescription(remoteDescription);
    })

    peerConnection.addEventListener('connectionstatechange', event => {
        console.log('peerConnection.addEventListener(\'connectionstatechange\'' + peerConnection.connectionState)
    })

    peerConnection.addEventListener('icecandidate', event => {
        console.log('peerConnection.addEventListener(\'icecandidate\'' + event)
    })

    var channel: RTCDataChannel = peerConnection.createDataChannel("main")
    console.log('peerConnection.createDataChannel("main")')
    channel.onopen = function(event) {
        console.log('channel.onopen')
        channel.send('1')
    }
    channel.onclose = function(event) {
        console.log('channel.onclose' + event)
    }
    channel.onerror = function(event) {
        console.log('channel.onerror' + event)
    }
    channel.onmessage = function(event) {
        console.log('channel.onmessage' + event.data)
    }
}

export async function receiveCall() {
    const peerConnection = new RTCPeerConnection()
    console.log('new RTCPeerConnection()')

    let remoteDescription = new RTCSessionDescription(JSON.parse(window.prompt("Remote description: ") as string))
    peerConnection.setRemoteDescription(new RTCSessionDescription(remoteDescription))
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)
    prompt('copy', JSON.stringify(answer))

    peerConnection.addEventListener('icecandidate', event => {
        console.log('peerConnection.addEventListener(\'icecandidate\'' + event)
        if (event.candidate) {
            // TODO send to remote
        }
    })

    peerConnection.addEventListener('connectionstatechange', event => {
        console.log('peerConnection.addEventListener(\'connectionstatechange\'' + peerConnection.connectionState)
    })

    peerConnection.addEventListener('datachannel', (event: RTCDataChannelEvent) => {
        console.log('peerConnection.addEventListener(\'datachannel\'')
        let channel = event.channel
        channel.onopen = function(event) {
            console.log('channel.onopen')
            channel.send('1')
        }
        channel.onclose = function(event) {
            console.log('channel.onclose' + event)
        }
        channel.onerror = function(event) {
            console.log('channel.onerror' + event)
        }
        channel.onmessage = function(event) {
            console.log('channel.onmessage' + event.data)
        }
    })

}
