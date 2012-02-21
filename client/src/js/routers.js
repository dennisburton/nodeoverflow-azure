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
      Overflow.currentUser = new Overflow.Models.User;
      this.userInputView = new Overflow.Views.UserInput({
        model: Overflow.currentUser
      });
      this.userInputView.render();
      Overflow.questions = new Overflow.Collections.QuestionList();
      return this.questionListView = new Overflow.Views.QuestionListView();
    };

    return QuestionRouter;

  })(Backbone.Router);

  Overflow.router = new Overflow.Routers.QuestionRouter();

  Backbone.socket.on("questions:updated", function(data) {
    var question;
    question = Overflow.Questions.get(data.id);
    if (question) {
      return question.set({
        'votes': data.votes
      });
    } else {
      return Overflow.Questions.add(data);
    }
  });

}).call(this);
