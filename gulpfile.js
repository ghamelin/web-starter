var gulp            = require('gulp'),
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

// compile scss
gulp.task('sass', function () {
  return gulp.src([sassSrc])
    .pipe(plugins.sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(plugs))
    .pipe(plugins.cleanCss())
    .pipe(plugins.concat("styles.min.css"))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(sassDest))
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

// clean the production folder
gulp.task('clean', function () {
  return del.sync('public/*')
});

// build site for production
// cleans folder and recompiles all files into production folder
gulp.task('build', function () {
  runSequence('clean', ['img', 'sass']);
});

// sets up folders to watch for changes while making edits
gulp.task('default', ['img', 'sass']);