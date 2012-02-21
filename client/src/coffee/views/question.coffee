class Overflow.Views.QuestionView extends Backbone.View
  initialize: (options) =>
    @model.bind("change", @render)

  tagName: "li"
 
  className: "question"

  template: _.template('''
    <div class=questionStatus>
      <div class="voteup <%=voteUpClass%>">&nbsp;</div>
      <div class=votecount><%= tally %></div>
      <div class="votedown <%=voteDownClass%>">&nbsp;</div>
    </div>
    <div class=questionText>
      <p><%- text %></p>
      <div class="questionAuthor">From: <%- userName %></div>
    </div>
    ''')
  
  events:
    "click .voteup" : 'upVote'
    "click .votedown" : 'downVote'

  render: =>
    vote = @model.toJSON()
    vote.voteUpClass = if @model.didUserVoteUp Overflow.currentUser then "votedup" else ""
    vote.voteDownClass = if @model.didUserVoteDown Overflow.currentUser then "voteddown" else ""
    vote.tally = @model.voteTally()
    newContent = @template(vote)
    $(@el).html(newContent)
    return this

  upVote: =>
    @setVote('up')

  downVote: =>
    @setVote('down')

  setVote: (voteType) =>
    userName = currentUser.get('userName')
    questionId = @model.id
    vote = {voteType: voteType, questionId: questionId, userName: userName}

    votes = @model.get('votes')
    votes.push vote
    @model.set {votes: votes}, {silent:true}
    @render()
    Backbone.socket.emit('vote:add',vote)