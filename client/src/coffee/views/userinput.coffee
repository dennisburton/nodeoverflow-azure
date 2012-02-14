class Overflow.Views.UserInput extends Backbone.View
	initialize: (options) =>
		@model.bind("change", @render)

	el: $('#newQuestions')

	loggedInTemplate: _.template('''you are logged in''')

	loggedOutTemplate: _.template('''you are logged out <a id="logIn">That's Me</a>''')

	events:
		"click #logIn" : "login"

	login: =>
		@model.set({userName: "me"})

	render: =>
		if @model.isLoggedIn()
			activeTemplate = @loggedInTemplate
		else
			activeTemplate = @loggedOutTemplate
		@el.html( activeTemplate( @model.toJSON() ) )
		this