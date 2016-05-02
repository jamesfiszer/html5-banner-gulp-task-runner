var currentProjectPath = '<Path to Banner Source Root Directory>';
var browserSyncPath = '<Path to current banner being worked on>';

var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    beautify = require('gulp-beautify'),
    jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    zip = require('gulp-zip'),
    prompt = require('gulp-prompt')
    htmlreplace = require('gulp-html-replace')
    jsonfile = require('jsonfile'),
    util = require('util'),
    del = require('del')

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: browserSyncPath
        },
        port: 3333,
        notify: false
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('css', function () {
    return gulp.src(currentProjectPath+'**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest(currentProjectPath))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
  gulp.src(currentProjectPath+'**/main.js')
    .pipe(plumber())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('dist_copy', function(){
    gulp.src([currentProjectPath+'**/*.{html,css,js,jpg,png,svg,ttf,woff,eot,json}', '!'+currentProjectPath+'_review/*'])
     .pipe(gulp.dest(currentProjectPath+'_dist/'))
})

gulp.task('dist_js',function(){
  gulp.src(currentProjectPath+'_dist/**/*.js')
    .pipe(plumber())
    .pipe(beautify({
        "indent_level": 0,
        "indent_char": " ",
        "indent_size": 4,
        "indent_with_tabs": true,
        "brace_style": "collapse",
        "preserve_newlines": false
    }))
    .pipe(gulp.dest(currentProjectPath+'_dist/'))
});

function getFolders(dir){
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir,file)).isDirectory();
        });
}

function getDate(){
    var date = new Date();
    var year = String(date.getUTCFullYear());
    var month = date.getUTCMonth()+1;
    var day = String(date.getUTCDate());
    if(month <= 9){
        month = '0'+month;
    }
    var dateString = year+String(month)+day;
    return dateString;
}

gulp.task('zip', function(){
    var dateFolder = getDate();
    var folders = getFolders(currentProjectPath+'_dist/');
    return folders.map(function(folder) {
        return gulp.src([currentProjectPath+'_dist/'+folder+'/*'])
        .pipe(zip(folder+'.zip'))
        .pipe(gulp.dest(currentProjectPath+'_delivery/'+dateFolder));
    })
});

function createJsonObj(data){
    var array = []
    for(var i in data){
        var newObj = {};
        newObj.path = '../'+data[i];
        array.push(newObj);
    }
    return array;
}

gulp.task('clean', function(){
    del([currentProjectPath+'.tmp', currentProjectPath+'_dist', currentProjectPath+'_delivery'], {force: true});
});

gulp.task('default', ['css', 'js', 'browser-sync'], function(){
    gulp.watch(currentProjectPath+"**/*.scss", ['css']);
    gulp.watch(currentProjectPath+"**/*.js", ['js']);
    gulp.watch(currentProjectPath+"**/*.html", ['bs-reload']);
});

gulp.task('development', ['css', 'js', 'browser-sync'], function(){
    gulp.watch(currentProjectPath+"**/*.scss", ['css']);
    gulp.watch(currentProjectPath+"**/*.js", ['js']);
    gulp.watch(currentProjectPath+"**/*.html", ['bs-reload']);
});

gulp.task('build', ['clean','dist_copy','dist_js'], null);