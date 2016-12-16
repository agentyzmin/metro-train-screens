var gulp = require('gulp'),
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