
const bitcoinjs = require('bitcoinjs-lib');
const sha512 = require('js-sha512');
const bs58 = require('bs58');
const bh = require('./bufferhelp');

function publickey_to_address(publickey, vcn, cointype = 0x00, version = 0x00) {
    var pubHash;
    if (vcn == undefined) {
        pubHash = bitcoinjs.crypto.ripemd160(publickey);
        var s = version + pubHash;
        var m = bs58.encode(s);
        return m;
    } else {
        var hashbuf = sha512.array(pubbuf);
        var s1 = new ripemd160().update(Buffer.from(hashbuf.slice(0, 32), 'hex')).digest();
        var s2 = new ripemd160().update(Buffer.from(hashbuf.slice(32, 64), 'hex')).digest();
        var hi = (vcn & 0xffff) / 256;
        var lo = (vcn & 0xffff) % 256;
        var buf0 = bh.hexToBuffer(sha256(Buffer.concat([s1, s2])));

        var v = Buffer.concat([Buffer.from([version]), Buffer.from([hi, lo]), buf0, Buffer.from([cointype])]);

        var d1buf = bufferhelp.hexToBuffer(sha256(v));
        var checksum = bufferhelp.hexToBuffer(sha256(d1buf)).slice(0, 4);
        var result = Buffer.concat([v, checksum]);
        var addr = bs58.encode(result);
        return addr;
    }
}

module.exports = {
    publickey_to_address
}