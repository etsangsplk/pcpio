const crypto = require('crypto')
const secp256k1 = require('secp256k1')
const utils = require('./utils')

const levelup = require('levelup'); // https://coderead.wordpress.com/2013/04/04/node-js-leveldb/

let db

let genesis = {}

let keys = []


exports.init = function(datadir, _keys){

 db = levelup(datadir)

 if(!_keys){
 	throw "No keys"
 }

 keys.push(_keys)

 console.log("keys",keys)
}

exports.close = function(){	
 db.close()	
}

exports.get_db = function(){
	return db
}


