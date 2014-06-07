var gulp = require('gulp');
var PRELOAD_TEMPLATES = false

var backgroundTasks = ['server', 'spec'] // remove 'spec' if you don't want to run karma

gulp.task('default', backgroundTasks, function(){
  var tasks = ["build"]
  gulp.watch('./**/*.coffee', tasks)
  gulp.watch('./**/*.html', tasks)
});

// BUILD BATMANJS APP
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var batmanTemplates = require("gulp-batman-templates")

// Files will be loaded and "compiled" in this order:
var appSources = [
  "./app.coffee",
  "./lib/*.coffee",
  "./models/*.coffee",
  "./controllers/*.coffee",
  "./views/**/*.coffee",
]

gulp.task("build_app", function(){
  var stream = gulp.src(appSources)
    .pipe(concat('application.coffee'))
    .pipe(coffee())
    .pipe(concat('app.js'))
    .pipe(gulp.dest("./build/"))
  return stream
})

gulp.task("build_html", function(){
  var stream = gulp.src(["./html/**/*.html"])
    .pipe(batmanTemplates())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest("./build/"))
  return stream
})

var appTasks = ["build_app", "build_html"]
// Only include the templates in application.js if PRELOAD VIEWS
var finalSources = PRELOAD_TEMPLATES ? ["./build/app.js", "./build/templates.js"] : ["./build/app.js"]

gulp.task("build", appTasks, function() {
  gulp.src(finalSources)
    .pipe(concat("application.js"))
    .pipe(gulp.dest("./build/"))
});

// HARPJS DEVELOPMENT SERVER
var nodePath = require("path")
var harp = require("harp")
var pkgv = require("./node_modules/harp/package.json").version
var HARP_PORT = 9000

var startHarp = function(port){
  var path = nodePath.resolve(process.cwd())
  harp.server(path, {port: port}, function(){
    console.log(" Harp v" + pkgv + " running on http://localhost:" + port)
  })
}

gulp.task("server", function(){
  startHarp(HARP_PORT)
  true
})

// KARMA TEST RUNNER
var karma = require('gulp-karma')
gulp.task("spec", function(){
  var stream = gulp.src("./bogus") // weird thing about gulp-karma: https://github.com/lazd/gulp-karma/issues/27
      .pipe(karma({
        configFile: './spec/support/config.coffee',
        action: 'watch'
      }))
  return true
})
