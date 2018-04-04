var myLogger = function (req, res, next) {
	//console.log(req.header);
	//console.log(req);
	console.log(req.get("key"));
	console.log("Cookie:-    "+req.get("cookie"));
	//console.log(req.body);
	if(req.path == '/login' || req.path == '/signup')
	{
		console.log('authentication not required')
		next();
	}
	else
	{
  		console.log('LOGGED1')
  		next();
  	}
}

module.exports.myLogger = myLogger;
