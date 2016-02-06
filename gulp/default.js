var gulp = require('gulp');

gulp.task('default', ['clean'], function() {
    return gulp.start('watch', 'connect', 'jade', 'bower', 'copy', 'stylus', 'javascript', 'ttf2woff');
});
