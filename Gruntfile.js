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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['concat']);
    grunt.registerTask('default', ['concat', 'watch']);
};