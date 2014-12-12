var gulp = require('gulp'),
    less = require('gulp-less'),
    connect = require('gulp-connect'),
    path = require('path');

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./index.html')
    .pipe(connect.reload());
});

gulp.task('gulpfile', function () {
  gulp.src('./gulpfile.js')
    .pipe(connect.reload());
});

gulp.task('less', function () {
  gulp.src('./css/less/*.less')
    .pipe(less({
      paths: ['./css/less/bootstrap']
    }))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
   // Watch .less files
  gulp.watch('css/less/style.less', ['less']);
  gulp.watch(['./index.html'], ['html']);
  gulp.watch(['./gulpfile.js'], ['gulpfile']);
 });

gulp.task('default', ['connect', 'watch']);