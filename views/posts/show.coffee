class App.PostsShowView extends Batman.View
  viewWillAppear: ->
    @_resetComment()

  saveComment: (comment) ->
    comment.save (err, record) =>
      throw err if err?
      @_resetComment()

  _resetComment: ->
    comment = new App.Comment(post: @get('controller.post'))
    @set('newComment', comment)
