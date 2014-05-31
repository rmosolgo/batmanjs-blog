describe 'Greeting', ->
  it 'combines fields with toString', ->
    greeting = new App.Greeting(fullName: "President", title: "Mr.", message: "Good morning")
    expect(greeting.get('toString')).toEqual("Good morning, Mr. President")