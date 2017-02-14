'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const _ = require('lodash');
const path = require('path');
const $ = require('gulp-load-plugins');
const size = require('gulp-size');
const notify = require('gulp-notify');
const traceException = gutil.log;

const argv = require('yargs').argv;

//const yorc = require(path.join()'./.yo-rc.json');
const prompts = {
	projectPath: argv.projectPath || process.cwd()
};


gulp.task('images', () => {
  const s = size({
    showFiles:true
  });

  const filePath = prompts.projectPath + '/**/*';
  gutil.log('filePath', filePath);
  return gulp.src(['**/*', "!./node_modules/**/*"], {cwd: prompts.projectPath})
    .pipe(s)
    .pipe(notify({
            onLast: true,
            message: () => `Images Total size ${s.prettySize}`
        }));
});


gulp.task('init', ['images'], () => {
  gutil.log(prompts);
  gulp.watch(['**/*', "!./node_modules/**/*"], {cwd: prompts.projectPath}, ['images']);
});
