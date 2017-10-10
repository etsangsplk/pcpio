var crypto = require('crypto')
var secp256k1 = require('secp256k1')

var utils = require('./utils')
var keys = require('./keys')

exports.priv_to_address=function(priv){
	var pub = secp256k1.publicKeyCreate(priv)
	return exports.pub_to_address(pub)
}

exports.pub_to_address=function(pub){
	var addr=utils.sha256e(pub)
	return addr.slice(-24)
}

exports.gen_new_address=function(){
	var acc=keys.genKeyPair()
	acc.address = exports.pub_to_address(acc.pub)
	return acc
}


