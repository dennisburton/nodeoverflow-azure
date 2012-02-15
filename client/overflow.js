(function() {

  window.Overflow = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {}
  };

}).call(this);
$(document).ready( function() {
(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Overflow.Models.Question = (function(_super) {

    __extends(Question, _super);

    function Question() {
      Question.__super__.constructor.apply(this, arguments);
    }

    return Question;

  })(Backbone.Model);

  Overflow.Models.User = (function(_super) {

    __extends(User, _super);

    function User() {
      this.isLoggedIn = __bind(this.isLoggedIn, this);
      User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.isLoggedIn = function() {
      if (this.get('userName')) return true;
      return false;
    };

    return User;

  })(Backbone.Model);

}).call(this);
(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Overflow.Collections.QuestionList = (function(_super) {

    __extends(QuestionList, _super);

    function QuestionList() {
      QuestionList.__super__.constructor.apply(this, arguments);
    }

    QuestionList.prototype.model = Overflow.Models.Question;

    QuestionList.prototype.localStorage = new Store("questions");

    return QuestionList;

  })(Backbone.Collection);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Overflow.Views.UserInput = (function(_super) {

    __extends(UserInput, _super);

    function UserInput() {
      this.render = __bind(this.render, this);
      this.login = __bind(this.login, this);
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
      "click #logIn": "login"
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
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Overflow.Routers.QuestionRouter = (function(_super) {

    __extends(QuestionRouter, _super);

    function QuestionRouter() {
      this.initialize = __bind(this.initialize, this);
      QuestionRouter.__super__.constructor.apply(this, arguments);
    }

    QuestionRouter.prototype.initialize = function(options) {
      this.currentUser = new Overflow.Models.User;
      this.userInputView = new Overflow.Views.UserInput({
        model: this.currentUser
      });
      return this.userInputView.render();
    };

    return QuestionRouter;

  })(Backbone.Router);

  Overflow.router = new Overflow.Routers.QuestionRouter();

}).call(this);
 }); 
