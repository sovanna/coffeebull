const gulp = require('gulp');

const _electron = require('electron-connect').server.create({
  electron: './node_modules/.bin/electron',
  useGlobalElectron: false
});

gulp.task('watch', () => {
  _electron.start();

  gulp.watch([
    './src/main.js'
  ], _electron.restart);
});

gulp.task('live', ['watch']);