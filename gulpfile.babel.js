import gulp from 'gulp';
import config from './config.json';
import jsdocConfig from './jsdoc.json';

import axeWeb from 'gulp-axe-webdriver';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import gulpLoadPlugins from 'gulp-load-plugins';
import gutil from 'gulp-util';
import jsdoc from 'gulp-jsdoc3';
import jshint from 'gulp-jshint';
import jshint_styles from 'jshint-stylish';
import newer from 'gulp-newer';

import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';


const $ = gulpLoadPlugins();
const reload = browserSync.reload;


/// 
/// ------------------ LINT ------------------
///
gulp.task('lint', () => {
    return gulp.src(config.env.dev + 'js/**/*.es6.js')
        .pipe(jshint({
            esversion: 6,
            expr: true,
            jquery: true,
            eqeqeq: true,
            curly: true
        }))
        .pipe(jshint.reporter(jshint_styles))
        .pipe(reload({stream: true}));
});

/// 
/// ------------------ CLEANUP ------------------
///
gulp.task('clean:js', () => {
    return gulp.src(config.env.wwwroot + 'js/**/*.*')
        .pipe(clean({force: true}));
});

gulp.task('clean:css', () => {
    return gulp.src(config.env.wwwroot + 'css/**/*.*')
        .pipe(clean({force: true}));
});
gulp.task('clean:views', () => {
    return gulp.src(config.env.wwwroot + '**/*.html')
        .pipe(clean({force: true}));
});
gulp.task('clean', ['clean:js', 'clean:css', 'clean:views'], () => {
    
});



gulp.task('javascript', ['clean:js', 'lint', 'build-sites-js'], () => {
   
});


/// 
/// ------------------ ACCESSIBILITY ------------------
///
gulp.task('axe-html', ['html'], (done) => {
    if( config.a11y.enabled ){
        var options = {
                browser: 'phantomjs',
                urls: config.a11y.urls,
                include: config.a11y.include,
                exclude: config.a11y.exclude
        };
        return axeWeb(options, done);
    }
});

gulp.task('axe-stylesheet', ['stylesheet'], (done) => {
    if( config.a11y.enabled ){
        var options = {
                browser: 'phantomjs',
                urls: config.a11y.urls,
                include: config.a11y.include,
                exclude: config.a11y.exclude
        };
        return axeWeb(options, done);
    }
});

gulp.task('axe-javascript', ['javascript'], (done) => {
    if( config.a11y.enabled ){
        var options = {
                browser: 'phantomjs',
                urls: config.a11y.urls,
                include: config.a11y.include,
                exclude: config.a11y.exclude
        };
        return axeWeb(options, done);
    }
});





/// 
/// ------------------ COMPILERS ------------------
///
gulp.task('build-sites-js', () =>{



       let styleGuideCompiler = webpack({   
            loaders: [
              {
                test: /(foundation\.core)/,
                loader: 'exports?foundation=jQuery.fn.foundation'
              }
            ],
            resolve: {
              extensions: ['', '.js'],
              alias: {
                foundation: 'foundation-sites/js/foundation.core'
              }
            },
            plugins: [
              new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
              })
            ],
            entry: config.env.dev + 'js/scripts.es6.js',  
            output: {
                 path: config.env.wwwroot + 'js/',
                 filename: 'scripts.js',
            },
            module: {
                 loaders: [{
                     test: /\.js$/,
                     loader: 'babel-loader'
                 }]
            },
            devtool: 'sourcemap',
            debug: false
        });


        styleGuideCompiler.run(function (err, stats) {
            if (err) throw new gutil.PluginError('webpack:js', err);
        });

});

gulp.task('stylesheet', () => {
    return gulp.src(config.env.dev + 'scss/**/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.env.wwwroot + 'css/'))
        .pipe(reload({stream: true}));
});

gulp.task('html', () => {
     gulp.src(config.env.dev + 'views/**/*.html')
            .pipe(gulp.dest(config.env.wwwroot))
            .pipe(reload({stream: true}));  
});

gulp.task('build-doc', (cb) => {
    gulp.src(['README.md', config.env.dev + 'js/**/*.es6.js'], {read: true})
        .pipe(jsdoc(jsdocConfig,cb));   
});


/// 
/// ------------------ ENVIRONMENTS ------------------
///
gulp.task('launch-env', () => {
    browserSync({
        notify: true,
        port: 9000,
        ui: {
            port: 3000
        },
        server: {
            baseDir: [config.env.wwwroot]
        }
    });

    gulp.watch(config.env.dev + 'scss/**/*.scss', ['axe-stylesheet']);
    gulp.watch(config.env.dev + 'js/**/*.es6.js', ['axe-javascript']);
    gulp.watch(config.env.dev + 'views/**/*.html', ['axe-html']);

});

gulp.task('serve:docs', ['build-doc'], () => {
    browserSync({
        notify: true,
        port: 9000,
        server: {
            baseDir: ['./jsdocs']
        }
    });

});

gulp.task('watch', () => {
    gulp.watch(config.env.dev + 'scss/**/*.scss', ['axe-stylesheet']);
    gulp.watch(config.env.dev + 'js/**/*.es6.js', ['axe-javascript']);
    gulp.watch(config.env.dev + 'views/**/*.cshtml', ['axe-html']);
});


/// 
/// ------------------ TASKS ------------------
///

gulp.task('default', ['stylesheet', 'html', 'javascript', 'watch']);
gulp.task('serve', ['stylesheet', 'html', 'javascript', 'launch-env']);
gulp.task('build', ['stylesheet', 'html', 'javascript']);





