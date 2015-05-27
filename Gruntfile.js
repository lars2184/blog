module.exports = function(grunt) {
 
   require('load-grunt-tasks')(grunt);

   grunt.initConfig({
   
      autoprefixer: {
        compile: {
          files: {
            'css/style-sass.css': 'css/style-sass.css'
          },
        },
      },

      sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'css/style-sass.css': 'scss/style-sass.scss'
            }
        }
      },

      // cssmin: {
      //   clean: {
      //     files: {
      //       'build/style.css': 'build/style.css'
      //     }
      //   }
      // },

      // uglify: {
      //   bower_js_files: {
      //     files: {
      //       'build/output.min.js': [
      //         'bower_components/jquery/dist/jquery.js',
      //         'bower_components/modernizr/modernizr.js'
      //       ]
      //     }
      //   }
      // },

      watch: {
        stylus: {
          files: [ 'scss/*.scss' ],
          tasks: ['sass', 'autoprefixer']
        }
      },

      browserSync: {
        bsFiles: {
          src : ['css/*.css', 'index.html', 'glossary.html']
        },
        options: {
          watchTask: true,
          server: {
            baseDir: ""
          }
        }
      }

      // express: {
      //   all: {
      //     options: {
      //       bases: 'build',
      //       livereload: true,
      //       open: 'http://localhost:3000'
      //     }
      //   }
      // }
   
  });

  // grunt.registerTask('default', ['sass']);

  // Load grunt plugins.
  // grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-autoprefixer');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-jade');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-watch');

  // for reloading browser
  //grunt.loadNpmTasks('grunt-express');

  grunt.loadNpmTasks('grunt-browser-sync');

  //grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'uglify']);
  grunt.registerTask('default', ['sass', 'autoprefixer']);
  //grunt.registerTask('start', ['express', 'watch']);
  grunt.registerTask('start', ['browserSync', 'watch']);

};