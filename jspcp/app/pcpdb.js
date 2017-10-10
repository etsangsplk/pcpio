const version = "0.0.1"


const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
      util         = require('util'),
      env          = process.env;

var express = require('express')
var bodyParser = require('body-parser')
var app = express()

//app.use(bodyParser.json()) // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw({type:'application/*'}))
app.use(bodyParser.raw({}))


app.get('/', function (req, res) {
  res.writeHead(200);
  res.end()  
})

app.get('/health', function (req, res) {
  res.writeHead(200)
  res.end()  
})

app.get('/api/version', function (req, res) {
 res.json({"version":version,"status":"ok"});
});


const levelup = require('levelup') 

var db;

const crypto = require('crypto')
const secp256k1 = require('secp256k1')


const commandLineArgs = require('command-line-args')
//const core = require('./lib/core')
const keys = require('../lib/keys')
const utils =  require('../lib/utils')


// curl -v -X POST http://127.0.0.1:3000/api/data -d@./tmp/tx0.json
app.post('/api/data', function (req, res) {
 console.log(req.body.toString())
 let msg,d,si
 try{
  msg=JSON.parse(req.body.toString())
  console.log(msg)
  d=msg.d
  si=msg.si // check si
 } catch(err){
    console.log(err)
    res.status(500).json({"status":"err"});
    return
 }
 db.put("d~"+d.k,d.v,function(err){
  if(err){
    res.status(500).json({"status":"err","err":err});
    return
  }
  res.json({"status":"ok"});
 });
});

//curl -v -X GET http://127.0.0.1:3000/api/data/key0
app.get('/api/data/:key', function (req, res) {
 console.log(req.params)
 let key
 try{
  key=req.params.key // check
 } catch(err){
    res.status(500).json({"status":"err"});
    return
 } 
 db.get("d~"+key,function(err,val){
  if(err){
    res.status(500).json({"status":"err","err":err});
    return 
  }
  res.send(val);
 });
});


 
const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'keys', type: String, defaultValue: "./keys.json"},
  { name: 'datadir', type: String, defaultValue: "./data"}
//  { name: 'genesis', type: String, defaultValue: "./genesis.json"}
]

const options = commandLineArgs(optionDefinitions)
console.log("options:",options)

if("help" in options){
  console.log("Usage: --keys keys.json --datadir data")
  process.exit(0)
}


 db = levelup(options.datadir)


let kp_json
try{
  kp_json=JSON.parse(fs.readFileSync(options.keys))
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
    console.log('empty password')
    process.exit(0) 
  }

  var kp_dec = {
   "priv" : utils.aes_decrypt_buf(kp_hex.priv,pwd),
   "pub"  : kp_hex.pub
  }

  if(!keys.check(kp_dec)){
    console.log('wrong keys/password')
    process.exit(0) 
  }

  coreInit(kp_dec)
  })
} else {
  coreInit(kp_hex)
}


function coreInit(keys){


process.on("SIGINT", function () {
  console.log('WTF')
  db.close()
  process.exit(0) 
});

const port = env.NODE_PORT || 3000;
const host = env.NODE_IP || 'localhost';

app.listen(port, host, function () {
 console.log("node pid",process.pid,"listen", host,port)
})

}