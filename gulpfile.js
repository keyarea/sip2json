const gulp = require("gulp");
const babel = require("gulp-babel");    // 用于ES6转化ES5
const mocha = require('gulp-mocha');
const uglify = require('gulp-uglify');
const util = require('gulp-util');

gulp.task('default', () =>
    gulp.src('src/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(
            uglify().on('error', function(err){
                util.log(err);
            })
        )
        .pipe(gulp.dest('dist'))
);

gulp.task('test', () =>
    gulp.src('test/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}))
);

