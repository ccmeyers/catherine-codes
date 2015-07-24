// includes
var gulp =          require('gulp'),
    watch =         require('gulp-watch'),
    connect =       require('gulp-connect'),
    sass =          require('gulp-sass'),
    neat =          require('node-neat').includePaths,
    uglify =        require('gulp-uglify'),
    concat =        require('gulp-concat'),
    gutil =         require('gulp-load-utils')(['env']),
    htmlmin =       require('gulp-htmlmin'),
    plumber =       require('gulp-plumber'),
    browserify =    require('browserify'),
    transform =     require('vinyl-transform'),
    rename =        require('gulp-rename');

// configure paths
var paths = {
    scss: './src/scss/**/*.scss',
    css: './dist/css',
    html: './src/*.html',
    js: './src/js/*.js',
    images: './src/images/*',
    web_root: './dist'
};

// minify html
gulp.task('html', function()
{
    gulp.src(['src/*.html'])
        .pipe( plumber() )
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
});

// js + browserify
gulp.task('js', function()
{
    var browserified = transform(function(filename)
    {
        var b = browserify(filename);

        return b.bundle();
    });

    gulp.src( paths.js )
        .pipe( plumber() )
        .pipe( browserified )
        .pipe( uglify() )
        .pipe( concat('app.js') )
        .pipe( gulp.dest('dist/js') );

    // for things that can't be browserified.
    gulp.src ( './src/js/vendor/*.js' )
        .pipe( plumber() )
        .pipe( uglify() )
        .pipe( concat('vendor.js') )
        .pipe( gulp.dest('./dist/js') );
});

// setup sass + bourbon + neat
gulp.task('sass', function()
{
    gulp.src( './src/scss/main.scss' )
        .pipe( plumber() )
        .pipe(sass({
            includePaths: neat,
            outputStyle: gutil.env.production ? 'compressed' : 'expanded',
            errLogToConsole: true
        }))
        .pipe( gulp.dest( paths.css ) );

        gulp.src( './src/scss/interactions.scss' )
        .pipe( plumber() )
        .pipe( rename('interactions.css') )
        .pipe( gulp.dest( paths.css ) );
});

// copy images
gulp.task('images', function()
{
    gulp.src( paths.images )
        .pipe( gulp.dest('dist/images') );

});


// tiny web server
gulp.task('server', function()
{
    connect.server({
        livereload: true,
        root: [paths.web_root]
    });
});

// the live reload task
gulp.task('livereload', function()
{
    gulp.src([paths.html, paths.scss, paths.js])
        .pipe(watch([paths.html, paths.scss, paths.js]))
        .pipe(connect.reload());
});


// set up gulp watch
gulp.task('watch', function()
{
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/images/*', ['images']);
});

// configure default task
gulp.task('default', ['sass', 'js', 'html', 'images', 'server', 'livereload', 'watch']);