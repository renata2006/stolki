const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");

function styles() {
  return gulp
    .src("styles/*.css")
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("dist"));
}

function scripts() {
  return gulp
    .src("js/*.js")
    .pipe(concat("script.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
}

function watch() {
  gulp.watch("styles/*.css", styles);
  gulp.watch("js/*.js", scripts);
}

var build = gulp.series(gulp.parallel(styles, scripts));

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
