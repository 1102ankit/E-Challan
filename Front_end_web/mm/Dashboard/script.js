//console.log(localStorage.getItem("userData"));
var result = JSON.parse(localStorage.getItem("userData"));
console.log(result);
console.log(result.Challan);


for (var i = 0; i < result.Challan.length ; i++) { 
//console.log(result.Challan[i].ChallanNumber);
var x =  "<tr><td><p>"+result.Challan[i].ChallanNumber+"</p></td>"+
                                            "<td><p>"+result.Challan[i].VehicleNumber+"</p></td>"+
                                            "<td><p>"+result.Challan[i].OffenceDate+"</p></td>"+
                                            "<td><p>"+result.Challan[i].Status+"</p></td>"+
                                            "<td><p>"+result.Challan[i].Fees+"</p></td>"+
                                            "<td><p>"+result.Challan[i].Offence+"</p></td>"+
                                            "<td><p>"+result.Challan[i].Evidence+"</p></td>"+

          "  <td><button type='button' id= 'viewchallan' class='btn btn-outline-info btn-sm'>View</button></td>";
if(result.Challan[i].Status=='u')
{
           x+= "<td><button type='button' class='btn btn-outline-info btn-sm' id='payment'>Pay Now</button></td>"+
           "<td><div class='dropdown'>"+
           "<button class='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+
             "Select"+
           "</button>"+
           "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>"+
            " <a class='dropdown-item' href='#'>Deny</a>"+
             "<a class='dropdown-item' href='#'>Accept</a>"+
           '</div>'+
         '</div></td>'+
"</tr>";
}
else{
    x+= "<td>Paid</td></tr>"

}
document.getElementById("row").innerHTML += x;
console.log(result[i]);
}

$('#viewchallan').click(function(){
window.location = "C:/Users/hitte/Desktop/mobirise/Challan_layout/index.html";
});

$('#payment').click(function(){
    window.location = "C:/Users/hitte/Desktop/mobirise/payment gateway/web/index.html";
    });
