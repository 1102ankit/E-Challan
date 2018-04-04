var api_key = "dbad1ee8-2caa-11e7-929b-00163ef91450";
var https = require('https');

function SendOtp(phone,callback){
    var options = {
    host: "2factor.in",
    port: 443,
    path: "/API/V1/"+api_key+"/SMS/"+phone+"/AUTOGEN",
    method: "GET"
    };
    console.log(options);
    var req = https.request(options, function(res) {
     if(res.statusCode == 200)
     {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        chunk = JSON.parse(chunk);
        console.log('BODY:- ' + chunk);
        console.log(chunk.Details);
        callback(status = 0 , Details = chunk.Details);
      });
     }
     else{
      // To Do
      callback(status = -1);
     }
});

  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });
  req.end();
}
function CheckOtp(otp,sessionId,callback){
  var options = {
    host: "2factor.in",
    port: 443,
    path: "/API/V1/"+api_key+"/SMS/VERIFY/"+sessionId+"/"+otp,
    method: "GET"
  };
    console.log(options);
  var req = https.request(options, function(res) {
     if(res.statusCode == 200)
     {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        console.log(chunk);
        if(chunk)
        {
          console.log('BODY:- ' + chunk);
          chunk = JSON.parse(chunk);
          if(chunk.Details == "OTP Matched"){
            callback(0);
            console.log("matched")
          }
          else{
            callback(-4);
            console.log("Just Match")
          }
        }
        else{
          //TO Do
          console.log("No Data");
          callback(-2);
        }
      });
     }
     else{
      // To Do
      console.log("Oops")
      callback(-1);
     }
  });

  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });
  req.end();
}
module.exports.SendOtp = SendOtp;
module.exports.CheckOtp = CheckOtp;
