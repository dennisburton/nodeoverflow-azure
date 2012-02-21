var JSON = require('JSON');
var config = require('./config');

module.exports.serverToClient = function(serverQuestion) {
	var clientQuestion = {
		id: serverQuestion.PartitionKey,
		text: serverQuestion.QuestionText,
		userName: serverQuestion.UserName,
		votes: JSON.parse(serverQuestion.Votes)
	};
	return clientQuestion;
};

module.exports.clientToServer = function(clientQuestion) {
	var serverQuestion = {
		PartitionKey: clientQuestion.id,
		RowKey: config.rowKey,
		QuestionText: clientQuestion.text,
		UserName: clientQuestion.userName,
		Votes: JSON.stringify(clientQuestion.votes)
	};
	return serverQuestion;
};