var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var plumber = require("gulp-plumber");
var concat = require("gulp-concat");
var semi = require("gulp-semi").add;
var del = require("del");

const FILE_NAME = "NicoMaterialRetriever.jsx";
const DIST_DIR = "./dist/";

gulp.task("clean", () => {
  del(DIST_DIR + FILE_NAME);
});

gulp.task("compile", ["clean"], () => {
  return browserify({
    entries: ["./src/entry.js"]
  })
  .transform("babelify", { presets: ["es2015"] })
  .bundle()
  .pipe(plumber())
  .pipe(source(FILE_NAME))
  .pipe(gulp.dest(DIST_DIR));
});

gulp.task("build", ["compile"], () => {
  return gulp.src(["./bootstrap/bootstrap.js", DIST_DIR + FILE_NAME])
    .pipe(plumber())
    .pipe(concat(FILE_NAME))
    .pipe(semi({ leading: true }))
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task("watch", ["build"], () => {
  gulp.watch(["./src/**/*.js", "./bootstrap/**/*.js"], ["build"]);
});

gulp.task("default", ["watch"]);
