module.exports = (config) ->
  config.set
    basePath: "../"
    plugins: [
      'karma-coffee-preprocessor',
      'karma-chrome-launcher',
      'karma-jasmine',
    ]
    preprocessors: {
      '../spec/**/*.coffee': ['coffee']
    }
    frameworks: ["jasmine"]
    files: [
      '../vendor/batman.js'
      '../vendor/jquery.js'
      '../vendor/*.js'
      '../build/app.js'
      '../build/templates.js'
      '../spec/support/spec_helper.coffee'
      '../spec/**/*_spec.coffee'
    ]
    exclude: []
    reporters: ['dots']
    port: 9876
    colors: true
    logLevel: config.LOG_INFO
    autoWatch: true
    browsers: [
        'Chrome'
    ]
    captureTimeout: 60000
    singleRun: false
