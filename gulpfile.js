//Dependencies and Variables

var gulp = require('gulp');

//concat and minify bower files and other js/css files
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//pull in bower files
var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

//build and clean tasks
var utilities = require('gulp-util');
var buildProduction = utilities.env.production;
var del = require('del');

//set up server with watchers, run typescript compilerOptions
var browserSync = require('browser-sync').create();
var shell = require('gulp-shell');

//sass dependencies
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

//TYPESCRIPT
//clean task
gulp.task('tsClean', function(){
  return del(['app/*.js', 'app/*.js.map']);
});

//clean and compile once - global build
gulp.task('ts', ['tsClean'], shell.task(['tsc']));

//BOWER
//to add bower dependency - stop server, use 'bower install --save' flag, run 'gulp bower' to build vendor files, restart server
gulp.task('jsBowerClean', function(){
  return del(['./build/js/vendor.min.js']);
});

gulp.task('jsBower', ['jsBowerClean'], function(){
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('cssBowerClean', function(){
  return del(['./build/css/vendor.css']);
});

gulp.task('cssBower', ['cssBowerClean'], function(){
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('bower', ['jsBower', 'cssBower']);

//SASS
gulp.task('sassBuild', function(){
  return gulp.src(['resources/styles/*'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

//SERVER
gulp.task('serve', function(){
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch(['resources/js/*.js'], ['jsBuild']);//vanilla js reload
  gulp.watch(['*.html'], ['htmlBuild']); //html reload
  gulp.watch(['resources/styles/*.css', 'resources/styles/*.scss'], ['cssBuild']); //css/sass concat, build, reload
  gulp.watch(['app/*.ts'], ['tsBuild']);//typescript compile and reload
});

gulp.task('jsBuild', function(){
  browserSync.reload();
});

gulp.task('htmlBuild', function(){
  browserSync.reload();
});

gulp.task('cssBuild', ['sassBuild'], function(){
  browserSync.reload();
});

gulp.task('tsBuild', ['ts'], function(){
  browserSync.reload();
});

//GLOBAL BUILD TASK
gulp.task('build', ['ts'], function(){
  gulp.start('bower');
  gulp.start('sassBuild');
});

//SETUP NOTES

/*
- clone repo
- npm install
- bower install
- install globals if needed (gulp, bower, sass, typescript, typescript packages.)
  - npm install gulp -g
  - npm install bower -g
  - gem install sass
  - npm install typescript -g
  - apm install atom-typescript
- gulp build
- gulp serve
*/
