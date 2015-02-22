"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        babel: {
            options: {
                comments: false
            },
            dist: {
                files: {
                    'build/ensure.js': 'build/ensure.js.es6'
                }
            }
        },

        concat: {
            dist: {
                src: ['src/*.js', 'src/ss/*.js'],
                dest: 'build/ensure.js.es6'
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
        },

        jsdoc : {
            dist : {
                src: ['src/*.js', 'README.md'],
                options: {
                    destination: 'doc',
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "jsdoc.conf.json"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
    grunt.registerTask('build', ['concat', 'babel']);
    grunt.registerTask('default', ['concat', 'babel', 'watch']);
};
