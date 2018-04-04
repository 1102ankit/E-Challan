// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
exports.mail = function(ToEmail,Subject,Content,callback){
var helper = require('sendgrid').mail;
  var fromEmail = new helper.Email('challan@e-challan.com');
  var toEmail = new helper.Email(ToEmail);
  var subject = Subject;
  //var content = new helper.Content('text/plain', Content);
  var content = new helper.Content('text/html', Content);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);
 // var otpGenerator = require('otp-generator')

 // var x = otpGenerator.generate(6, { upperCase: false, specialChars: false });
var x = 123;
  var sg = require('sendgrid')("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");
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function (error, response) {
    if (error) {
      console.log('Error response received');
     // callback(-1);
    }
    else{
      console.log("Success");
      //callback(0);
    }
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });
}
