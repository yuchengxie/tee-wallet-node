
const smartcard = require('smartcard');
const CTime = require('china-time');
const bh = require('./bufferhelp');
const hexify = require('hexify');
const Devices = smartcard.Devices;
const Iso7816Application = smartcard.Iso7816Application;

const devices = new Devices();
const CommandApdu = smartcard.CommandApdu;
var application;

// var SELECT = '00A404000ED196300077130010000000020101';
var SELECT = 'D196300077130010000000020101';
var account_command = '8022000000';
var getPubAddr = '80220200020000';
var pub_key = ''
// var GET_RESPONSE = [0x00, 0xc0, 0, 0];
var GET_RESPONSE = '0x00c00000';
var cmd = 'get account';

var __time__ = () => { return `${CTime("YYYY-MM-DD HH:mm:ss")}` };

// device - card
devices.on('device-activated', event => {
    const currentDevices = event.devices;
    let device = event.device;

    console.log(`>>> [${__time__()}] Device :'${device}' Activated`);
    console.log(`>>> [${__time__()}] CurrentDevices:'${currentDevices}'`);

    device.on('card-inserted', event => {
        var card = event.card;
        application = new Iso7816Application(card);

        console.log(`>>> [${__time__()}] Card '${card.getAtr()}' Inserted into '${event.device}'`);

        card.on('command-issued', event => {
            // console.log('event:',event);
            console.log(`>>> [${__time__()}] Command issued '${event.command}' to '${event.card}'`);
        })

        var iLoop = 0;
        var result = '';

        card.on('response-received', event => {

            result = event.response.data;
            if (result = '9000') {
                console.log(`>>> [${__time__()}] Response '${event.response}' received from '${event.card}' --- in response to Command '${event.command}'`);
                return result;
            }
            var res_buf = event.response.buffer;
            if (res_buf[0] == 0x61 && iLoop < 32) {
                var sw2 = bh.bufToStr(res_buf.slice(1));
                var s = GET_RESPONSE + sw2;
                console.log('>>> GET_RESPONSE + [sw2]:', s);
                iLoop++;
                return application.issueCommand(new CommandApdu({ bytes: hexify.toByteArray(s) })).then(res => {
                    result += res;
                })
            }
            console.log('>>> final result:', result);
            return result;
        })



        application.selectFile(hexify.toByteArray(SELECT))
            .then(res => {
                if (res) {
                    // return application.issueCommand(new CommandApdu({ bytes: hexify.toByteArray(account_command) }));
                    return application.issueCommand(str_commandApdu(account_command));
                }
            })
            .then(res => {
                // console.log('>>> res:', res.data);
                console.log(`>>> [${__time__()}] Final Response '${res.data}' received from '${event.card}' --- in response to Command '${cmd}'`);
            })
            .catch(error => {
                console.error(`>>> [${__time__()}] Error:,'${error}', '${error.stack}'`);
            })
    })

    device.on('card-removed', event => {
        console.log(`>>> [${__time__()}] Card remove from '${event.name}'`);
    })

})

devices.on('device-deactivated', event => {
    console.log(`>>> [${__time__()}] Device '${event.device}' Deactivated`);
})


function str_commandApdu(str) {
    return new CommandApdu({ bytes: hexify.toByteArray(str) })
}
