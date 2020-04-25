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
    const peerConnection: RTCPeerConnection = new RTCPeerConnection()
    console.log(peerConnection)

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
        let remoteDescription = new RTCSessionDescription(JSON.parse(window.prompt("Remote description: ") as string))
        await peerConnection.setRemoteDescription(remoteDescription);

        let input = null;
        do {
            input = window.prompt("ICE candidate: ")
            if (input) {
                let rtcIceCandidate = new RTCIceCandidate(JSON.parse(input))
                await peerConnection.addIceCandidate(rtcIceCandidate)
            }
        } while (input)

    })


    let dataChannel = peerConnection.createDataChannel('main'); // this initiates negotiationneeded
    dataChannel.addEventListener('open', event => {
        console.log(event)
        dataChannel.send('HELLO ITS ME I WAS WONDERING IF THIS GETS TO RECEIVERS END IN TIME')
    })
    dataChannel.addEventListener('close', event => {
        console.log(event)
    })
    dataChannel.addEventListener('message', event => {
        console.log(event)
    })
    dataChannel.addEventListener('error', event => {
        console.log(event)
    })
}

export async function receiveCall() {
    const peerConnection = new RTCPeerConnection()
    console.log(peerConnection)

    peerConnection.addEventListener('icecandidate', event => {
        console.log('peerConnection.addEventListener(\'icecandidate\'' + event)
        if (event.candidate) {
            console.log(JSON.stringify(event.candidate))
        }
    })

    peerConnection.addEventListener('connectionstatechange', event => {
        console.log('peerConnection.addEventListener(\'connectionstatechange\'' + peerConnection.connectionState)
    })

    peerConnection.addEventListener('datachannel', event => {
        console.log('datachannel', event)
        let dataChannel = event.channel
        dataChannel.addEventListener('open', event => {
            console.log(event)
            dataChannel.send('HELLO ITS ME I WAS WONDERING IF THIS GETS TO RECEIVERS END IN TIME')
        })
        dataChannel.addEventListener('close', event => {
            console.log(event)
        })
        dataChannel.addEventListener('message', event => {
            console.log(event)
        })
        dataChannel.addEventListener('error', event => {
            console.log(event)
        })
    })

    let remoteDescription = new RTCSessionDescription(JSON.parse(window.prompt("Remote description: ") as string))
    peerConnection.setRemoteDescription(new RTCSessionDescription(remoteDescription))
    const answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

    console.log('answer', JSON.stringify(answer))

    let input = null;
    do {
        input = window.prompt("ICE candidate: ")
        if (input) {
            let rtcIceCandidate = new RTCIceCandidate(JSON.parse(input))
            await peerConnection.addIceCandidate(rtcIceCandidate)
        }
    } while (input)
}
