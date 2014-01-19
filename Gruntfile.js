module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      src: 'src/**/*.js',
      options: {
        specs: 'spec/**/*.js',
      },
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'src/**/*.js',
        'spec/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    watch: {
      tests: {
        files: ['<%= jshint.all %>'],
        tasks: ['test']
      },
      docs: {
        files: ['Gruntfile.js', 'docs/*.md'],
        tasks: ['docco']
      }
    },
    docco: {
      docs: {
        src: ['docs/*.md'],
        options: {
          output: 'docs/html/',
          layout: 'linear',
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-docco');

  grunt.registerTask('test', ['jshint', 'jasmine']);

  grunt.registerTask('default', ['test']);
};