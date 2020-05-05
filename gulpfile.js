const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;

gulp.task("minify-css", () => {
  return gulp
    .src("styles/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(concat("style.min.css"))
    .pipe(gulp.dest("dist"));
});

gulp.task("minify-js", () => {
  gulp
    .src("js/*.js")
    .pipe(uglify())
    .pipe(concat("script.min.js"))
    .pipe(gulp.dest("dist"));
});

gulp.task("build", ["minify-css", "minify-js"]);
