/*global jQuery, Handlebars, Router */
jQuery(function ($) {
	'use strict';

	var util = {
		isLogged: function() {
			return localStorage && localStorage.getItem('token') ?  localStorage.getItem('token') : false;
		},
		getUser: function() {
			return JSON.parse(localStorage.getItem('user')) || {};
		},
		store: function(key, value){
			localStorage.setItem(key, value);
		},
		getData: function(method, url, params, auth, cb) {
			$.ajax({
				type: method,
				url: url,
				dataType: "json",
				data: params,

				beforeSend: function (xhr) {
					if(auth)
						xhr.setRequestHeader ("Authorization", "JWT " + auth);
				},
				success: function(data) {
					cb(data);
				},
				error: function(xhr, status, error) {
					console.log(error);
				}
			});
		},
		setView(view) {
			window.location.hash = view;
		}
	};

	var App = {
		init: function () {
			this.token = util.isLogged();
			this.user = util.getUser();

			this.messageTemplate = Handlebars.compile($('#message-template').html());

			var app = this;
			new Router({
				'/' : function() {
					if(!app.token){
						util.setView('login');
					}
					app.getAll();
					$('.main').load('assets/views/home.html');
				},
				'login': function() {
					if(app.token){
						util.setView('#');
					}
					$('.main').load('assets/views/login.html');
				},
				'register': function() {
					if(app.token){
						util.setView('#');
					}
					$('.main').load('assets/views/register.html');
				},
				'logout': function() {
					app.logout();
					util.setView('#');
				}
			}).init('/login');
			
			this.setEvents();
		},
		setEvents: function() {
			var app = this;

			$(document).on('click', '#login', function(e) {
				e.preventDefault();
				app.login($('#username').val(), $('#password').val());
			});
			$(document).on('click', '#register', function(e) {
				e.preventDefault();
				app.register($('#regusername').val(), $('#regpassword').val(), $('#regemail').val());
			});
			$(document).on('click', '.user', function() {
				app.selectChat(this);
			});
			$(document).on('click', '#sendbtn', function() {
				var id = $(this).attr('data-id');
				if($('#msgtxt').val() !== '')
					app.sendMessage(id, $('#msgtxt').val());
			});
		},
		//login function
		login: function(username, password) {
			var app = this;

			var login = {
				username: username,
				password: password
			};

			util.getData('POST', baseurl + 'auth', login, false, function(data) {
				if(data.token) {
					app.token = data.token;
					app.user = data.user;

					util.store('token', data.token);
					util.store('user', JSON.stringify(data.user));
					
					//render
					util.setView('/');
				} else {
					alert('unauthorized');
				}
			});
		},

		//register function
		register: function(username, password, email) {
			var app = this;
			var register = {
				username: username,
				password: password,
				email: email
			};

			util.getData('POST', baseurl + 'users/create', register, false, function(data) {
				if(data.success === true) {
					app.token = data.data.token;
					app.user = data.data.user;

					util.store('token', data.data.token);
					util.store('user', JSON.stringify(data.data.user));
					
					//render
					util.setView('/');
				} else {
					alert(data.msg);
				}
			});
		},

		//logout
		logout: function() {
			var app = this;

			app.token = false;
			app.user = {};

			util.store('token', false);
			util.store('user', JSON.stringify({}));
		},

		//getall
		getAll: function() {
			util.getData('GET', baseurl + 'users', {}, this.token, function(data) {
				var userTemplate = Handlebars.compile($('#user-template').html());
				$('.chat-users').html(userTemplate(data.data));
				//select first user
				$('.user:eq(0)').get(0).click();
			});


		},

		//select chat
		selectChat: function(user) {
			var id = $(user).attr('data-id');
			$('.user').removeClass('active');
			$(user).addClass('active');
			this.getChat(id);
			$('#sendbtn').attr('data-id', id);

			this.refresh();
		},

		//get message log
		getChat: function(id) {
			var app = this;
			util.getData('GET', baseurl + 'messages/' + id, {}, this.token, function(data) {
				app.showMessage(data);
			});
		},
		showMessage: function(data) {
			var app = this;
			//set left & right
			var chat = [];
			data.data.forEach( function(element, index) {
				element.pos = (element.from.id === util.getUser().id) ? 'right' : 'left';
				chat.push(element);
			});
			$('.chatmsg').html(app.messageTemplate(chat));
		},

		//send message
		sendMessage: function(id, txt) {
			var app = this;
			var message = {
				text: txt
			};
			util.getData('POST', baseurl + id + '/message', message, this.token, function(data) {
				if(data.success === true) {
					app.getChat(id);
					$('#msgtxt').val('');
				}
			});
		},
		//recieve a message
		refresh: function() {
			var app = this;
			setInterval(function(){ 
				var id = $('#sendbtn').attr('data-id');
				app.getChat(id);
			}, 3000);
		}

	};

	App.init();
});
