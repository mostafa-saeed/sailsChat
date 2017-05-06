/**
 * 401 (Unauthorized) Response
 * Similar to 403 Forbidden.
 * Specifically for authentication failed or not yet provided.
 */
module.exports = function (data, code, message, root) {

		this.res.send({
			success: false,
			msg: "UNAUTHORIZED"
	});
};