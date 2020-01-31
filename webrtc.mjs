// RTCPeerConnection
// RTCDataChannel
// https://webrtc.org/getting-started/peer-connections
// https://webrtc.org/getting-started/data-channels
// https://webrtc.org/getting-started/turn-server

const bootstrapNodes = ['127.0.0.1:1337'];

export async function makeCall() {
    const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
    const peerConnection = new RTCPeerConnection(configuration);
    /*signalingChannel.addEventListener('message', async message => {
        if (message.answer) {
            const remotetDesc = new RTCSessionDescription(message.answer);
            await peerConnection.setRemoteDescription(remoteDesc);
        }
    });*/
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    //signalingChannel.send({'offer': offer});
    console.log("offer", offer);
}

export async function receiveCall() {
    const peerConnection = new RTCPeerConnection(configuration);
    signalingChannel.addEventListener('message', async message => {
        if (message.offer) {
            peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            signalingChannel.send({'answer': answer});
        }
    });
}