/*
 * grunt-harp-post
 * https://github.com/dwarcher/grunt-harp-post
 *
 * Copyright (c) 2014 Dave Wallin
 * Licensed under the MIT license.
 */

 /*
  * TODO:
  * - Make it so slug (filename) format is configurable? Time / no time?
  */ 

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('harp_post', 'Task that interactively creates blog posts or other content for HARP', function() {
    
    var fs = require('fs');
    var moment = require('moment');
    var inquirer = require('inquirer');
    var exec = require('child_process').exec;
    var jf = require('jsonfile');
    var mkdirp = require('mkdirp');

    var curTime = moment();


    function slugify (sz) {
      return sz.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }

    function copyFile(source, target, cb) {
      var cbCalled = false;

      var rd = fs.createReadStream(source);
      rd.on("error", function(err) {
        done(err);
      });
      var wr = fs.createWriteStream(target);
      wr.on("error", function(err) {
        done(err);
      });
      wr.on("close", function(ex) {
        done();
      });
      rd.pipe(wr);

      function done(err) {
        if (!cbCalled) {
          cb(err);
          cbCalled = true;
        }
      }
    }
    
    var baseContentType = {
      path: "posts/",
      templatePath: "templates/post.md",
      fileDate: true,
      questions: [ 
        { 
          type: "input", 
          message: "Title",
          name: "title",
          default: "untitled" 
        },
        { 
          type: "date", 
          message: "Date (MM-DD-YYYY)",
          name: "date",
          default: curTime.format("MM-DD-YYYY")
        }
      ]
    };

  // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      openPage: false,
      editPage: false,
      destFolderBase: "public/",
      path: "posts/",
      templatePath: "templates/post.md",
    });

    if(options.path)
    {
      baseContentType.path = options.path;
    }

    if(options.templatePath)
    {
      baseContentType.templatePath = options.templatePath;
    }

    if(options.fields)
    {
      // add to base questions
      baseContentType.questions = baseContentType.questions.concat(options.fields);
    }

    var contentType = baseContentType;
    var contentDataFile = options.destFolderBase + contentType.path + "_data.json";
    var blogEntries;

    if (fs.existsSync(contentDataFile)) {
      blogEntries = jf.readFileSync(contentDataFile);
    } else {
      blogEntries = { };
    }

    var done = this.async();
    inquirer.prompt( contentType.questions, function(answers) {
        var pickedDate = moment(answers.date, "MM-DD-YYYY");
        var sluggedTitle = slugify(answers.title);
        var fileName;

        if(options.fileDate)
        {
          fileName = pickedDate.format("YYYY-MM-DD") + "-" + sluggedTitle;
        } else {
          fileName = sluggedTitle;
        }

        // add extra date info
        answers.date = pickedDate.format();
        answers.month = pickedDate.format("MM");
        answers.day = pickedDate.format("DD");
        answers.year =pickedDate.format("YYYY");

        if(options.callback)
        {
          options.callback(answers);
        }

        // update blog entries..
        blogEntries[fileName] = answers;

        // write updated data file

        // Create posts folder if it doesn't exist
        mkdirp.sync(options.destFolderBase + contentType.path);

        jf.writeFileSync(contentDataFile, blogEntries);

        var destPath = options.destFolderBase + contentType.path + fileName + ".md";
        copyFile(contentType.templatePath, destPath, function() {
        console.log("Created " + destPath + "\n");
       
        if(options.editPage)
        {
          // attempt to edit the page.. Note that this probably only works on macs.

          exec('open ' + destPath, function (error, stdout, stderr) {
            // output is in stdout
          });        
        }

        if(options.openPage)
        {
          // attempt to open the page.. Note that this probably only works on macs.
          exec('open http://localhost:9000/' + contentType.path + fileName + ".html", function (error, stdout, stderr) {
            // output is in stdout
          });
        }


        done();

      });
    } );
  });

};
