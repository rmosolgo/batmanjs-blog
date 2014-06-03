Batman.Filters.timeago = (input) ->
  return unless input?
  moment(input).fromNow()

Batman.Filters.moment = (input, fmtString) ->
  return unless input?
  moment(input).format(fmtString)
