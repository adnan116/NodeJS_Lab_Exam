var db = require('./db');

module.exports ={
	getById: function(id, callback){
		var sql = "select * from content where id=?";
		db.getResult(sql, [id], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getBycname: function(cname, callback){
		var sql = "select * from content where name=?";
		db.getResult(sql, [cname], function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from content";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(content, callback){
		var sql = "insert into content values(?,?,?,?)";
		db.execute(sql, [null, content.name, content.category, content.size], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "delete from content where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(content, callback){
		var sql = "update content set name=?, category=?, size=? where id=?";
		db.execute(sql, [content.name, content.category, content.size, content.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}