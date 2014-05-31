# Batman.js Starter Kit

This kit includes:

- [Batman.js](http://batmanjs.org), all [dependencies](https://github.com/rmosolgo/batman-starter/tree/master/vendor) and a skeletal batman.js app
- [Karma](http://karma-runner.github.io/0.12/index.html)/[Jasmine](http://jasmine.github.io/2.0/introduction.html) test suite
- Development server ([harp.js](http://harpjs.com/)), build scripts and test scripts powered by [gulp.js](http://gulpjs.com/)
- Integration with [Firebase](http://firebase.com) (via [BatFire](https://github.com/rmosolgo/batfire)), a front-end-friendly real-time datastore (with a free tier).

# Install & Use

- Install node.js and npm

- Clone the starter to make `my_new_app`:

  ```bash
  $ cd ~/code # or wherever
  $ git clone git@github.com:rmosolgo/batman-starter.git my_new_app
  $ cd my_new_app
  ```

- Install everything:

  ```bash
  $ npm install
  ```

- Start the development server:

  ```bash
  $ gulp
  ```

- Open up the landing page: [http://localhost:9000](http://localhost:9000)

# A Closer Look...

## Deployment

Deploying with [Firebase hosting](https://www.firebase.com/hosting.html) is so easy that you'll want to cry. When you're signed up for Firebase:

```
$ npm install -g firebase-tools
$ firebase init
$ firebase deploy
$ firebase open
```

There's your app!

## Specs

_I couldn't get Batman.TestCase to play nice with Karma, so I chose Jasmine instead!_

- Specs live in `spec/`
- Any global setup (macros, etc) can be put in `spec/support/spec_helper.coffee`.

## Setting up Firebase

- Sign up for [Firebase](http://firebase.com)
- Make a new project and add the key to `@syncsWithFirebase` in `app.coffee`
- Use `@persist BatFire.Storage` in your model definitions
- For the full rundown, see [rmosolgo/batfire](https://github.com/rmosolgo/batfire)

## Tasks

Task | Command
---- | --------
`gulp` | Build the app, start the server, and run tests
`gulp build` | Build the app
`gulp test` | Run the tests
`gulp server` | Start the server

There is one configuration in `Gulpfile.js`: If you want to preload templates (rather than requesting them as-needed), set `PRELOAD_TEMPLATES` to `true`.

