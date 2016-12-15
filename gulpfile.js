var gulp = require("gulp");
var watch = require("gulp-watch");
var shell = require("gulp-shell");
var browserSync = require("browser-sync").create();

gulp.task('example', function () {
  return gulp.src('*.js', {read: false})
    .pipe(shell([
      'echo <%= f(file.path) %>',
      'ls -l <%= file.path %>'
    ], {
      templateData: {
        f: function (s) {
          return s.replace(/$/, '.bak')
        }
      }
    }))
});

gulp.task('shorthand', shell.task([
  'echo Running: python3 chocolate/compile.py config/flixbus.json views/preview ...',
  'python3 chocolate/compile.py config/flixbus.json views/preview'
]));


gulp.task('stream', function () {
    // Endless stream mode
    gulp.watch('config/*.json').on('change', shell.task([
      'echo Running: python3 chocolate/compile.py config/flixbus.json views/preview ...',
      'python3 chocolate/compile.py config/flixbus.json views/preview'
    ]));
    //gulp.watch('views/preview/index.html').on('change',browserSync.reload);


//    return watch('config/**/*.json', { ignoreInitial: false })
//        .pipe(browserSync.reload({
//          stream: true
//        }));


});
