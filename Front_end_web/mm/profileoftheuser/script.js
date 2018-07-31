//console.log(localStorage.getItem("userData"));
var result = JSON.parse(localStorage.getItem("userData"));
console.log(result);
console.log(result.Challan);
document.getElementById('User_Name').innerHTML = result.Name;
document.getElementById('User_No').innerHTML = result.PhoneNo;
document.getElementById('User_Email').innerHTML = result.Email;



for (var i = 0; i < result.Challan.length ; i++) { 
//console.log(result.Challan[i].ChallanNumber);
document.getElementById("row").innerHTML +=  "<tr><td><p>"+result.Challan[i].ChallanNumber+"</p></td>"+
                                            "<td><p>"+result.Challan[i].VehicleNumber+"</p></td>"+
                                            "<td><p>"+result.Challan[i].OffenceDate+"</p></td>"+
                                            "<td><p>"+result.Challan[i].Status+"</p></td>"+
                                            "<td><p>"+result.Challan[i].Fees+"</p></td>"+
                                            "<td><p>"+result.Challan[i].Offence+"</p></td>"+
                                            "<td><p>"+result.Challan[i].Evidence+"</p></td>"+
                                            "</tr>";
console.log(result[i]);
}
