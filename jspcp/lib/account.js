var crypto = require('crypto')
var secp256k1 = require('secp256k1')

var utils = require('./utils')

exports.priv_to_address=function(priv){
	var pub = secp256k1.publicKeyCreate(priv)
	return exports.pub_to_address(pub)
}

exports.pub_to_address=function(pub){
	var addr=utils.sha256e(pub)
	return addr.slice(-24)
}

