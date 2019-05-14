const dgram = require('dgram');
var punt = require('punt');
const bh = require('./bufferhelp');
var dns = require('dns');

function PoetClient() {
    var POET_POOL_HEARTBEAT = 5    // heartbeat every 5 seconds, can be 5 sec ~ 50 min (3000 sec)
    var PEER_ADDR_ = None          // ('192.168.1.103',30303)

    this._active = false;

    this.miners = miners;
    this._name = name + '>';
    this._link_no = link_no
    this._coin = coin

    this._last_peer_addr = None

    this._recv_buffer = '';
    this._last_rx_time = 0
    this._last_pong_time = 0

    this._reject_count = 0
    this._last_taskid = 0
    this._time_taskid = 0
    this._compete_src = None

    this.socket = dgram.createSocket('ipv4');

    this.set_peer = set_peer;
}

function set_peer(peer_addr) {
    var ip, port;
    ip = peer_addr[0];
    port = peer_addr[1];

    //todo if else

}

function exit() {
    
}



// dns.lookup('user1-node.nb-chain.net', function (err, address, family) {
//     if (err) console.log(err);
//     console.log(address);//'54.223.32.193', 30302

//     // var server = punt.bind(address+':30302');
//     var a = punt.connect(address + ':30302');
//     var b=bh.hexStrToBuffer('f96e6274');
//     setInterval(() => {
//         console.log(b);
//         a.send(b);
//     }, 2000);
// });
