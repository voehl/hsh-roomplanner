const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');

const webpackConfig = {
	module: {
		loaders: [
			{test: /\.vue$/, loader: 'vue'}
		]
	}
};

gulp.task('js', function () {
	return gulp
		.src('src/js/app.js')
		.pipe(webpack(webpackConfig))
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
	return gulp
		.src([
			'node_modules/vue-material/dist/vue-material.css',
			'node_modules/material-design-icon-fonts/iconfont/material-icons.css',
			'src/sass/app.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('app.css'))
		.pipe(gulp.dest('dist'));
});

gulp.task('fonts', function () {
	return gulp
		.src('node_modules/material-design-icon-fonts/iconfont/MaterialIcons-Regular.*')
		.pipe(gulp.dest('dist'));
});

gulp.task('build', ['js', 'sass', 'fonts']);

gulp.task('watch', ['build'], function () {
	gulp.watch('src/js/**/*', ['js']);
	gulp.watch('src/sass/**/*', ['sass']);
});