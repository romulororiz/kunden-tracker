const { src, dest, watch, series, task } = require('gulp');
const autoPrefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');

function buildStyles() {
	return src('./src/styles/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(
			purgecss({
				content: ['./src/**/*.jsx'],
			})
		)
		.pipe(autoPrefixer())
		.pipe(dest('./src/styles/css'));
}

function watchTask() {
	watch(['./src/styles/scss/**/*.scss', './src/**/*.jsx'], buildStyles);
}

task('default', series(buildStyles, watchTask));
