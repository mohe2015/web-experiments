import { makeCall, receiveCall } from './webrtc';

let offer = document.getElementById('offer')
offer.addEventListener('click', (event) => {
    makeCall();
})

let answer = document.getElementById('answer')
answer.addEventListener('click', (event) => {
    receiveCall();
})
