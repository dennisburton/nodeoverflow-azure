(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Overflow.Views.QuestionView = (function(_super) {

    __extends(QuestionView, _super);

    function QuestionView() {
      this.setVote = __bind(this.setVote, this);
      this.downVote = __bind(this.downVote, this);
      this.upVote = __bind(this.upVote, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      QuestionView.__super__.constructor.apply(this, arguments);
    }

    QuestionView.prototype.initialize = function(options) {
      return this.model.bind("change", this.render);
    };

    QuestionView.prototype.tagName = "li";

    QuestionView.prototype.className = "question";

    QuestionView.prototype.template = _.template('<div class=questionStatus>\n  <div class="voteup <%=voteUpClass%>">&nbsp;</div>\n  <div class=votecount><%= tally %></div>\n  <div class="votedown <%=voteDownClass%>">&nbsp;</div>\n</div>\n<div class=questionText>\n  <p><%= text %></p>\n  <div class="questionAuthor">From: <%= userName %></div>\n</div>');

    QuestionView.prototype.events = {
      "click .voteup": 'upVote',
      "click .votedown": 'downVote'
    };

    QuestionView.prototype.render = function() {
      var newContent, vote;
      vote = this.model.toJSON();
      vote.voteUpClass = this.model.didUserVoteUp(Overflow.currentUser) ? "votedup" : "";
      vote.voteDownClass = this.model.didUserVoteDown(Overflow.currentUser) ? "voteddown" : "";
      vote.tally = this.model.voteTally();
      newContent = this.template(vote);
      $(this.el).html(newContent);
      return this;
    };

    QuestionView.prototype.upVote = function() {
      return this.setVote('up');
    };

    QuestionView.prototype.downVote = function() {
      return this.setVote('down');
    };

    QuestionView.prototype.setVote = function(voteType) {
      var questionId, userName, vote, votes;
      userName = this.currentUser.get('userName');
      questionId = this.model.id;
      vote = {
        voteType: voteType,
        questionId: questionId,
        userName: userName
      };
      votes = this.model.get('votes');
      votes.push(vote);
      this.model.set({
        votes: votes
      }, {
        silent: true
      });
      return this.render();
    };

    return QuestionView;

  })(Backbone.View);

  Overflow.Views.QuestionListView = (function(_super) {

    __extends(QuestionListView, _super);

    function QuestionListView() {
      this.renderItem = __bind(this.renderItem, this);
      this.render = __bind(this.render, this);      Overflow.questions.bind('reset', this.render);
      Overflow.questions.bind('add', this.renderItem);
      Overflow.questions.fetch();
    }

    QuestionListView.prototype.el = $('#questions');

    QuestionListView.prototype.render = function() {
      $(this.el).html("");
      Overflow.questions.each(this.renderItem);
      return this;
    };

    QuestionListView.prototype.renderItem = function(question) {
      var view;
      view = new Overflow.Views.QuestionView({
        model: question
      });
      return $(this.el).append(view.render().el);
    };

    return QuestionListView;

  })(Backbone.View);

  Overflow.Views.UserInput = (function(_super) {

    __extends(UserInput, _super);

    function UserInput() {
      this.render = __bind(this.render, this);
      this.login = __bind(this.login, this);
      this.newQuestion = __bind(this.newQuestion, this);
      this.initialize = __bind(this.initialize, this);
      UserInput.__super__.constructor.apply(this, arguments);
    }

    UserInput.prototype.initialize = function(options) {
      return this.model.bind("change", this.render);
    };

    UserInput.prototype.el = $('#newQuestions');

    UserInput.prototype.loggedInTemplate = _.template('<label for="newQuestion" id="questionPrompt"><%= userName %> wants to know...</label>\n<textarea cols=20 rows=2 id="newQuestion" name="newQuestion"></textarea>\n<a id=\'addItem\'>Ask now!</a>');

    UserInput.prototype.loggedOutTemplate = _.template('<label id="logInPrompt">Your name:</label><input id="userName" type=text/><a id="logIn">That\'s me!</a>');

    UserInput.prototype.events = {
      "click #logIn": "login",
      "click #addItem": "newQuestion"
    };

    UserInput.prototype.newQuestion = function() {
      var question, questionText, textArea;
      textArea = $('#newQuestion');
      questionText = textArea.val();
      textArea.val("");
      question = {
        text: questionText,
        userName: this.model.get('userName'),
        votes: []
      };
      return Overflow.questions.create(question);
    };

    UserInput.prototype.login = function() {
      var userName;
      userName = $('#userName').val();
      return this.model.set({
        userName: userName
      });
    };

    UserInput.prototype.render = function() {
      var activeTemplate;
      if (this.model.isLoggedIn()) {
        activeTemplate = this.loggedInTemplate;
      } else {
        activeTemplate = this.loggedOutTemplate;
      }
      this.el.html(activeTemplate(this.model.toJSON()));
      return this;
    };

    return UserInput;

  })(Backbone.View);

}).call(this);
