class Overflow.Models.Question extends Backbone.Model
	didUserVote: (currentUser,voteType) =>
		userName = currentUser.get('userName')
		votes = @get('votes')
		_(votes).any (vote)=>
			vote.userName == userName and vote.voteType == voteType 

	didUserVoteUp: (currentUser) =>
		@didUserVote currentUser, 'up'

	didUserVoteDown: (currentUser) =>
		@didUserVote currentUser,'down'

	voteTally: =>
		votes = @get('votes')
		voteBreakdown = _(votes).reduce( @voteIncrement, {up:0, down:0} ) 
		return voteBreakdown.up - voteBreakdown.down

	voteIncrement: (tally,vote) ->
		upIncrement = if vote.voteType == 'up' then 1 else 0
		downIncrement = if vote.voteType == 'down' then 1 else 0
		{up: tally.up + upIncrement, down: tally.down + downIncrement}