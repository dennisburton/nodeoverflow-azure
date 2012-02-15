class Overflow.Collections.QuestionList extends Backbone.Collection
	model: Overflow.Models.Question
	localStorage: new Store("questions")