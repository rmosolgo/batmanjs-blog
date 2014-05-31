class App.Greeting extends Batman.Model
  @resourceName: 'greeting'
  @persist BatFire.Storage
  @encode 'message', 'title', 'fullName'

  @accessor 'toString', ->
    "#{@get('message')}, #{@get('title')} #{@get('fullName')}"
