'use strict';

var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace-task');
var fs = require('fs');

var bfy = function(entry){
  var customOpts = {
    entries: [`./src/bundles/${entry}.js`],
    debug: true,
    extensions: ['.js']
  };
  var opts = Object.assign({}, watchify.args, customOpts);
  return browserify(opts).transform('babelify', {presets: ['es2015', 'react']})
}

var envs = {
  patterns: [{
    json: fs.readFileSync('./.env','utf-8').split("\n").reduce(function(o,v){
      var split = v.split('=');
      o[split[0]] = split[1];
      return o;
    },{}),
  }],
};

gutil.log(envs)


var bundleify = function(bfy,entry){
  return bfy.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(`${entry}.js`))
    .pipe(buffer())
    .pipe(replace(envs))
    .pipe(gulp.dest('./public'));
}


var bundlejs = function(entry) {
  var b = bfy(entry);
  return bundleify(b,entry);
};

gulp.task('js',function(){ return ['app'].map(e => bundlejs(e)) }); 

gulp.task('css',function(){
  return gulp.src('src/css/app.sass')
    .pipe(sass({ sourceComments: 'normal', indentedSyntax: true }))
    .pipe(gulp.dest('public'));
});

gulp.task('watch',function(){
  ['app'].map(e => {
    var w = watchify(bfy(e))

    w.on('update', function(){  bundleify(w,e); });
    w.on('log', gutil.log); // output build logs to terminal

    bundleify(w,e)
  })
  gulp.watch('./src/css/**/*',['css'])


  // var w = watchify(browserify(opts).transform('babelify', {presets: ['es2015', 'react']})); 
  // w.on('update', function(){  bundlejs(w); });
  // w.on('log', gutil.log); // output build logs to terminal
  // bundlejs(w)
  
});

gulp.task('default',['js','css']);

gulp.task('productionify',['default'],function(){
  return [
    gulp.src('public/app.js')
      .pipe(uglify())
      .pipe(gulp.dest('public')),
    gulp.src('public/app.css')
      .pipe(uglifycss())
      .pipe(gulp.dest('public')),
  ];
});
