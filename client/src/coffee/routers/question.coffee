class Overflow.Routers.QuestionRouter extends Backbone.Router
	initialize: (options) =>
		@currentUser = new Overflow.Models.User
		@userInputView = new Overflow.Views.UserInput({model: @currentUser})
		@userInputView.render()

Overflow.router = new Overflow.Routers.QuestionRouter()