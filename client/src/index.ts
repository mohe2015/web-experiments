import { makeCall, receiveCall } from './webrtc'

const offer: HTMLElement = document.getElementById('offer') as HTMLElement
offer.addEventListener('click', (event) => {
    makeCall();
})

let answer = document.getElementById('answer') as HTMLElement
answer.addEventListener('click', (event) => {
    receiveCall();
})
