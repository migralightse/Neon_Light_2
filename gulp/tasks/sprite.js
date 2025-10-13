var gulp 		= require('gulp');
var config 		= require('../config');
var notify 		= require('gulp-notify');
var browserSync = require('browser-sync');
var sprite = require('gulp.spritesmith');

var reload      = browserSync.reload;

// generate image sprite from images from /src/img/icons directory
gulp.task('sprite', (done) => {
	var spriteData = gulp.src( config.src.img + '/icons/*.png' )
		.pipe(sprite({
			imgName: 'sprite.png',
			cssName: '_sprite.sass',
			imgPath: '../img/sprite.png',
			cssFormat: 'sass',
			padding: 10,
			cssTemplate: config.src.helpers + '/sprite.template.mustache'
		}));

	// create sprite image
	spriteData.img
		.pipe(gulp.dest(config.dest.img));

	// create sprite scss file
	spriteData.css
		.pipe(gulp.dest(config.src.sass + '/lib/'))
		// .pipe(notify({ message: 'New sprite created!' }));

	spriteData.pipe(browserSync.stream())

	done()
});


// watch image files and run [sprite] task after file changed
gulp.task( 'sprite:watch', () => {
	gulp.watch(
		config.src.img + '/icons/*.png',
		gulp.series('sprite', (done) => {
		reload()
		done()
	}) );
});
