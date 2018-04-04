var mysql  = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 100,
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'echallan',
  debug	   :  false
});
function DB(query,callback){
	pool.getConnection(function(err,connection){
        if (err) {
          //res.json({"code" : 100, "status" : "Error in connection database"});

 		  console.log("error1");
 		  callback(error= true,de = err);
          return 1;
        }

        console.log('connected as id ' + connection.threadId);
        console.log(query);
        connection.query(query,function(err,row){
            connection.release();
            if(!err) {
               callback(err=false,de = row);
            }
            else{
 		  console.log("error2");
            	callback(error=true,de=err);
            }
        });

        connection.on('error', function(err) {

 		  console.log("error3");
        	  callback(error=true,de=err);
              res.json({"code" : 100, "status" : "Error in connection database"});
              return 2;
        });
  });
}
function Create(tableName,toInsert,value,callback){
	//DB("INSERT INTO table_auth (Email,Password) VALUES ('hello','"+bcrypt.hashSync("mypass")+"')",function(err,d){
	DB("INSERT INTO "+ tableName+ "( "+toInsert+" ) VALUES ( "+value+" ) ",function(err,d){
		if(err){
			console.log(err);
		}
		else{
			console.log(d);
		}
		callback(error=err,rows=d);
	});
}
function Read(tableName,toSelect,condition,callback){
	//DB("select Password from table_auth WHERE Email = 'hello'",function(err,rosw){
	DB("select "+ toSelect +" from "+ tableName +" WHERE " +condition,function(err,row){
		if(err)
		{
			callback(error=err,rows=row);
			console.log("sad");
			//console.log(rosw);
		}
		else{
			callback(error=err,rows=row);
			//console.log(row[0].Password);
	}
	});
}
function Update(tableName,toUpdate,condition,callback){
	//DB("UPDATE table_auth SET Password = 'Congrats' WHERE Email = 'hello'",function(err,rosw){
	DB("UPDATE "+tableName+" SET "+toUpdate+" WHERE "+condition,function(err,rosw){
		if(err)
		{
			console.log("sad");
			console.log(rosw);
		}
		else{
		console.log(rosw);
		}
		callback(error=err,rows=rosw);
	});
}
function Delete(tableName,condition,callback){

	//DB("DELETE FROM table_auth WHERE Email = 'hello'",function(err,rosw){
	DB("DELETE FROM "+ tableName+ " WHERE "+ condition,function(err,rosw){
		if(err)
		{
			console.log("sad");
			console.log(rosw);
		}
		else{
		console.log(rosw);
		}
		callback(error=err,rows=rosw);
	});
}


module.exports.DB = DB;
module.exports.Create = Create;
module.exports.Read = Read;
module.exports.Update = Update;
module.exports.Delete = Delete;
