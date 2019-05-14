
const utilkey = require('./utilkey');

function PseudoWallet(pubkey, pubHash, vcn = 0) {
    this.pub_key = pubkey;
    this.pub_hash = pubHash;
    this._vcn = vcn;
    this.coin_type = 0x00; // fixed to '00'

    this.pub_addr = utilkey.publickey_to_address(this.pub_key, this._vcn, this.coin_type, 0x00);
    this.pin_code = '000000'; //always reset to '000000'

    this.sign = sign;

}

PseudoWallet.prototype.address = function () {
    return this.pub_addr;
}

PseudoWallet.prototype.publicHash = function () {
    return this.pub_hash;
}

PseudoWallet.prototype.publicKey = function () {
    return this.pub_key;
}

function sign() {
    //todo
}

function _startMing() {
    var gPseudoWallet, gPoetClient;
    try {
        pubKey = getPubKey()
        pubHash = getPubKeyHash()
    } catch (err) {
        console.log('warning: start mining failed (invalid account)');
        return;
    }
    //todo
    console.log('mining task starting ...')
}


function TeeMiner(pubHash) {
    this.SUCC_BLOCKS_MAX = 256;

    this.check_elapsed = check_elapsed;

}

function check_elapsed(self, block_hash, bits, txn_num, curr_tm = None, sig_flag = 0x00, hi = 0) {

}


