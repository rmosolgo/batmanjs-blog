(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.config.usePushState = false;

  this.App = (function(_super) {
    __extends(App, _super);

    function App() {
      return App.__super__.constructor.apply(this, arguments);
    }

    App.root('posts#index');

    App.resources('posts');

    App.syncsWithFirebase("rm-batmanjs-blog");

    App.authorizesWithFirebase();

    App.classAccessor('isAdmin', function() {
      return this.get('currentUser.uid') === "github:2231765";
    });

    return App;

  })(Batman.App);

  $(function() {
    return App.run();
  });

  App.Comment = (function(_super) {
    __extends(Comment, _super);

    function Comment() {
      return Comment.__super__.constructor.apply(this, arguments);
    }

    Comment.resourceName = 'comment';

    Comment.persist(BatFire.Storage);

    Comment.encode('content');

    Comment.belongsTo('post');

    Comment.validate('content', {
      presence: true
    });

    Comment.belongsToCurrentUser();

    Comment.encodesTimestamps();

    Comment.accessor('createdAtFormatted', function() {
      var _ref;
      return (_ref = this.get('created_at')) != null ? _ref.toDateString() : void 0;
    });

    Comment.accessor('canBeDeleted', function() {
      return this.get('isOwnedByCurrentUser') || App.get('isAdmin');
    });

    return Comment;

  })(Batman.Model);

  App.Greeting = (function(_super) {
    __extends(Greeting, _super);

    function Greeting() {
      return Greeting.__super__.constructor.apply(this, arguments);
    }

    Greeting.resourceName = 'greeting';

    Greeting.persist(BatFire.Storage);

    Greeting.encode('message', 'title', 'fullName');

    Greeting.accessor('toString', function() {
      return "" + (this.get('message')) + ", " + (this.get('title')) + " " + (this.get('fullName'));
    });

    return Greeting;

  })(Batman.Model);

  App.Post = (function(_super) {
    __extends(Post, _super);

    function Post() {
      return Post.__super__.constructor.apply(this, arguments);
    }

    Post.resourceName = 'post';

    Post.persist(BatFire.Storage);

    Post.encode('title', 'content');

    Post.hasMany('comments', {
      inverseOf: 'post'
    });

    Post.validate('title', {
      presence: true
    });

    Post.validate('content', {
      minLength: 25
    });

    Post.belongsToCurrentUser({
      ownership: true
    });

    Post.encodesTimestamps();

    Post.accessor('createdAtFormatted', function() {
      var _ref;
      return (_ref = this.get('created_at')) != null ? _ref.toDateString() : void 0;
    });

    return Post;

  })(Batman.Model);

  App.ApplicationController = (function(_super) {
    __extends(ApplicationController, _super);

    function ApplicationController() {
      return ApplicationController.__super__.constructor.apply(this, arguments);
    }

    return ApplicationController;

  })(Batman.Controller);

  App.PostsController = (function(_super) {
    __extends(PostsController, _super);

    function PostsController() {
      return PostsController.__super__.constructor.apply(this, arguments);
    }

    PostsController.prototype.routingKey = 'posts';

    PostsController.prototype.index = function() {
      return this.set('posts', App.Post.get('all.sortedByDescending.created_at'));
    };

    PostsController.prototype["new"] = function() {
      return this.set('post', new App.Post);
    };

    PostsController.prototype.show = function(params) {
      return App.Post.find(params.id, (function(_this) {
        return function(err, record) {
          if (err != null) {
            throw err;
          }
          return _this.set('post', record);
        };
      })(this));
    };

    PostsController.prototype.edit = function(params) {
      return App.Post.find(params.id, (function(_this) {
        return function(err, record) {
          if (err != null) {
            throw err;
          }
          return _this.set('post', record.transaction());
        };
      })(this));
    };

    PostsController.prototype.savePost = function(post) {
      return post.save((function(_this) {
        return function(err, record) {
          if (err) {
            if (!(err instanceof Batman.ErrorsSet)) {
              throw err;
            }
          } else {
            return _this.redirect({
              action: "index"
            });
          }
        };
      })(this));
    };

    PostsController.prototype.destroyPost = function(post) {
      return post.destroy((function(_this) {
        return function(err, record) {
          return _this.redirect({
            action: "index"
          });
        };
      })(this));
    };

    return PostsController;

  })(App.ApplicationController);

  App.GreetingsIndexView = (function(_super) {
    __extends(GreetingsIndexView, _super);

    function GreetingsIndexView() {
      return GreetingsIndexView.__super__.constructor.apply(this, arguments);
    }

    return GreetingsIndexView;

  })(Batman.View);

  App.PostsShowView = (function(_super) {
    __extends(PostsShowView, _super);

    function PostsShowView() {
      return PostsShowView.__super__.constructor.apply(this, arguments);
    }

    PostsShowView.prototype.viewWillAppear = function() {
      return this._resetComment();
    };

    PostsShowView.prototype.saveComment = function(comment) {
      comment.set('post', this.get('controller.post'));
      return comment.save((function(_this) {
        return function(err, record) {
          if (err != null) {
            throw err;
          }
          return _this._resetComment();
        };
      })(this));
    };

    PostsShowView.prototype._resetComment = function() {
      return this.set('newComment', new App.Comment);
    };

    PostsShowView.prototype.destroyComment = function(comment) {
      return comment.destroy(function(err, r) {
        if (err != null) {
          throw err;
        }
      });
    };

    return PostsShowView;

  })(Batman.View);

}).call(this);
