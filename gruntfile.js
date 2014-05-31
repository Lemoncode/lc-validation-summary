module.exports = function(grunt) {
	grunt.initConfig({	
		clean: {
			options: {force: true},
			all: {
				src: ['./build/**/*.*']
			}
		}		
	});

	grunt.registerTask('default', ['build']);

	grunt.registerTask('build', ['clean']);

    grunt.loadNpmTasks('grunt-contrib-clean');
};