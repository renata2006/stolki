const gulp = require("gulp");
// css
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
// ts
const babel = require("gulp-babel");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const tsify = require("tsify");
const size = require("gulp-size");
const sourcemaps = require("gulp-sourcemaps");
const watchify = require("watchify");
const fancy_log = require("fancy-log");

const prod = {
  basedir: ".",
  debug: true,
  entries: ["src/main.ts", "src/shareList.ts"],
  cache: {},
  packageCache: {},
};
let a = browserify({ ...prod, plugin: [tsify] });

function styles() {
  return gulp
    .src("styles/*.css")
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(concat("style.min.css"))
    .pipe(
      size({
        title: "styles",
      })
    )
    .pipe(gulp.dest("dist"));
}

function watchTs() {
  a = browserify({
    ...prod,
    plugin: [tsify, watchify],
  });

  a.on("update", bundle);
  return bundle();
}

function bundle() {
  return a
    .bundle()
    .on("error", fancy_log)
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))

    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(
      size({
        title: "scripts",
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist"));
}

function watch() {
  gulp.watch("styles/*.css", styles);
  watchTs();
}

function lazysizes() {
  return gulp.src("./lazysizes/lazysizes.min.js").pipe(gulp.dest("dist"));
}

var build = gulp.series(gulp.parallel(styles, bundle, lazysizes));

exports.watch = watch;
exports.build = build;
