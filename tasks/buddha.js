/*
 * grunt-buddha
 * none
 *
 * Copyright (c) 2018 zyfpopq
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('buddha', 'The best Grunt plugin ever.', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      who:'buddha',
	  commentSymbol:'//'
    });
	  
	var testExist = {
		'buddha':'┗┓┓┏━┳┓┏┛'
	};
		
    var who = options.who,
		commentSymbol = options.commentSymbol,
	
	 commentFile = {
		'buddha':'assets/shenshou.txt'
	},
	 commentFilePath = path.join(__dirname,commentFile[who]),
	 commentContent = grunt.file.read(commentFilePath),
		
		lineCommentArr = commentContent.split(grunt.util.normalizelf('\n'));
	  
	  lineCommentArr.forEach(function(value,index,arr){
		  arr[index] = commentSymbol+value;
	  });
	    
	  commentContent = lineCommentArr.join(grunt.util.normalizelf('\n'));
		
    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
      file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
		  var oldfilepath = grunt.file.read(filepath),
		      newfilecontent = commentContent+grunt.util.normalizelf('\n')+oldfilepath;
        // Read file source.
		  
		  if (testExist[who].test(oldfilepath)){
			  return;
		  }
		  
		  grunt.file.write(filepath,newfilecontent);
        //return grunt.file.read(filepath);
      });

      // Handle options.
      //src += options.punctuation;

      // Write the destination file.
      //grunt.file.write(file.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
