class App.Comment extends Batman.Model
  @resourceName: 'comment'
  @persist BatFire.Storage
  @encode 'content'
  @belongsTo 'post'
  @validate 'content', presence: true
  @belongsToCurrentUser()
  @encodesTimestamps()

  @accessor 'createdAtFormatted', ->
    @get('created_at')?.toDateString()

  @accessor 'canBeDeleted', ->
    @get('isOwnedByCurrentUser') || App.get('isAdmin')