# grunt-harp-post

> Task that interactively creates blog posts or other content for HARP

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

## The "harp_post" task

### Overview
In your project's Gruntfile, add a section named `harp_post` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  harp_post: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
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
Default value: `post/`

The location to put your new content type (relative to `options.destFolderBase`). 

#### options.fields
Type: `Array`
Default value: `templates/post.md`

An array of questions to ask the user. The results of which are entered into your _data.json in the folder of your content type.

See the great [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) for instructions on how to format your questions.

By default, `title` and `Date` questions will be asked (and cannot be removed).


### Usage Examples

#### Basic usage
In this example, we're defining a custom checkbox type. 

```js
grunt.initConfig({
  harp_post: {
      post: {
        options: { 
          destFolderBase: "public/",
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
          destFolderBase: "tmp/",
          templatePath: "template/post.md",
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

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
