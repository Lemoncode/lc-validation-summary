module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      options: {force: true},
      all: {
        src: ['./build/**/*.*']
      }
    },

    copy: {
      main: {
         files: [
          {expand: true, flatten: true, src: ['./css/lcValidationSummary.css'], dest: './build/',  filter: 'isFile'}
         ]
      }
    },

    connect: {
        server: {
          options: {
            hostname: 'localhost',
            port: 8080,
            keepalive:true,
            open: {
              target: 'http://localhost:8080/samples/index.html'
            }
          }
        }
     },

      ngtemplates: {
        lcValidationSummary: {
          module:'lcValidationSummary',
          standalone: false,
          src:['./src/directives/*.html'],
          dest: './build/lcvalidationSummary-tpl.js'
        }
      },

    concat: {
      dist: {
        src: ['./src/namespace.js', './src/directives/*.js', './src/services/*.js'],
        dest: './build/lcvalidationsummary.js'
      }
    },

    ngmin: {
      all: {
        files: [
          {
            src: ['./build/lcvalidationsummary.js'],
            dest: './build/lcvalidationsummary.js',
            ext: '.js'
          }
        ]
      }
    },

    uglify: {
      all: {
        files: [
          {
            src: ['./build/lcvalidationsummary.js'],
            dest: './build/lcvalidatinsummary.min.js',
          }
        ]
      }
    },
    karma: {
      unit: {
        configFile: './test/karma.conf.js',
      }
    }
  });

  grunt.registerTask('default', ['web']);

  grunt.registerTask('build', ['clean', 'ngtemplates', 'concat', 'ngmin','uglify', 'copy']);

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('web', ['connect']);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-connect');
};