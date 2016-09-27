var gulp = require('gulp');
var bower = require('gulp-bower');
var browser_sync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browser_sync.reload;
var exec = require('child_process').exec;

var minify_css = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
// var sourcemaps = require('gulp-sourcemaps');
// var gutil = require('gulp-util');
// var gulpif = require('gulp-if');
var header = require('gulp-header');

var project_root = __dirname;

var project_path = {
    bower: project_root + '/static/vendor',
    css: project_root + '/static/css',
    html: project_root + '/html',
    sass: project_root + '/private/sass',
    template: project_root + '/template',
};

var project_patterns = {
    html: project_path.html + '/*.html',
    template: [
	project_root + '/run-jinja',
	project_path.template + '/*.html'
    ],
    sass: [
        project_path.sass + '/**/*.{scss,sass}'
    ]
};

gulp.task('bower', function() {
    bower(gulp.dest(opts.PROJECT_PATH.bower));
});

gulp.task('jinja', function (cb) {
  exec(project_root + '/run-jinja', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(project_patterns.sass)
        .pipe(sass())
        .pipe(autoprefixer({
            // browsers are coming from browserslist file
            cascade: false
        }))
    // .pipe(minify_css({
    //     rebase: false
    // }))
        .pipe(header('/* This file generated automatically on server side. All changes would be lost. */ \n\n'))
        .pipe(gulp.dest(project_path.css))
        .pipe(reload({stream: true}));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'jinja'], function() {

    browser_sync.init({
        server: project_path.html
    });

    gulp.watch(project_patterns.template, ['jinja']);
    gulp.watch(project_patterns.sass, ['sass']);
    gulp.watch(project_patterns.html).on('change', reload);
});

gulp.task('default', ['serve']);
