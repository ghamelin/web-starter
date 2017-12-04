var gulp            = require('gulp'),
    nodemon         = require('gulp-nodemon'),
    browserSync     = require('browser-sync').create(),
    plugins         = require('gulp-load-plugins')(),
    postcss         = require('gulp-postcss'),
    runSequence     = require('run-sequence'),
    del             = require('del'),
    shortcss        = require('postcss-short'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    cssnext         = require('postcss-cssnext'),
    sass            = require('gulp-sass');
var plugs           = [shortcss, cssnext];
var sassSrc = "src/scss/main.scss";
var sassDest = "public/css/";

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: "http://localhost:5000",
    files: ["public/**/*.*"],
    browser: "google chrome",
    port: 7000,
  });
  gulp.watch('src/scss/*.scss',['scss'])
  gulp.watch("./*.html").on('change', browserSync.reload);
});
gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script: 'server.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});
// compile scss
gulp.task('scss', function () {
  return gulp.src([sassSrc])
    .pipe(plugins.sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(plugs))
    .pipe(plugins.cleanCss())
    .pipe(plugins.concat("styles.min.css"))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(sassDest))
    .pipe(browserSync.stream());
})
//process images
gulp.task('img', function () {
  return gulp.src(['src/img/*.+(png|jpg|gif|svg|ico)'])
    .pipe(plugins.imagemin({
      interlaced: true,
      optimizationLevel: 10,
      multipass: true,
      use: [imageminMozjpeg()]
    }))
    .pipe(gulp.dest('public/img/'))
});
gulp.task('watch',function(){
  gulp.watch('src/scss/*.scss', ['sass']);
})
// clean the production folder
gulp.task('clean', function () {
  return del.sync('public/*')
});

// build site for production
// cleans folder and recompiles all files into production folder
gulp.task('build', function () {
  runSequence('clean', ['img', 'scss']);
});


gulp.task('default', function (){
  runSequence('browser-sync', 'build');
});