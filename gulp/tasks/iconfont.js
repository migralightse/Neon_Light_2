var gulp        = require('gulp');
var config      = require('../config');
var notify      = require('gulp-notify');
var browserSync = require('browser-sync');
var iconfont    = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var runTimestamp = Math.round(Date.now()/1000);

var reload      = browserSync.reload;
var fontname    = 'svgfont';

gulp.task( 'iconfont', (done) => {
    gulp.src([config.src.img + 'svg/*.svg'])
    .pipe(iconfont({
        fontName: fontname,
        prependUnicode: true,
        formats: [ 'ttf', 'woff', 'woff2' ],
        normalize: true,
        fontHeight: 1001,
        fontStyle: 'normal',
        fontWeight: 'normal',
		timestamp: runTimestamp
    }))
    .on('error', (error) => {
        notify.onError({
            title: 'Iconfont Error!',
            message: error.message
        });
        this.emit( 'end' );
    })
    .on( 'glyphs', (glyphs) => {
        // generate style for svg font
        gulp.src(config.src.helpers + '_svgfont.sass')
            .pipe( consolidate( 'lodash', {
                glyphs: glyphs,
                fontName: fontname,
                fontPath: 'fonts/',
                className: 'icon'
            }) )
            .pipe(gulp.dest(config.src.sass + 'lib/'));

        // generate html file with whole bunch of icons in /build directory
        gulp.src(config.src.helpers + 'icons.html')
            .pipe(consolidate('lodash', {
                glyphs: glyphs,
                fontName: fontname,
                fontPath: 'fonts/',
                className: 'icon',
                htmlBefore: '<i class="icon ',
                htmlAfter: '"></i>',
                htmlBr: ''
            }))
            .pipe(gulp.dest(config.dest.root));
    })
    .pipe(gulp.dest(config.dest.css + 'fonts/'))
    .pipe(gulp.dest(config.theme.assets))
    .pipe(browserSync.stream())
		// .pipe(notify({ message: 'Icon font updated!' }));
    done()
})


gulp.task('iconfont:watch', (done) => {
    gulp.watch([
        config.src.img + 'svg/*',
    ], gulp.series('iconfont', (done) => {
        reload()
        done()
    }))
	done()
})
