var azure = require('azure');
var JSON = require('JSON');
var _ = require('underscore');
var translate = require('./translations');
var uuid = require('node-uuid');
var config = require('./config')

function OverflowStorage(io) {
	this.tableService = azure.createTableService( config.account, 
																								config.key,
																							  config.tableEndPoint );
	this.io = io;
};

OverflowStorage.prototype.createTables = function() {
	this.tableService.createTableIfNotExists("questions", function(error) {
		if(error)
		  console.log('error creating table:' + JSON.stringify(error));
	});
};

OverflowStorage.prototype.readQuestions = function(data,callback) {
	console.log('*** reading questions ***')
	var questions = [];
	var query = azure.TableQuery
									 .select()
									 .from("questions");
	this.tableService.queryEntities(query, function(error, serverQuestions){
		_(serverQuestions).each( function(serverQuestion){
			questions.push(translate.serverToClient(serverQuestion));
		});
		callback(null, questions);
	});
};

OverflowStorage.prototype.createQuestion = function(clientQuestion,callback){
	var self = this;
	clientQuestion.id = uuid.v1();
	var serverQuestion = translate.clientToServer(clientQuestion);
	self.io.sockets.emit("questions:updated", clientQuestion);
	this.tableService.insertEntity("questions",serverQuestion,function(error,serverQuestion){
		if(error === null){
			callback(null, clientQuestion);
		}	else {
			callback(error);
		}
	});
};

OverflowStorage.prototype.addVote = function(clientVote, callback) {
	var self = this;
	var questionId = clientVote.questionId;
  //should be able to use queryEntity here, much less complex
  var query = azure.TableQuery
                   .select()
                   .from("questions")
                   .whereKeys(questionId,config.rowKey);
  self.tableService.queryEntities(query, function(error, serverQuestions){
    if(error){ return; }
    serverQuestion = serverQuestions[0];
    clientQuestion = translate.serverToClient(serverQuestion);
    clientQuestion.votes.push( clientVote );
      
    self.io.sockets.emit("questions:updated",clientQuestion);

    serverQuestion = translate.clientToServer(clientQuestion)
    self.tableService.updateEntity("questions",serverQuestion,function (error,serverEntity){
    });
  });
};


module.exports = OverflowStorage;