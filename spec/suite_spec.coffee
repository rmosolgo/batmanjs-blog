describe 'the test suite', ->
  it 'runs', ->
    expect(true).toBe(true)

  it 'has access to the app', ->
    expect(Batman).toBeDefined()
    expect(App).toBeDefined()