'use strict';

/* Gulp plugins */
var gulp = require('gulp'), // Task runner
    watch = require('gulp-watch'), // Watch, that actually is an endless stream
    rename = require("gulp-rename"), // Rename files
    del = require('del'), // Delete something
    rigger = require('gulp-rigger'), // // Include content of one file to another
    size = require('gulp-size'), // Display the size of something
    path = require('path'),
    processhtml = require('gulp-processhtml'), // Plugin uses Denis Ciccale's node-htmlprocessor to process/transform html files
    concat = require('gulp-concat'), // Concatenates files
    streamqueue = require('streamqueue'), // Pipe queued streams progressively, keeping datas order.
    sourcemaps = require('gulp-sourcemaps'), // Write source maps
    less = require('gulp-less'), // Compile Less to CSS
    lessReporter = require('gulp-less-reporter'), // Error reporter for gulp-less
    autoprefixer = require('gulp-autoprefixer'), // Prefix CSS
    csscomb = require('gulp-csscomb'), // Coding style formatter for CSS
    minifycss = require('gulp-minify-css'), // Minify CSS
    uglify = require('gulp-uglify'), // Minify JS
    jshint = require('gulp-jshint'), // JS code linter
    stylish = require('jshint-stylish'), // Reporter for JSHint
    imagemin = require('gulp-imagemin'), // Optimize images
    pngquant = require('imagemin-pngquant'), // PNG plugin for ImageMin
    browserSync = require("browser-sync"), // Synchronised browser testing
    reload = browserSync.reload,
    runSequence = require('run-sequence').use(gulp); // Run a series of dependent gulp tasks in order

/* Path settings */
var projectPath = {
    build: { // Set build paths
        html: 'build/',
        js: 'build/js/',
        jsMainFile: 'script.js',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { // Set source paths
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/less/style.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: { // Set watch paths
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/less/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: 'build/**/*', // Set paths and exludes for cleaning build dir
};

/*********/
/* Tasks */
/*********/

/* BrowserSync local web server*/
gulp.task('webserver', function () {
    browserSync.init({
      server: {
        baseDir: "./build"
        },
        // tunnel: true,
        host: 'localhost',
        port: 9000,
        injectChanges: true
    });
});

/* HTML */
gulp.task('html', function () {
    return gulp.src(projectPath.src.html)
        .pipe(processhtml({
            recursive: true
        }))
        .pipe(size({
            title: 'HTML'
        }))
        .pipe(gulp.dest(projectPath.build.html))
        .pipe(reload({stream: true}));
});

/* JavaScript */

// gulp.task('js', function () {
//     return streamqueue(
//         { objectMode: true },
//         gulp.src(projectPath.src.js).pipe(rigger()).pipe(jshint()).pipe(jshint.reporter(stylish)).pipe(size({title: 'JavaScript'}))
//     )
//         .pipe(concat(projectPath.build.jsMainFile))
//         .pipe(sourcemaps.init())
//         .pipe(gulp.dest(projectPath.build.js))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(uglify())
//         .pipe(sourcemaps.write('./'))
//         .pipe(size({
//             title: 'Total JavaScript'
//         }))
//         .pipe(gulp.dest(projectPath.build.js))
//         .pipe(reload({stream: true}));
// });

gulp.task('js', function() {
    return gulp.src(projectPath.src.js)
        .pipe(size({
            title: 'JavaScript'
        }))
        .pipe(gulp.dest(projectPath.build.js))
        .pipe(reload({stream: true}));
});

/* Less */
gulp.task('less', function() {
    return gulp.src(projectPath.src.style)
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .on('error', lessReporter)
        .pipe(autoprefixer('> 2%'))
        .pipe(csscomb())
        .pipe(gulp.dest(projectPath.build.css))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(size({
            title: 'CSS'
        }))
        .pipe(gulp.dest(projectPath.build.css))
        .pipe(reload({stream: true}));
});

/* Images */
gulp.task('images', function () {
    return gulp.src(projectPath.src.img)
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 5,
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(size({
            title: 'Images'
        }))
        .pipe(gulp.dest(projectPath.build.img))
        .pipe(reload({stream: true}));
});

/* Fonts */
gulp.task('fonts', function() {
    return gulp.src(projectPath.src.fonts)
        .pipe(size({
            title: 'Fonts'
        }))
        .pipe(gulp.dest(projectPath.build.fonts))
        .pipe(reload({stream: true}));
});

/* Clean build directory */
gulp.task('clean', function (cb) {
    del(projectPath.clean, cb);
});

/* Build */
gulp.task('build', function(callback) {
    runSequence(
        'clean',
        'html',
        'js',
        'less',
        'images',
        'fonts',
        callback)
});

/* Watching */
gulp.task('watch',['webserver'], function(){
    watch([projectPath.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([projectPath.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([projectPath.watch.style], function(event, cb) {
        gulp.start('less');
    });
    watch([projectPath.watch.img], function(event, cb) {
        gulp.start('images');
    });
    watch([projectPath.watch.fonts], function(event, cb) {
        gulp.start('fonts');
    });
});

/* Default */
gulp.task('default', ['build'], function() {
});