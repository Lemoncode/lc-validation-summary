module.exports = function(grunt) {
	grunt.initConfig({	
		clean: {
			options: {force: true},
			all: {
				src: ['./build/**/*.*']
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

	grunt.registerTask('build', ['clean', 'ngmin', 'uglify']);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

};