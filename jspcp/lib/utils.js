var crypto = require('crypto')
var secp256k1 = require('secp256k1')

exports.json2buf=function(o){
	return Buffer.from(JSON.stringify(o),'utf8')
}

exports.buf2json=function(b){
	return JSON.Parse(b.toString('utf8'))
}


exports.sha256=function(m){
	return crypto.createHash('sha256').update(m, 'utf8').digest()
}

exports.sha512=function(m){
  return crypto.createHash('sha512').update(m, 'utf8').digest()
}

exports.sha256e=function(data, encoding) {
    return crypto.createHash('sha256').update(data).digest(encoding)
}
exports.sha512e=function(data, encoding) {
    return crypto.createHash('sha512').update(data).digest(encoding)
}



exports.readPassword=function(cb){
  var stdin = process.stdin,
      stdout = process.stdout;

  stdin.setRawMode(true);
  var password = "";
  stdin.on("data", function(c) {
    c = c + "";
    switch (c) {
      case "\n": case "\r": case "\u0004":
        stdin.setRawMode(false);
        stdin.pause();
        stdout.write("\n");
        cb(password);
        break;
      case "\u0003":
        process.exit();
        break;
      default:
        password += c;
        break;
    }
  });
}

// https://github.com/chris-rock/node-crypto-examples/blob/master/crypto-buffer.js

const algorithm = 'aes-256-ctr'

exports.aes_encrypt_buf=function(buf,pwd){
  var cipher = crypto.createCipher(algorithm,exports.sha256e(pwd))
  return Buffer.concat([cipher.update(buf),cipher.final()]);
}
 
exports.aes_decrypt_buf=function(buf,pwd){
  var decipher = crypto.createDecipher(algorithm,exports.sha256e(pwd))
  return Buffer.concat([decipher.update(buf) , decipher.final()]);
}

exports.xor_buf=function(A,B){
  var C=crypto.randomBytes(32)
  for(var i=0;i<A.length;i++){
    C[i]=A[i]^B[i]
  }
  return C
}

