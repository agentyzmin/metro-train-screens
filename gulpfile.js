var fs = require('fs'),
    gulp = require('gulp'),
    zip = require('gulp-zip'),
    less = require('gulp-less');

gulp.task('default', ['less']);

gulp.task('watch', ['less'], function() {
    gulp.watch('FE/**/*.less', ['less']);
});

gulp.task('less', function() {
    return gulp
        .src('./FE/style.less')
        .pipe(less().on('error', function(err) {
            console.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest('./FE/'));
});

gulp.task('release', ['less'], function() {
    var build = fs.readFileSync('./build.txt', 'utf8');

    return gulp
        .src([
            './BE/*',
            './FE/fonts/*',
            './FE/js/*',
            './FE/libs/*',
            './FE/index.html',
            './FE/style.css',
            './scripts/*',
            './.do_not_remove',
            './build.txt',
            './package.json'
        ], { base: './' })
        .pipe(zip('build_' + build + '.zip'))
        .pipe(gulp.dest('./'))
});