const gulp = require('gulp');
const git = require('gulp-git');

const argv = require('yargs').argv;

const util = require('brody_logger');

const jeditor = require('gulp-json-editor');
const current = require('./package.json');

gulp.task('bump', ['changeVersion', 'add', 'commit', 'push'], () => {

});

gulp.task('changeVersion', () => {
  console.log('bumping version...')
  const newVersionNumber = util.bump(current.version, argv.push);

  console.log('Version Changed from', current.version, 'to', newVersionNumber);
  gulp.src('./package.json')
    .pipe(jeditor({
      version: newVersionNumber,
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('add', () => {
  console.log('adding to git...')
  return gulp.src('./package.json')
  .pipe(git.add());
});

gulp.task('commit', () => {
  console.log('commiting to git...')
  return gulp.src('./package.json')
  .pipe(git.commit('Version bumped with gulp'));
});

gulp.task('push', function(){
  console.log('pushing to branch...')
  git.push('origin', 'release', function (err) {
    if (err) throw err;
  });
});
