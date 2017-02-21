const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('./tsconfig.json');
var merge = require('merge2');

const config = {
  src: 'src/',
  dest: 'dist/'
};

gulp.task('clean', function () {
  return del([config.dest + '**/*']);
});

gulp.task('js', () => {
  return gulp
    .src([config.src + "**/*.js"])
    .pipe(babel())
    .pipe(gulp.dest(config.dest));
});

gulp.task('ts', () => {
  const tsResult = gulp
    .src([
    config.src + "**/*.ts",
    "!" + config.src + "__TESTS__{,/**/*}"
  ])
    .pipe(ts({declaration: true}));

  return merge([
    tsResult
      .js
      .pipe(gulp.dest(config.dest)),
    tsResult
      .dts
      .pipe(gulp.dest(config.dest + "definitions"))
  ]);
});

gulp.task('copytemplates', () => {
  return gulp
    .src([config.src + 'templates/**/*'])
    .pipe(gulp.dest(config.dest + 'templates'));
});

gulp.task('default', ['clean'], () => {
  gulp.start('js', 'ts', 'copytemplates');
});