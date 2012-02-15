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
