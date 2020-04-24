# web-experiments

opening the page creates a link to connect to you
you also send that info to the bootstrap server

if you open that link it asks the bootstrap server
to connect you to that participant

but then the bootstrap server would need to
store lots of data - the bootstrap server only stores the persons it trusts

but everybody can ask it for a persons connection
(they need to trust you first)

maybe just use a dht and only trusted peers can add



TODO
discovery: bootstrap nodes, mdns, random walk on DHT

webrtc: central signaling server / find peer using dht, peer which replied to query should be introducer

https://github.com/libp2p/specs
https://github.com/libp2p/specs/blob/master/rendezvous/README.md
https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/episub.md
https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/README.md
https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.1.md
https://github.com/libp2p/specs/blob/master/relay/README.md

credential-management-api
// https://caniuse.com/#feat=credential-management


openpgp
// https://github.com/openpgpjs/openpgpjs/blob/master/README.md#getting-started
// https://caniuse.com/#feat=cryptography

// don't use because of missing forward secrecy


web-of-trust
// https://en.wikipedia.org/wiki/Web_of_trust
// https://en.wikipedia.org/wiki/Forward_secrecy
// https://en.wikipedia.org/wiki/Off-the-Record_Messaging
// https://en.wikipedia.org/wiki/Double_Ratchet_Algorithm


webauthn

webcryptography


webgl2