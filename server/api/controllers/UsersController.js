/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req, res) {
		var ObjectId = require('sails-mongo/node_modules/mongodb').ObjectID;

		var id = req.user.id;

		var obj = {_id : {$ne: new ObjectId(id) }};

		Users.find(obj).exec(function(err, data) {
			if (err) return res.send({success: false, msg: "SERVER_ERROR"});

			return res.send({success: true, data: data});
		});
	},
	findOne: function(req, res) {
		var id = req.param('id');
		if(!id) return res.send({success: false, msg: "MISSING_DATA"});

		Users.findOne({id: id}).exec(function(err, usr) {
			if (err) return res.send({success: false, msg: "SERVER_ERROR"});

			if (!usr) return res.send({success: false, msg: "USER_NOT_FOUND"});

			return res.send({success: true, data: usr});
		});
	},
	update: function(req, res) {
		var id = req.param('id');
		var obj = req.body;

		if (!id) return res.send({success: false, msg: "MISSING_DATA"});
		if (id !== req.user.id) return res.send({success: false, msg: "NO_YOUR_PROFILE"});

		Users.update({id: id}, obj).exec(function(err, usr) {
			if (err) return res.send({success: false, msg: "SERVER_ERROR"});

			return res.send({success: true, data: usr});
		});
	},
	destroy: function(req, res) {
		var id = req.param('id');

		if(!id) return res.send({success: false, msg: "MISSING_DATA"});
		if(id !== req.user.id) return res.send({success: false, msg: "NO_YOUR_PROFILE"});

		Users.destroy({id: id}).exec(function(err) {
			if(err) return res.send({success: false, msg: "SERVER_ERROR"});

			return res.send({success: true});
		});
	}
};

