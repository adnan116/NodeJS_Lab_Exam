var express 	= require('express');
var router 		= express.Router();
var userModel	= require.main.require('./models/user-model');


router.post('/', function(req, res){
		
		var user ={
			username: req.body.uname,
			password: req.body.password
		};

		userModel.validate(user, function(result){
			if(result[0].type == 'admin'){
				res.cookie('username', req.body.uname);
				res.redirect('/home');
			}else{
				if(result[0].type == 'moderator'){
				res.cookie('username', req.body.uname);
				res.redirect('/home2');
				}else{
					res.redirect('/login');
				}
			}
		});
});

module.exports = router;

