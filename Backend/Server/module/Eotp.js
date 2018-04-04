exports.otp = function()
{
var otpGenerator = require('otp-generator')
var x = otpGenerator.generate(6, { upperCase: false, specialChars: false });
console.log("Reached:-    "+x);
return x;
}
