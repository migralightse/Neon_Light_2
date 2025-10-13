var gulp 			= require('gulp');
var config 			= require('../config');
var babel 			= require('gulp-babel');
var notify 			= require('gulp-notify');
var mode        	= require('gulp-mode')();
var uglify 			= require('gulp-uglify');
var browserSync 	= require('browser-sync');
var include 		= require('gulp-include');
var sourcemaps 		= require('gulp-sourcemaps');

var reload      	= browserSync.reload;

gulp.task('js', (done) => {
	gulp.src(config.src.js + '**/*.js')
	.pipe(mode.development(sourcemaps.init()))
	.pipe(include())
	.on('error', () => {
		// notify({ message: 'Javascript include error' })
	})
	.pipe(babel())
	.on('error', (error) => {
		notify.onError({
			title: 'JS Babel Error!',
			message: error.message
		});
		this.emit('end');
	})
	.pipe(mode.development(sourcemaps.write('./')))
	.pipe(mode.production(uglify()))
	.pipe(gulp.dest(config.dest.js))
	.pipe(gulp.dest(config.theme.assets))
	.pipe(browserSync.stream({match: true}))
	done()
});

// watch js files and run [js] task after file changed
gulp.task('js:watch', () => {
	gulp.watch([
		config.src.js + '**/*.*',
	], gulp.series('js', (done) => {
		reload()
		done()
	}))
})

