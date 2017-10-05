const crypto = require('crypto')
const secp256k1 = require('secp256k1')
const utils = require('./utils')
const acc = require('./account')

exports.sign = function(tx,priv){
    let h = utils.sha256(JSON.stringify(tx.d))
	let si=secp256k1.sign(h, priv)
	let sg = {
		"rs":si.signature.toString('hex'),
		"re":si.recovery,
		"address":acc.priv_to_address(priv),
		"date":new Date().toISOString(),
		"alg":"secp256k1"}

	if(!("signs" in tx)){
		tx.signs=[]
	}
	tx.signs.push(sg)
}


exports.verify = function(tx) {
  	let th = utils.sha256(JSON.stringify(tx.d))
	for(let i=0;i<tx.signs.length;i++){
		let sg=tx.signs[i]
		let rs=Buffer.from(sg.rs, 'hex');
		if(!("re" in sg))return false
		let pub=secp256k1.recover(th, rs, sg.re)		
		if(!secp256k1.verify(th, rs, pub))return false
	}
	return true
}

