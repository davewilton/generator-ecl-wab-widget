/*
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        bump: {
            options: {
                pushTo: 'origin',
                commit: true
            }
        }
    });
    grunt.loadNpmTasks('grunt-bump');
};