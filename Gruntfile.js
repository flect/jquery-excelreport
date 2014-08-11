module.exports = function(grunt) {
    'use strict';
    function loadDependencies(deps) {
        if (deps) {
            for (var key in deps) {
                if (key.indexOf("grunt-") == 0) {
                    grunt.loadNpmTasks(key);
                }
            }
        }
    }
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: "dist"
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "src",
                    src: "*.js",
                    dest: "dist"
                },
                {
                    expand: true,
                    cwd: "src/i18n",
                    src: "*.js",
                    dest: "dist/i18n"
                },
                {
                    expand: true,
                    cwd: "bower_components/excel2canvas/dist",
                    src: "*.css",
                    dest: "dist"
                }]
            },
            app: {
                files: [{
                    expand: true,
                    cwd: "dist",
                    src: "*.js",
                    dest: "../report2/public/javascripts"
                },
                {
                    expand: true,
                    cwd: "dist/i18n",
                    src: "*.js",
                    dest: "../report2/public/javascripts/i18n"
                }]
            }
        },
        concat: {
            full : {
                src : [
                    "bower_components/flotr2/flotr2.js",
                    "bower_components/roomframework/dist/roomframework.js",
                    "bower_components/excel2canvas/dist/jquery.excel2canvas.js",
                    "bower_components/excel2canvas/dist/jquery.excel2chart.flotr2.js",
                    "src/jquery.excelreport.js"
                ],
                dest: "dist/jquery.excelreport.full.js"
            },
            nochart : {
                src : [
                    "bower_components/roomframework/dist/roomframework.js",
                    "bower_components/excel2canvas/dist/jquery.excel2canvas.js",
                    "src/jquery.excelreport.js"
                ],
                dest: "dist/jquery.excelreport.nochart.js"
            }
        },

        uglify: {
            build: {
                files: [{
                    "dist/jquery.excelreport.min.js": "dist/jquery.excelreport.js",
                    "dist/jquery.excelreport.full.min.js": "dist/jquery.excelreport.full.js",
                    "dist/jquery.excelreport.nochart.min.js": "dist/jquery.excelreport.nochart.js",
                    "dist/i18n/jquery.excelreport.msg_ja.min.js": "dist/i18n/jquery.excelreport.msg_ja.js",
                }]
            }
        },

        jshint : {
            all : ['src/*.js']
        },
        
        watch: {
            scripts: {
                files: [
                    'src/*.js'
                ],
                tasks: ['jshint', 'copy:dist', 'concat', 'uglify', "copy:app"]
            }
        }
    });
 
    loadDependencies(grunt.config("pkg").devDependencies);

    grunt.registerTask('default', [ 'jshint', 'copy:dist', 'concat', 'uglify']);
    grunt.registerTask('cp', [ 'copy:app']);

};