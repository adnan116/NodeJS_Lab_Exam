var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');
var contentModel   = require.main.require('./models/content-model');

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

router.get('/moderatorprofile', function(req, res){	
	
	userModel.getByUname(req.cookies['username'], function(result){
	res.render('home/moderatorprofile', {user: result});
	});
	
});

router.get('/contentadd', function(req, res){
	res.render('home/contentadd');
})

router.post('/contentadd', function(req, res){
	
	var content = {
		name: req.body.cname,
		category: req.body.c_cat,
		size: req.body.csize
	};

	contentModel.insert(content, function(status){
		if(status){
			res.redirect('/home2/allcontent');
		}else{
			res.redirect('/home2/contentadd');
		}
	});
})

router.get('/allcontent', function(req, res){
	contentModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/allcontent', {contentlist: results});
		}else{
			res.send('Null Value');
		}
	});
})

router.get('/contentedit/:id', function(req, res){
	
	contentModel.getById(req.params.id, function(result){
		res.render('home/contentedit', {content: result});
	});
})

router.post('/contentedit/:id', function(req, res){
	
	var content = {
		name: req.body.cname,
		category: req.body.c_cat,
		size: req.body.csize,
		id: req.params.id
	};

	contentModel.update(content, function(status){
		if(status){
			res.redirect('/home2/allcontent');
		}else{
			res.redirect('/home2/contentedit/'+req.params.id);
		}
	});
})


router.get('/contentdelete/:id', function(req, res){
	
	contentModel.getById(req.params.id, function(result){
		res.render('home/contentdelete', {content: result});
	});
})

router.post('/contentdelete/:id', function(req, res){
	
	contentModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/home2/allcontent');
		}else{
			res.redirect('/home2/contentdelete/'+req.params.id);
		}
	});
})


module.exports = router;
