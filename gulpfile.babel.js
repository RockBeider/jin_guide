
import gulp from 'gulp';
const { series, parallel, src, dest, watch, lastRun } = gulp;

/* html */
import include from 'gulp-html-tag-include';

/* css */
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const scss = gulpSass(dartSass);
import autoPrefixer from 'gulp-autoprefixer';

/* js */
import babel from 'gulp-babel'; // es6 -> es5
import debug from 'gulp-debug';

/* image */
import imageMinify from 'gulp-imagemin';
import cache from 'gulp-cache';

/* plugin */
import { deleteAsync } from 'del';
import {create as bsCreate} from 'browser-sync';
const browserSync = bsCreate();

/**************************************
 * path
 **************************************/ 
const paths = {
	work : { 
		gindex: ['./workspace/index.html', './workspace/template.html'],
		guide: ['./workspace/guide/html/**/*.html'],
		gscss: './workspace/guide/scss/**/*.scss',
		gimg: './workspace/guide/img/**/*', 
		html: ['./workspace/html/**/*.html', '!./workspace/html/include/**/*.html'],
		scss: './workspace/assets/scss/**/*.scss',
		js: './workspace/assets/js/**/*.js',
		img: './workspace/assets/img/**/*', 
		font: './workspace/assets/font/**/*', 
	},
	dist: {
		gindex: './dist/',
		guide: './dist/guide/html/',
		gcss: './dist/guide/css/',
		gimg: './dist/guide/img/',
		html: './dist/html/',
		css: './dist/assets/css/',
		js: './dist/assets/js/',
		img: './dist/assets/img/', 
		font: './dist/assets/font/', 
	}
}

/**************************************
 * docs
 **************************************/ 
const gindexs = () =>  
	src(paths.work.gindex)
		.pipe(include())		
		.pipe(dest(paths.dist.gindex))
		
const guides = () =>  
	src(paths.work.guide, { since: lastRun(guides) })
		.pipe(include())		
		.pipe(dest(paths.dist.guide))
		
const gstyles = () => 
	src(paths.work.gscss, { sourcemaps: true, since: lastRun(gstyles) })
		.pipe(scss().on('error', scss.logError))
		.pipe(dest(paths.dist.gcss, { sourcemaps: true }))

const gimgs = () =>  
	src(paths.work.gimg, {allowEmpty:true, since: lastRun(gimgs)})
	.pipe(cache(imageMinify({ optimizationLevel: 3, progressive: true, interlaced: true }))) // 기존파일 캐싱 및 압축
	.pipe(dest(paths.dist.gimg))
		

const htmls = () =>  
	src(paths.work.html, { since: lastRun(htmls) })
		.pipe(include())
		.pipe(dest(paths.dist.html))

const styles = () => 
	src(paths.work.scss, { sourcemaps: true, since: lastRun(scripts) })
		.pipe(scss().on('error', scss.logError))
		.pipe(autoPrefixer('last 2 versions'))
		.pipe(dest(paths.dist.css, { sourcemaps: true }))

const scripts = () => 
	src(paths.work.js, { since: lastRun(scripts) })
		.pipe(babel())
		.pipe(debug())
		.pipe(dest(paths.dist.js)) 

const images = () => 
	src(paths.work.img, {allowEmpty:true, since: lastRun(images) })
		.pipe(cache(imageMinify({ optimizationLevel: 3, progressive: true, interlaced: true }))) // 기존파일 캐싱 및 압축
		.pipe(dest(paths.dist.img))

const fonts = () => 
	src(paths.work.font, { since: lastRun(fonts) })
		.pipe(dest(paths.dist.font))

/**************************************
 * plugin(delete, browserSync, watch)
 **************************************/ 
const clean = () => deleteAsync(['./dist/'])

const gindexClean = () => deleteAsync(['./dist/index.html', './dist/template.html'])
const guideClean = () => deleteAsync([paths.dist.guide])
const gcssClean = () => deleteAsync([paths.dist.gcss])
const gimgClean = () => deleteAsync([paths.dist.gimg])
const htmlClean = () => deleteAsync([paths.dist.html])
const cssClean = () => deleteAsync([paths.dist.css])
const jsClean = () => deleteAsync([paths.dist.js])
const imgClean = () => deleteAsync([paths.dist.img])
const fontClean = () => deleteAsync([paths.dist.font])

const watchTask = () =>
	watch(paths.work.gindex, {events: 'all'}, series(gindexClean, parallel([guides, gstyles, gimgs, htmls, scripts, images, fonts, styles]), gindexs)).on('change', browserSync.reload)
	watch(paths.work.guide, {events: 'all'}, series(guideClean, parallel([guides]), gindexs)).on('change', browserSync.reload)
	watch(paths.work.gscss, {events: 'all'}, series(gcssClean, gstyles)).on('change', browserSync.reload)
	watch(paths.work.gimg, {events: 'all'}, series(gimgClean, gimgs)).on('change', browserSync.reload)
	watch(paths.work.html, {events: 'all'}, series(htmlClean, htmls)).on('change', browserSync.reload)
	watch(paths.work.scss, {events: 'all'}, series(cssClean, styles)).on('change', browserSync.reload)
	watch(paths.work.js, {events: 'all'}, series(jsClean, scripts)).on('change', browserSync.reload)
	watch(paths.work.img, {events: 'all'}, series(imgClean, images)).on('change', browserSync.reload)
	watch(paths.work.font, {events: 'all'}, series(fontClean, fonts)).on('change', browserSync.reload)

const browserSyncServer = () => 
	browserSync.init({ 
		server: {
			baseDir: './dist/',
		},
	})
	watchTask()

/*******************
 * exports
 *******************/ 
const compileDoc = [guides, gstyles, gimgs, htmls, styles, scripts, images, fonts]
export const build = series(clean, parallel(compileDoc), gindexs, browserSyncServer);
export const live = series(browserSyncServer);

