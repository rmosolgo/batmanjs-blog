Batman.config.usePushState = false # harp won't play well with pushState routes

class @App extends Batman.App
  @root 'posts#index'
  @resources 'posts'

  @syncsWithFirebase "batman-blog" # <= your firebase key here (see rmosolgo/batfire for more info)
  @authorizesWithFirebase()

  @classAccessor 'isAdmin', -> @get('currentUser.uid') is "github:2231765"

$ -> App.run()