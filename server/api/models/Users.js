/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs				:: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		username: {
			type: "string",
			unique: true,
			required: true
		},
		password: {
			type: "string",
			required: true
		},
		email: {
			type: "string",
			email: true,
			unique: true,
			required: true
		},
		status: {
			enum: ['Online', 'Offline'],
			defaultsTo: 'Online'
		},
		frommessages: {
			collection: 'messages',
			via: 'from'
		},
		tomessages: {
			collection: 'messages',
			via: 'to'
		},
		toJSON: function () {
			var obj = this.toObject();
			delete obj.password;
			return obj;
		}
	},
	beforeUpdate: function (values, next) {
		CipherService.hashPassword(values);
		next();
	},
	beforeCreate: function (values, next) {
		CipherService.hashPassword(values);
		next();
	}

};

