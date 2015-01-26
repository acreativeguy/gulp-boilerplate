var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass');
	imagemin = require ('gulp-imagemin');
	prefix = require('gulp-autoprefixer');
	concat = require('gulp-concat')
	minify = require('gulp-minify-css')
	rename = require('gulp-rename')
	browserSync = require('browser-sync');
	plumber = require('gulp-plumber');

// BrowserSync
// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

//BrowserSync
// Syncs all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});


 

// Image Task
// Compress
gulp.task('image', function(){
	gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/img'))
		.pipe(browserSync.reload({stream:true}));
});

// Scripts Task
// Concats, Uglifies & Renames
gulp.task('scripts', function(){
	gulp.src('js/*.js')
	.pipe(plumber())
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(rename('main.min.js'))
	.pipe(gulp.dest('build/js'));
});

// Styles Task
// Compiles Sass, Auto-prefixes, Minifies, Renames
// Sass task, will run when any SCSS files change & BrowserSync will auto-update browsers
gulp.task('styles', function(){
	gulp.src('scss/**/*.scss')
		.pipe(plumber())
		.pipe(sass({
			"sourcemap=none": true, // hack to allow auto-prefixer to work
			style: 'compressed'
		}))
		.pipe(prefix('last 2 versions'))
		.pipe(minify({keepBreaks:false}))
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream:true}));
 
});

gulp.task('watch', function(){
	gulp.watch('js/*.js', ['scripts', browserSync.reload]);
	gulp.watch('scss/**/*.scss', ['styles']);
	gulp.watch("*.html", ['bs-reload']);
	gulp.watch('img/*.jpg', ['image']);
});

gulp.task('default', ['scripts', 'styles', 'image', 'browser-sync', 'watch']);







