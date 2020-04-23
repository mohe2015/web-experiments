import { makeCall, receiveCall } from './webrtc';
const offer = document.getElementById('offer');
offer.addEventListener('click', (event) => {
    makeCall();
});
let answer = document.getElementById('answer');
answer.addEventListener('click', (event) => {
    receiveCall();
});
//# sourceMappingURL=index.js.map