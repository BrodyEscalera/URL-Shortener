const gulp = require('gulp');
const git = require('gulp-git');

const argv = require('yargs').argv;

const util = require('brody_logger');

const jeditor = require('gulp-json-editor');
const current = require('./package.json');

/* The automatic bumping is done by pulling the bump utility from the brody
 logger and using it to increment the version number. The version number is
  pulled from the current package.json and then sent to the bump utility in
    brody_logger. Then the modified package.json is then added, committed and
     pushed to the release branch in github. In terminal the gulp task should
      be called like this: $gulp bump --push=patch or $gulp bump --push=minor
      $gulp bump --push=major depending on the type of version change you are
       seeking*/
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
  console.log('pushing to release branch...')
  git.push('origin', 'release', function (err) {
    if (err) throw err;
  });
});
