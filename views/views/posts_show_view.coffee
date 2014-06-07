class App.PostsShowView extends Batman.View
  viewWillAppear: ->
    @_resetComment()

  saveComment: (comment) ->
    # set up the association:
    comment.set 'post', @get('controller.post')
    comment.save (err, record) =>
      throw err if err?
      @_resetComment()

  _resetComment: ->
    @set('newComment', new App.Comment)

  destroyComment: (comment) ->
    comment.destroy (err, r) ->
      throw err if err?