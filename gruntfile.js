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
					{expand: true, flatten: true, src: ['./css/ngValidationSummary.css'], dest: './build/',  filter: 'isFile'}			   
			   ]
			}
		},

		concat: {
			dist: {
				src: ['./src/namespace.js', './src/directives/*.js', './src/services/*.js'],
				dest: './build/ngvalidationsummary.js'
			}
		},

		ngmin: {
			all: {
				files: [
					{												
						src: ['./build/ngvalidationsummary.js'],
						dest: './build/ngvalidationsummary.js',
						ext: '.js'
					}
				]
			}
		},

		uglify: {
			all: {
				files: [
					{						
						src: ['./build/ngvalidationsummary.js'],
						dest: './build/ngvalidatinsummary.min.js',						
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

	grunt.registerTask('default', ['build']);
	
	grunt.registerTask('build', ['clean', 'concat', 'ngmin','uglify', 'copy']);

	grunt.registerTask('test', ['karma']);	
	
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-concat');

};