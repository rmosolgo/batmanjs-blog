Batman.config.usePushState = false # harp won't play well with pushState routes

class @App extends Batman.App
  @root 'greetings#index'
  @resources 'greetings'

  @syncsWithFirebase "batfire-example" # <= your firebase key here (see rmosolgo/batfire for more info)

  @on 'run', ->
    console.warn "Add your firebase key to ./app.coffee, then remove this warning!"

$ -> App.run()