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