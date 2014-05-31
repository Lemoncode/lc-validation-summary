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
		
		ngmin: {
			all: {
				files: [
					{												
						src: ['./src/**/*.js'],
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
	});

	grunt.registerTask('default', ['build']);

	grunt.registerTask('build', ['clean', 'ngmin', 'uglify', 'copy']);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

};