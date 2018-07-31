var urp = "http://172.16.14.223:3000";

function getDetail () {
var VehicleNumber = document.getElementById('DLno').value;
console.log(document.getElementById('DLno').value)
var uri = urp+"/getDetails?VehicleNumber=" + VehicleNumber;
console.log(uri);
$.get({url: uri, 
        headers:{
            "Access-Control-Allow-Origin": "*"
        },
        success: function(result){
    //$("#div1").html(result);
    result = JSON.parse(result);
    for (i = 0; i < result.length ; i++) { 
    
    document.getElementById("row").innerHTML +=  "<tr><td><p>"+result[i].ChallanNumber+"</p></td>"+
                                                "<td><p>"+result[i].VehicleNumber+"</p></td>"+
                                                "<td><p>"+result[i].OffenceDate+"</p></td>"+
                                                "<td><p>"+result[i].Status+"</p></td>"+
                                                "<td><p>"+result[i].Fees+"</p></td>"+
                                                "<td><p>"+result[i].Offence+"</p></td>"+
                                                "<td><p>"+result[i].Evidence+"</p></td>"+
                                                "</tr>";
    console.log(result[i]);
    }

}});

};