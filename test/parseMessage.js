const sip = require("../src/Parse");

let sipMessage = "SIP/2.0 407 Proxy Authentication Required\r\n" +
    "Via: SIP/2.0/WS 689kb420jkpd.invalid;branch=z9hG4bK1431152;rport=52095;received=192.168.1.168\r\n" +
    "To: <sip:34020000001320000001@192.168.1.101>;tag=68aceb725e57449c454dfd8f95119507.f210\r\n" +
    "From: <sip:1003@192.168.1.101>;tag=gtkm6c9t6r\r\n" +
    "Call-ID: dipems35hehk3dm13slr\r\n" +
    "CSeq: 1024 INVITE\r\n" +
    "Proxy-Authenticate: Digest realm=\"192.168.1.101\", nonce=\"XY/93V2P/LFEdR0Iw0bAAw95Al7MCnAC\"\r\n" +
    "Server: kamailio (5.1.8 (x86_64/linux))\r\n" +
    "Content-Length: 0\r\n\r\n";

console.log(sip.parse(sipMessage));
