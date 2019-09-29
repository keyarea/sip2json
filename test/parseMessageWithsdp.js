const sip = require('../src/Parse');
let sipMessage = "INVITE sip:34020000001320000001@192.168.1.101 SIP/2.0\r\n" +
    "Via: SIP/2.0/WS dj4pks27hbb5.invalid;branch=z9hG4bK140210\r\n" +
    "Max-Forwards: 69\r\n" +
    "To: <sip:34020000001320000001@192.168.1.101>\r\n" +
    "From: <sip:1003@192.168.1.101>;tag=e18ic7p7k8\r\n" +
    "Call-ID: kolvcj10d7grp7fg29h0\r\n" +
    "CSeq: 1024 INVITE\r\n" +
    "Authorization: Digest algorithm=MD5, username=\"1003\", realm=\"192.168.8.124\", nonce=\"XYNH/F2DRtD62n4zVnn9zsdZawBqsrdB\", uri=\"sip:192.168.8.124\", response=\"4bff24babee16d63b7375142bf386c77\"\r\n" +
    "Content-Type: application/sdp\r\n" +
    "Allow: INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER,INFO\r\n" +
    "Supported: timer,ice,replaces,outbound\r\n" +
    "User-Agent: JsSIP 3.3.7\r\n" +
    "Content-Length: 203\r\n" +
    "\r\n" +
    "v=0\r\n" +
    "o=1003 0 0 IN IP4 192.168.1.168\r\n" +
    "s=Play\r\n" +
    "c=IN IP4 192.168.1.168\r\n" +
    "t=0 0\r\n" +
    "m=video 6000 RTP/AVP 96 98 97\r\n" +
    "a=recvonly\r\n" +
    "a=rtpmap:96 PS/90000\r\n" +
    "a=rtpmap:98 H264/90000\r\n" +
    "a=rtpmap:97 MPEG4/90000\r\n" +
    "y=0400000001";

console.log(sip.parse(sipMessage));

