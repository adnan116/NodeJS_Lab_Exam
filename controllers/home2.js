var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){	
	
	userModel.getByUname(req.cookies['username'], function(result){
	res.render('home/home2', {user: result});
	});
	
});


module.exports = router;

