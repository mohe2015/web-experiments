import { makeCall } from './webrtc.mjs'
import { Button } from './custom-elements.mjs'
import { receiveCall } from './webrtc.mjs';

let offer = document.getElementById('offer')
offer.addEventListener('click', (event) => {
    makeCall();
})

let answer = document.getElementById('answer')
answer.addEventListener('click', (event) => {
    receiveCall();
})