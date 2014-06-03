class App.PostsController extends App.ApplicationController
  routingKey: 'posts'
  index: ->
    App.Post.load =>
      @set 'posts', App.Post.get('all.sortedByDescending.created_at')
      @render()
    @render(false)

  new: ->
    @set 'post', new App.Post

  show: (params) ->
    App.Post.find params.id, (err, record) =>
      throw err if err?
      @set 'post', record
      @render()
    @render(false)

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
    post.get('comments').forEach (c) -> c.destroy()
    post.destroy (err, record) =>
      @redirect(action: "index")