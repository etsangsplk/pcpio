const levelup = require('levelup'); 

exports.LastOne=function(db,key,cb){
var stream = db.createReadStream({ 
 	keys: true, values: true, reverse: true, limit: 1,
 	start: key+"~", end: key
 })
 var x=0;
 stream.on('data', function(data){
 	x+=1;
 	cb(data);
 })
 stream.on('end', function () {
 	if(x==0){
 		cb()
 	}
 })
}
