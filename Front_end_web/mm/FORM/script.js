var urp = "http://172.16.14.223:3000/";
$("#login-button").click(function(event){
    var uri = urp+"login";
    console.log(document.getElementById('User_Id').value);
    console.log(document.getElementById('User_pass').value)
    event.preventDefault();
$.post(uri,
    {
      UserId: document.getElementById('User_Id').value,
      Password: document.getElementById('User_pass').value
    },
    function(data,status){
        // alert("Data: " + data + "\nStatus: " + status);
        localStorage.setItem("userData",data);
        window.location = "C:/Users/hitte/Desktop/mobirise/afterlogindashboard/index.html";
        // window.location = "C:/Users/hitte/Desktop/mobirise/Dashboard/index.html";
        data = JSON.parse(data);
        console.log(data[0]);
        console.log(data);
    });
});


$("#register").click(function(event){
    var uri = urp+"register";
    console.log(document.getElementById('firstname').value);
    console.log(document.getElementById('Email_Id').value);
    console.log(document.getElementById('Phone_No').value);
    console.log(document.getElementById('Vehicle_No').value);
    console.log(document.getElementById('PassWord').value)
    event.preventDefault();
$.post(uri,
    {
      Name: document.getElementById('firstname').value,
      Email: document.getElementById('Email_Id').value,
      PhoneNo: document.getElementById('Phone_No').value,
      VehicleNo: document.getElementById('Vehicle_No').value,
      Password: document.getElementById('PassWord').value
    },
    function(data,status){
        // alert("Data: " + data + "\nStatus: " + status);
        data = JSON.parse(data);
        console.log(data[0]);
        console.log(data);
    });
});