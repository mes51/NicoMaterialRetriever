var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var plumber = require("gulp-plumber");
var del = require("del");

const FILE_NAME = "NicoMaterialRetriever.jsx";
const DIST_DIR = "./dist/";

gulp.task("clean", () => {
  del(DIST_DIR + FILE_NAME);
});

gulp.task("build", ["clean"], () => {
  return browserify({
    entries: ["./src/entry.js"]
  })
  .transform("babelify", { presets: ["es2015"] })
  .bundle()
  .pipe(plumber())
  .pipe(source(FILE_NAME))
  .pipe(gulp.dest(DIST_DIR));
});

gulp.task("watch", ["build"], () => {
  gulp.watch(["./src/**/*.js"], ["build"]);
});

gulp.task("default", ["watch"]);
