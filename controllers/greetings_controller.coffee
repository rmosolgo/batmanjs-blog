class App.GreetingsController extends App.ApplicationController
  routingKey: 'greetings'
  # This renders the homepage
  index: (params) ->
    @set 'exampleGreeting', new App.Greeting(message: "Warmest welcome", title: "Dr.", fullName: "Lucius Fox")
    # normally, this would be:
    # @set 'greetings', App.Greeting.get('all')

  # These are just here for example
  show: (params) ->
    App.Greeting.find params.id, (err, record) =>
      @set 'greeting', record

  edit: (params) ->
    App.Greeting.find params.id, (err, record) =>
      @set 'greeting', record.transaction() # Model::transaction isolates changes until save

  new: (params) ->
    @set 'greeting', new App.Greeting
