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
