var crypto = require('crypto')
var secp256k1 = require('secp256k1')
var util = require('util');
var fs = require("fs");

var keys = require('../lib/keys');
var utils = require('../lib/utils');



if (process.argv.length<3){
	console.log("usage: node test_keypair.js keypair.json")
	process.exit(0)
}


let kp_json
try{
  kp_json=JSON.parse(fs.readFileSync(process.argv[2]))
} catch(e){
  console.log(e)
  process.exit(0)   
}

if (!kp_json){
  throw "No keys"
}


if (kp_json.format != "hex"){
  throw "No hex format"  
}

let kp_hex=keys.fromHex(kp_json)


if(kp_json.enc){

process.stdout.write("enter password:");

utils.readPassword(function(pwd){

if (pwd.length<1){
	console.log("wrong password")
	process.exit(0)	
}

var kp_dec = {
	"priv" : utils.aes_decrypt_buf(kp_hex.priv,pwd),
	"pub"  : kp_hex.pub
}

  if(!keys.check(kp_dec)){
    console.log('!keys.check')
    process.exit(0) 
  }

  console.log('ok')

})


} else {

  if(!keys.check(kp_hex)){
    console.log('!keys.check')
    process.exit(0) 
  }

  console.log('ok')

}

