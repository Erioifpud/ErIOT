var fs = require("fs")
var Authorizer = require("mosca/lib/authorizer")

// Accepts the connection if the username and password are valid
var authenticate = function (client, username, password, callback) {
  // console.log(client, username, password)
  console.log(client.connection.stream);
  console.log('-------------------');
  console.log(client.connection.stream.address());
  var authorized = (username === 'alice' && password.toString() === 'secret')
  if (authorized) client.user = username
  callback(null, authorized)
}

// In this case the client authorized as alice can publish to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var authorizePublish = function (client, topic, payload, callback) {
  callback(null, client.user == topic.split('/')[1])
}

// In this case the client authorized as alice can subscribe to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var authorizeSubscribe = function (client, topic, callback) {
  callback(null, client.user == topic.split('/')[1])
}

function loadAuthorizer(credentialsFile, cb) {
	if (credentialsFile) {
		fs.readFile(credentialsFile, function(err, data) {
			if (err) {
				cb(err)
				return
			}

			var authorizer = new Authorizer()

			try {
				authorizer.users = JSON.parse(data)
				cb(null, authorizer)
			} catch(err) {
				cb(err)
			}
		})
	} else {
		cb(null, null)
	}
}

module.exports = {
  authenticate,
  authorizePublish,
  authorizeSubscribe,
  loadAuthorizer
}