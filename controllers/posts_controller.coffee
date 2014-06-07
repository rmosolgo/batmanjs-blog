class App.PostsController extends App.ApplicationController
  routingKey: 'posts'
  index: ->
    @set 'posts', App.Post.get('all.sortedByDescending.created_at')

  new: ->
    @set 'post', new App.Post

  show: (params) ->
    App.Post.find params.id, (err, record) =>
      throw err if err?
      @set 'post', record

  edit: (params) ->
    App.Post.find params.id, (err, record) =>
      throw err if err?
      @set 'post', record.transaction()

  savePost: (post) ->
    post.save (err, record) =>
      if err
        if !(err instanceof Batman.ErrorsSet)
          throw err
      else
        @redirect(action: "index")

  destroyPost: (post) ->
    post.destroy (err, record) =>
      @redirect(action: "index")