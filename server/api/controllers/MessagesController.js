/**
 * MessagesController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
		var from = req.user.id;
		var to = req.param('toid');
		var message = req.body.text;

		if(!to || !message) return res.send({success: false, msg: "MISSING_DATA"});

		if(from === to) return res.send({success: false, msg: "SAME_PERSON"});

		Users.findOne({id: to}).exec(function(err, usr) {
			if (err) return res.send({success: false, msg: "SERVER_ERROR"});
			if (!usr) return res.send({success: false, msg: "USER_NOT_FOUND"});

			Messages.create({from: from, to: to, text: message})
			.then(res.created);
		});
	},

	find: function(req, res) {
		var from = req.user.id;
		var to = req.param('toid');

		//find sent and recieved messages
		var obj = { $or: [{from: from}, {to: from}] };

		Messages.find(obj).populate('to').populate('from').exec(function(err, data) {
			if (err) return next(err, false, {});

			return res.send({success: true, data: data});
		});
	},

	findByID: function(req, res) {
		var from = req.user.id;
		var to = req.param('toid');

		var obj = { $and: [ { $or: [{from: from}, {to: from}] }, { $or: [{from: to}, {to: to}] } ] };

		Messages.find(obj).populate('to').populate('from').exec(function(err, data) {
			if (err) return next(err, false, {});

			return res.send({success: true, data: data});
		});
	}
};

