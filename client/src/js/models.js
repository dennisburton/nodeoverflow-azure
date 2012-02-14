(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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