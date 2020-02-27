var express 	= require('express');
var router 		= express.Router();
var userModel	= require.main.require('./models/user-model');

router.get('/', function(req, res){
	res.render('login/reg');
});

router.post('/', function(req, res){
	
	var user = {
		name: req.body.name,
		contact: req.body.contact,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type
	};

	userModel.insert(user, function(status){
		console.log(status);
		if(status){

			res.redirect('/login');
		}else{
			res.redirect('/reg');
		}
	});
})

module.exports = router;

