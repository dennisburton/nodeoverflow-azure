(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Overflow.Models.Question = (function(_super) {

    __extends(Question, _super);

    function Question() {
      this.voteTally = __bind(this.voteTally, this);
      this.didUserVoteDown = __bind(this.didUserVoteDown, this);
      this.didUserVoteUp = __bind(this.didUserVoteUp, this);
      this.didUserVote = __bind(this.didUserVote, this);
      Question.__super__.constructor.apply(this, arguments);
    }

    Question.prototype.didUserVote = function(currentUser, voteType) {
      var userName, votes,
        _this = this;
      userName = currentUser.get('userName');
      votes = this.get('votes');
      return _(votes).any(function(vote) {
        return vote.userName === userName && vote.voteType === voteType;
      });
    };

    Question.prototype.didUserVoteUp = function(currentUser) {
      return this.didUserVote(currentUser, 'up');
    };

    Question.prototype.didUserVoteDown = function(currentUser) {
      return this.didUserVote(currentUser, 'down');
    };

    Question.prototype.voteTally = function() {
      var voteBreakdown, votes;
      votes = this.get('votes');
      voteBreakdown = _(votes).reduce(this.voteIncrement, {
        up: 0,
        down: 0
      });
      return voteBreakdown.up - voteBreakdown.down;
    };

    Question.prototype.voteIncrement = function(tally, vote) {
      var downIncrement, upIncrement;
      upIncrement = vote.voteType === 'up' ? 1 : 0;
      downIncrement = vote.voteType === 'down' ? 1 : 0;
      return {
        up: tally.up + upIncrement,
        down: tally.down + downIncrement
      };
    };

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
