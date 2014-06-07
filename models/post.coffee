class App.Post extends Batman.Model
  @resourceName: 'post'
  @persist BatFire.Storage
  @encode 'title', 'content'
  @hasMany 'comments', inverseOf: 'post'

  @validate 'title', presence: true
  @validate 'content', minLength: 25
  @belongsToCurrentUser(ownership: true)
  @encodesTimestamps()
