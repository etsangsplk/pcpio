var crypto = require('crypto')
var secp256k1 = require('secp256k1')
var util = require('util');

var keys = require('../lib/keys');
var acc = require('../lib/account');
var utils = require('../lib/utils');

var fs = require("fs");

if (process.argv.length<3){
	console.log("usage: node gen_keypair.js keypair.json")
	process.exit(0)
}

process.stdout.write("enter password:");

utils.readPassword(function(pwd){

if (pwd.length<1){
	console.log("wrong password")
	process.exit(0)	
}

var format = 'hex'


var kp=keys.genKeyPair()



var kp_enc = {
	"priv" : utils.aes_encrypt_buf(kp.priv,pwd),
	"pub"  : kp.pub
}

var kp_enc_json=keys.toHex(kp_enc)
kp_enc_json.enc=true
kp_enc_json.format=format

kp_enc_json.address = acc.pub_to_address(kp.pub).toString('hex')

var si=secp256k1.sign(utils.sha256(kp_enc.priv), kp.priv)
var sg = {
		"rs":si.signature.toString('hex'),
		"re":si.recovery,
		"date":new Date().toISOString()
}

kp_enc_json.sign = sg

var fileName = process.argv[2]


fs.writeFileSync(fileName,JSON.stringify(kp_enc_json, null, ' '));

process.exit(0)		

})

