"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            dist: {
                src: ['src/*.js', 'src/ss/*.js'],
                dest: 'ensure.js'
            }
        },

        watch: {
            js: {
                files: ['src/*.js', 'src/ss/*.js'],
                tasks: ['concat']
            }
        },

        mocha_istanbul: {
            coverage: {
                src: 'test/', // the folder, not the files,
                options: {
                    mask: '**/*Test.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
    grunt.registerTask('build', ['concat']);
    grunt.registerTask('default', ['concat', 'watch']);
};