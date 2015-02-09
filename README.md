# grunt-harp-post

> Task that interactively creates blog posts or other content for [HARP](http://harpjs.com)

<img src="http://zippy.gfycat.com/IckyPepperyKusimanse.gif" />

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-harp-post --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-harp-post');
```

## What it does

This task creates a new blog (or other content type) page on your harp.js website and updates the associated `_data.json` file. When you run the task, it will interactively ask you to fill in any meta data. The task will automatically turn your content title into a slug, which is used as the file name. Meta data fields are configurable, so you can make your own content types. You can also define multiple tasks for different content types, eg: `harp_post:blog`, `harp_post:article`, etc.

## The "harp_post" task

### Overview
In your project's Gruntfile, add a section named `harp_post` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  harp_post: {
      post: {
        options: { 
          path: "posts/",
          templatePath: "templates/post.md",
        }
      }
  },
});
```

### Options

#### options.destFolderBase
Type: `String`
Default value: `'public/'`

The location of your harp public folder.

#### options.templatePath
Type: `String`
Default value: `templates/post.md`

The location of a file that will be copied in as the template of your post. If it doesn't exist, a blank file will be created.

#### options.path
Type: `String`
Default value: `posts/`

The location to put your new content type (relative to `options.destFolderBase`). 

#### options.fileDate
Type: `Boolean`
Default value: `true`

Controls whether the date is added as part of the file name

#### options.fields
Type: `Array`
Default value: `templates/post.md`

An array of questions to ask the user. The results of which are entered into your _data.json in the folder of your content type.

See the great [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) for instructions on how to format your questions.

By default, `title` and `Date` questions will be asked (and cannot be removed).

#### options.calback
Type: `Function`
Parameters: (answers)

If defined, will call a function and pass the answers so you can do additional work.

### Usage Examples

#### Basic usage
In this example, we're defining a custom checkbox type. 

```js
grunt.initConfig({
  harp_post: {
      post: {
        options: { 
          path: "posts/",
          templatePath: "templates/post.md",
        }
      }
  },
});
```


#### Custom question example
In this example, we're defining a custom checkbox type. 

```js
grunt.initConfig({
  harp_post: {
      post: {
        options: { 
          destFolderBase: "public/",
          templatePath: "templates/post.md",
          path: "posts/",
          fields: [
            {
              type: "checkbox",
              message: "Categories",
              name: "categories",
              choices: [ 
                "News",
                "Social",
                "SEO",
                "Technology",
                "Press Release",
              ]
            }
          ]
        }
      }
  },
});
```

The above code might produce the following entry in the `_data.json` file.
```js
  "2014-10-07-test2": {
    "title": "test2",
    "date": "2014-10-07T00:00:00-04:00",
    "categories": [
      "News"
    ],
    "month": "10",
    "day": "07",
    "year": "2014"
  }
  ```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
