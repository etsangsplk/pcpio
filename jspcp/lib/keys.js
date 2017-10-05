var crypto = require('crypto')
var secp256k1 = require('secp256k1')

var utils = require('./utils')

exports.genKeyPair=function(){

var privKey

do {
  privKey = crypto.randomBytes(32)
} while (!secp256k1.privateKeyVerify(privKey))

var pubKey = secp256k1.publicKeyCreate(privKey)

return {
	"priv" : privKey,
	"pub"  : pubKey
}

}

exports.genKeyPairSuggest=function(s){

var privKey

do {
  privKey = utils.sha256e(s)
} while (!secp256k1.privateKeyVerify(privKey))

var pubKey = secp256k1.publicKeyCreate(privKey)

return {
	"priv" : privKey,
	"pub"  : pubKey
}

}


exports.toHex = function(kp){
return {
	"priv" : kp.priv.toString('hex'),
	"pub"  : kp.pub.toString('hex')
}
}

exports.fromHex = function(kp){
return {
	"priv" : Buffer.from(kp.priv, 'hex'),
	"pub" : Buffer.from(kp.pub, 'hex')	
}
}

exports.check = function(kp){
if(!secp256k1.privateKeyVerify(kp.priv)){
	console.log("!secp256k1.privateKeyVerify",kp.priv)
	return false
}

var pub = secp256k1.publicKeyCreate(kp.priv)

if( Buffer.compare(pub,kp.pub) == 0){
	return true
}

return false
}