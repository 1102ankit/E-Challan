var urp = "http://172.16.14.223:3000/";




$("#Send").click(function(event){
    var uri = urp+"report";
    console.log(document.getElementById('name-form1-2').value);
    console.log(document.getElementById('VNo').value);
    console.log(document.getElementById('message-form1-2').value);
     event.preventDefault();
$.post(uri,
    {
      Name: document.getElementById('name-form1-2').value,
      OfficialNo: document.getElementById('VNo').value,
      Report: document.getElementById('message-form1-2').value,
    },
    function(data,status){
        alert("Data: " + data + "\nStatus: " + status);
        data = JSON.parse(data);
        console.log(data[0]);
        console.log(data);
    });
});