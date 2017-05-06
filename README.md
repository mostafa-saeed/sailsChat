# SailsChat

[![N|Solid](https://lh6.googleusercontent.com/-Ugh1FqDqEbw/Uj5l-NyX0lI/AAAAAAAA3A8/r8bqwQn9X30/s637/featured_image_node_sails.png)](http://sailsjs.com)

SailsChat is a chat application based on Sails JS.

[Live Demo](https://sails-chat-client.herokuapp.com)

### Features!

  - RESTful API
  - Spreated front end
  - Real time chat

### Tech

SailsChat uses a number of open source projects to work properly:

* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [Node.js] - evented I/O for the backend
* [Sails.js] - fast node.js network app framework
* [MongoDB] - non sql database
* [jQuery] - JavaScript Libirary

   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [Sails.js]: <http://sailsjs.com>
   [MongoDB]: <https://www.mongodb.com>

### Installation

SailsChat requires [Node.js](https://nodejs.org/) v4+ & [MongoDB](https://www.mongodb.com)  to run.

Run the server
```sh
$ cd sailsChat/server
$ npm install
$ sails lift
```
You can run the client on almost any server

### API
| Function        | Method           | URL  |
| ------------- |-------------| -----|
| Create user   | POST | /users/create |
| Get all users (except logged in)  | GET   |   /users |
| Get one user | GET     |  /users/:id |
| Update a user | PUT    |    /users/:id |
| Delete one user | DELETE   | /users/:id |
| Login | POST   | /auth |
| Send a message to user | POST   | /:toid/message |
| Get all current user messages | GET   | /messages |
| Get sent messages to user | GET   | /messages/:toid |
### Todos

 - Active online status

License
----

MIT