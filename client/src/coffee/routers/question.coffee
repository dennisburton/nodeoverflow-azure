class Overflow.Routers.QuestionRouter extends Backbone.Router
	initialize: (options) =>
		Overflow.currentUser = new Overflow.Models.User
		@userInputView = new Overflow.Views.UserInput({model: Overflow.currentUser})
		@userInputView.render()
		Overflow.questions = new Overflow.Collections.QuestionList()
		@questionListView = new Overflow.Views.QuestionListView()

Overflow.router = new Overflow.Routers.QuestionRouter()