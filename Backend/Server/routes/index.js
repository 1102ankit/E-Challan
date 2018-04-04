var Sdb = require("../module/Sqldb");

exports.challana = function(req,res){
    var ChallanNo = 123, CDate = Date.now(), DlRc , Amount, Status, PaymentSource, ChallanPrint, Recipt;
    var Payment, AccusedName;
    var mess = {
        message : "Incorrect Password",
        ChallanNo : ChallanNo,
        Date : CDate,
      }
      mess = JSON.stringify(mess);
    res.status(200).end(mess); 
}
exports.login = function(req,res){
    var pass = req.param("Password");
    var user = req.param("UserId");
    var validator = require("email-validator");
    console.log(pass);
    var x = validator.validate(user); // true
    var y;
    if(x == true)
    {
        y = "Email = '"+user+"'";
    }
    else{
        y = "PhoneNumber = '"+user+"'";
    }
    console.log(y);
    Sdb.Read("tbl_auth","*",y,function(err,data){
        if(err)
        {
        console.log("Error Occured");
        var mess ={
            message : "Error"
        }
        mess = JSON.stringify(mess);
        res.status(400).end(x);
        }
        else if(data.length == 0)
        {
        console.log("User Not Found");
        var mess = {
            message : "User not Found"
        }
        mess = JSON.stringify(mess);
        res.status(400).end(mess)
        }
        else{
        console.log("User Found");
        var x = data[0].Password;
        console.log(x);
        console.log(pass);
        console.log("Hey".localeCompare("Hey"));
        if(pass.localeCompare(x) == 0)
        {
            console.log(data[0].Id);
            UserDetails(data[0],res);
            return;
            // console.log("Passwor Matched");
            // var mess = {
            // message : "Login Succesful",
            // UserId  : data.UserId
            // }
            // mess = JSON.stringify(mess);
            // res.status(200).end(mess);
        }
        else{
            console.log("Password Incorrect");
            var mess = {
            message : "Incorrect Password"
            }
            mess = JSON.stringify(mess);
            res.status(400).end(mess);
        }
        }
    });
}
exports.CreateUser = function(req,res){
    var phoneNo = req.param('PhoneNo');
    var email = req.param('Email');
    var pass = req.param('Password');
    var name = req.param('Name');
    var vehicleNo = req.param('VehicleNo');
    var validator = require("email-validator");
    var z = "", y="";
    console.log(vehicleNo+"   "+!!vehicleNo);
    if(!!!pass || !!!vehicleNo || (!!!phoneNo && !!!email))
    {
        var y = {
            Status: "Incomplete Details"
          };
          y = JSON.stringify(y);
        res.status(400).end(y);
        console.log("Before return");
        return;
        console.log("After");
    }
    if(phoneNo)
    {
        z += "PhoneNumber,";
        y += "'" + phoneNo + "',";
    }
    if(validator.validate(email)){
        z += "Email,";
        y += "'" + email + "',";
    }
    if(name)
    {
        z += "Name,";
        y += "'" + name +"',";
    }
    /*if(vehicleNo){
        z += "VehicleNo";
        y += vehicleNo;
    }*/
    Sdb.Create("tbl_auth",z+"Password", y + "'" + pass + "'",function(err,d){
      if(err)
      {
        console.log("ERROR-        "+d);
        res.status(400).end(d);
        return;
      }
      else{
         Sdb.Create("tbl_user_car","UserId,VehicleNumber","'"+d.insertId+"','"+vehicleNo+"'",function(err,d){
            if(err)
            {
              console.log("ERROR-        "+d);
              res.status(400).end(d);
              return;
            }
            else{ 
                res.status(200);
                var y = {
                Status: "User Created"
                };
                y = JSON.stringify(y);
                res.end(y);
                return;
            }
         })
      }
    })
}
exports.challan = function(req,res){
    var VehicleNumber = req.param('VehicleNumber')
     Sdb.Read("tbl_challan","*","VehicleNumber = '"+VehicleNumber+"'",function(err,d){
        if(err)
        {
          console.log("ERROR-        "+d);
          res.status(400).end(d);
          return;
        }
        else{ 
            res.status(200);
            y = JSON.stringify(d);
            res.end(y);
            return;
        }
     });
}
exports.genChallan = function(req,res){
    var ChallanNumber = req.param('ChallaneNumber')
     Sdb.Read("tbl_challan","*","ChallanNumber = '"+ChallanNumber+"'",function(err,d){
        if(err)
        {
          console.log("ERROR-        "+d);
          res.status(400).end(d);
          return;
        }
        else{ 
            res.status(200);
            y = JSON.stringify(d);
            res.end(y);
            return;
        }
     });
}
const UserDetails = function(User,res){
    Sdb.DB("SELECT * FROM tbl_challan JOIN tbl_user_car ON tbl_challan.VehicleNumber = tbl_user_car.VehicleNumber WHERE tbl_user_car.UserId = " + User.Id,function(err,d){
        if(err)
        {
          console.log("ERROR-        "+d);
          res.status(400).end(d);
          return;
        }
        else{ 
            res.status(200);
            var detail = {
                Type: "user",
                Email: User.Email,
                Name: User.Name,
                PhoneNo: User.PhoneNumber,
                Challan: d
            }
            //detail = detail.concat(d);
            y = JSON.stringify(detail);
            console.log(y);
            res.end(y);
            return;
        }
    });

}
exports.PayChallan = function(req,res){
    var ChallanNo = req.param("ChallanNo");
    //Take Payment
    //Update DB
    Sdb.Update("tbl_challan","Status = 'p'","ChallanNumber = "+ChallanNo, function(err,d){
        if(err)
        {
          console.log("ERROR-        "+d);
          res.status(400).end(d);
          return;
        }
        else{ 
            res.status(200);
            var y = {
                Status: "ChallanPaid"
            };
            y = JSON.stringify(y);
            res.end(y);
            return;
        }
    })
}
exports.Report = function(req,res){
    var name = req.param("Name");
    OfficialNumber = req.param("OfficialNo"),
    Report = req.param("Report");

    Sdb.Create("tbl_report","Name,OfficialNumber,Report", "'" +name + "','" + OfficialNumber + "','" + Report + "'",function(err,d){
        if(err)
        {
          console.log("ERROR-        "+d);
          res.status(400).end(d);
          return;
        }
        else{ 
            res.status(200);
            var y = {
                Status: "Reported"
            };
            y = JSON.stringify(y);
            res.end(y);
            return;
        }
    });
}
exports.Feedback = function(req,res){
    var name = req.param("Name");
    OfficialNumber = req.param("OfficialNo"),
    Feedback = req.param("Feedback");

    Sdb.Create("tbl_feedback","Name,OfficialNumber,Feedback","'"+ name + "','" + OfficialNumber + "','" + Feedback + "'",function(err,d){
        if(err)
        {
          console.log("ERROR-        "+d);
          res.status(400).end(d);
          return;
        }
        else{ 
            res.status(200);
            var y = {
                Status: "Reported"
            };
            y = JSON.stringify(y);
            res.end(y);
            return;
        }
    });
}
exports.PucRead = function(req,res){
    var VehicleNumber = req.param('VehicleNumber'),
        Issuer = req.param("Issuer"),
        Validity = req.param("Validity");
        IssuedDate = Date.now();
        console.log(IssuedDate);
    Sdb.Read("tbl_puc","*","VehicleMotorNumber = '"+VehicleNumber+"'",function(err,d){
        if(err)
        {
          console.log("ERROR-        "+d);
          res.status(400).end(d);
          return;
        }
        else{ 
            res.status(200);
            y = JSON.stringify(d);
            res.end(y);
            return;
        }
     });
}
exports.sendEmail = function(req,res){
    var mail = require("../module/email");
    var file = "./index.html";
    var fs = require('fs');
    
   var contents = fs.readFileSync(file, 'utf8');
   console.log(contents);
    mail.mail("apoorv.jain25@gmail.com","E-challan",contents,function(err,d){
        if(err){
            console.log(err);
            res.status(400).end();
        }
        else{
            console.log(Success);
            res.status(200).end();
        }
    })
}