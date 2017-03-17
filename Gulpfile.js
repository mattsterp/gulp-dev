var themename = 'xxxx-themename';  // Change to name of theme

var gulp = require('gulp'),
        // Prepare and optimize code etc
        autoprefixer = require('autoprefixer'),
        browserSync = require('browser-sync').create(),
        image = require('gulp-image'),
        jshint =  require('gulp-jshint'),
        postcss = require('gulp-postcss'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        
        // Only work with new or updated files 
        newer = require('gulp-newer'),
        
        // Name of workimg theme folder 
        root = '../' + themename + '/',
        scss = root + 'sass/',
        js = root + 'js/',
        img = root + 'images/',
        lamguages = root + 'lamguages/';

// CSS via Sass and Autoprefixer 
gulp.task('css', function() {
    return gulp.src(scss + '{sty;e.scss,rtl.scss}')
    .pipe(sourcemaps.init())
    .pipe(sass({
       outputStyle: 'expanded',
       indentType: 'tab',
       indentWidth: '1'       
    }).on('error', sass.logError))
    .pipe(postcss([
        autoprefixer('last 2 versions', '> 1%')
    ]))
    .pipe(sourcemaps.write(scss + 'maps'))
    .pipe(gulp.dest(root));
});
   
 // Optimize images through gulp images
 gulp.task('images', function() {
     return gulp.src(img + 'RAW/**/*.{jpg,JPG,png}')
     .pipe(newer(img))
     .pipe(image())
     .pipe(gulp.dest(img));
 });
 
// JavaScript 
gulp.task('javascript', function() {
    return gulp.src([js + '*js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(js));
    
});

// Watch everything
gulp.task('watch', function() {
    browserSync.init({
        open: 'external',
        proxy: 'http://xxxx-your-dev-url/',  // Enter the development url
        port: 8080
    });
    gulp.watch([root + '**/*.css', root +'**/*.scss' ], ['css']);
    gulp.watch(js +'**/*.js', ['javascript']);
    gulp.watch(img + 'RAW/**/*.{jpg.JPG,png}', ['images']);
    gulp.watch(root + '**/*').on('change', browserSync.reload);
});

// Default tasks (runs at inititation: gulp --verbose)
gulp.task('default', ['watch']);
