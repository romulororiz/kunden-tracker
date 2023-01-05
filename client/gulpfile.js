import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import purgecss from 'gulp-purgecss';
import autoprefixer from 'gulp-autoprefixer';
import dartSass from 'sass';
const sass = gulpSass(dartSass);

export function buildStyles() {
	return gulp
		.src('./src/styles/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(
			purgecss({
				content: ['./src/**/*.jsx'],
			})
		)
		.pipe(autoprefixer())
		.pipe(gulp.dest('./src/styles/css'));
}

export function watchTask() {
	gulp.watch(['./src/styles/scss/**/*.scss', './src/**/*.jsx'], buildStyles);
}

gulp.task('default', gulp.series(buildStyles, watchTask));
