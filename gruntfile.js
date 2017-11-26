/*
npm install grunt-contrib-jshint grunt-contrib-concat --save-dev
*/

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: ['js_src/*.js', 'js/*.js']
    },
    concat: {
      options: {
        process: function(src, filepath) {
          return '/*\n#### ' + filepath + ' ####\n*/\n' + src;
        }
      },
      dist: {
        src: ['js_src/Column.js', 'js_src/Card.js', 'js_src/Board.js', 'js_src/App.js'],
        dest: 'js/scripts.js',
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint', 'concat']);

};