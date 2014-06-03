class App.Post extends Batman.Model
  @resourceName: 'post'
  @persist BatFire.Storage
  @encode 'title', 'content'
  @encode 'created_at',
    encode: (value) -> value.toString()
    decode: (value) -> new Date(value)

  @hasMany 'comments', inverseOf: 'post'

  @validate 'title', presence: true
  @validate 'content', minLength: 25
  @belongsToCurrentUser(ownership: true)
  @encodesTimestamps()
