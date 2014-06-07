# Batman.js blog

This is a blog app built with [batman.js](http://batman.js) and [Firebase](http://firebase.com), using [BatFire](http://github.com/rmosolgo/batfire) bindings. It's based on the [batmanjs-starter](http://github.com/rmosolgo/batmanjs-starter) template.

There's a [how-to blog post](http://rmosolgo.github.io/blog/2014/06/06/build-a-blog-with-batman-dot-js/) and it's live at [rm-batmanjs-blog.firebaseapp.com](https://rm-batmanjs-blog.firebaseapp.com/)

Some interesting parts:

- __The App:__ [app.coffee](https://github.com/rmosolgo/batmanjs-blog/blob/master/app.coffee) (routes)
- __Models:__ [Post](https://github.com/rmosolgo/batmanjs-blog/blob/master/models/post.coffee), [Comment](https://github.com/rmosolgo/batmanjs-blog/blob/master/models/comment.coffee)
- __Controllers:__ [PostsController](https://github.com/rmosolgo/batmanjs-blog/blob/master/controllers/posts_controller.coffee)
- __HTML:__ [layout](https://github.com/rmosolgo/batmanjs-blog/blob/master/index.html), [post templates](https://github.com/rmosolgo/batmanjs-blog/tree/master/html/posts)
- __Custom Views:__ [PostsShowView](https://github.com/rmosolgo/batmanjs-blog/blob/master/views/posts/show.coffee) (handles comments)
- [Firebase security rules](https://github.com/rmosolgo/batmanjs-blog/blob/master/config/security_rules.json)