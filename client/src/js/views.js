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

    UserInput.prototype.loggedInTemplate = _.template('you are logged in');

    UserInput.prototype.loggedOutTemplate = _.template('you are logged out <a id="logIn">That\'s Me</a>');

    UserInput.prototype.events = {
      "click #logIn": "login"
    };

    UserInput.prototype.login = function() {
      return this.model.set({
        userName: "me"
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
