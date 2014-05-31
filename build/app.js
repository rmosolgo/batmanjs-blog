(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.config.usePushState = false;

  this.App = (function(_super) {
    __extends(App, _super);

    function App() {
      return App.__super__.constructor.apply(this, arguments);
    }

    App.root('greetings#index');

    App.resources('greetings');

    App.syncsWithFirebase("batfire-example");

    App.on('run', function() {
      return console.warn("Add your firebase key to ./app.coffee, then remove this warning!");
    });

    return App;

  })(Batman.App);

  $(function() {
    return App.run();
  });

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

  App.ApplicationController = (function(_super) {
    __extends(ApplicationController, _super);

    function ApplicationController() {
      return ApplicationController.__super__.constructor.apply(this, arguments);
    }

    return ApplicationController;

  })(Batman.Controller);

  App.GreetingsController = (function(_super) {
    __extends(GreetingsController, _super);

    function GreetingsController() {
      return GreetingsController.__super__.constructor.apply(this, arguments);
    }

    GreetingsController.prototype.routingKey = 'greetings';

    GreetingsController.prototype.index = function(params) {
      return this.set('exampleGreeting', new App.Greeting({
        message: "Warmest welcome",
        title: "Dr.",
        fullName: "Lucius Fox"
      }));
    };

    GreetingsController.prototype.show = function(params) {
      return App.Greeting.find(params.id, (function(_this) {
        return function(err, record) {
          return _this.set('greeting', record);
        };
      })(this));
    };

    GreetingsController.prototype.edit = function(params) {
      return App.Greeting.find(params.id, (function(_this) {
        return function(err, record) {
          return _this.set('greeting', record.transaction());
        };
      })(this));
    };

    GreetingsController.prototype["new"] = function(params) {
      return this.set('greeting', new App.Greeting);
    };

    return GreetingsController;

  })(App.ApplicationController);

}).call(this);
