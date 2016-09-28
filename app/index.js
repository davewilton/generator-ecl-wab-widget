'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var dasherize = require('underscore.string/dasherize');
var updateNotifier = require('update-notifier');
var pkg = require('../package.json');
var yeoman = require('yeoman-generator');
var prettify = require('gulp-jsbeautifier');
var yosay = require('yosay');
var trim = require('trim');

var DojoWidgetGenerator = yeoman.Base.extend({

  prompting: function () {

    var done = this.async();
    var testPageMapChoices = ['No map', 'Empty map - i.e. new Map()', 'Web map - i.e. arcgisUtils.createMap()'];

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the ecl-wab-widget generator!'));
    this.log(chalk.yellow('It is best to run this generator within the "Widgets" folder of a WAB application'));

    //check fot updates
    updateNotifier({ pkg: pkg, updateCheckInterval: 60000 }).notify(); //checks once an hour

    var prompts = [{
      name: 'widgetName',
      message: 'Widget Name (Should end with Widget e.g. MyWidget)',
      'default': 'MyWidget'
    }, {
        name: 'description',
        message: 'Description:'
      }, {
        type: 'confirm',
        name: 'widgetsInTemplate',
        message: 'Will the template contain other widgets?',
        'default': true
      }, {
        type: 'list',
        name: 'testPageMap',
        message: 'What kind of map would you like in the test page?',
        choices: testPageMapChoices,
        'default': 2
      }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;

      try {

        this.props.widgetName = trim(props.widgetName);

        var endsWith = function (str, suffix) {
          return str.indexOf(suffix, str.length - suffix.length) !== -1;
        };
        if (!endsWith(this.props.widgetName.toLowerCase(), 'widget')) {
          this.props.widgetName += 'Widget';
        }
        this.props.subWidgetName = this.props.widgetName.replace('Widget', '');
        this.props.baseClass = dasherize(this.props.widgetName).replace(/^-/, '');
        this.props.widgetTitle = this.props.widgetName;

        this.props.description = props.description;
        this.props.path = props.widgetName + '/';

        this.props.widgetsInTemplate = props.widgetsInTemplate;
        this.props.testPageMap = testPageMapChoices.indexOf(props.testPageMap);

        this.props.inPanel = true; // developer can set this layer
        this.props.hasConfig = true; //we will always require config of some form.
        this.props.hasLocale = false; // Our sub widget will contain the nls
        this.props.hasStyle = false; // Our sub widget will contain the style
        this.props.hasUIFile = false; // Our sub widget will contain the UI

        //settings choices
        // settings
        this.props.hasSettingPage = props.hasSettingPage;
        this.props.hasSettingUIFile = this.hasSettingPage ? (props.settingsFeatures.indexOf('hasSettingUIFile') > -1) : false;
        this.props.hasSettingLocale = this.hasSettingPage ? (props.settingsFeatures.indexOf('hasSettingLocale') > -1) : false;
        this.props.hasSettingStyle = this.hasSettingPage ? (props.settingsFeatures.indexOf('hasSettingStyle') > -1) : false;
        this.props.needsManifestProps = (!this.inPanel || !this.hasLocale);


        done();

      } catch (e) {
        this.log(chalk.red(e));
      }
    }.bind(this));
  },

  writing: function () {

    try {
      //this will beautify our files, in particular the html files. It will not touch the ts files
      this.registerTransformStream(prettify());

      this.path = this.props.path;

      this._templateFile('_Widget.ts', this.path + 'Widget.ts');
      if (this.props.hasUIFile) {
        this._templateFile('_Widget.html', this.path + 'Widget.html');
      }
      if (this.props.hasConfig) {
        this._templateFile('_config.json', this.path + 'config.json');
      }
      if (this.props.hasStyle) {
        this._templateFile('css/_style.css', this.path + 'css/style.css');
      }

      this.copy('images/icon.png', this.path + 'images/icon.png');
      this._templateFile('_manifest.json', this.path + 'manifest.json');


      //get the name of the widget to create our sub widget
      var subNamePath = '/' + this.props.subWidgetName + '/';
      var subName = this.props.subWidgetName;

      //create the sub widget
      this.copy('subWidget/tests.css', this.path + subNamePath + 'tests/tests.css');
      this._templateFile('subWidget/_widget.ts', this.path + subNamePath + subName + '.ts');
      this._templateFile('subWidget/_template.html', this.path + subNamePath + 'templates/' + subName + '.html');
      this._templateFile('subWidget/_test_page.html', this.path + subNamePath + 'tests/' + subName + 'Test.html');
      this._templateFile('subWidget/nls/_strings.js', this.path + subNamePath + 'nls/strings.js');

      //Jasmine tests
      this._templateFile('subWidget/_specJasmine.ts', this.path + subNamePath + 'tests/spec/' + subName + 'Spec.ts');

      this._templateFile('subWidget/_widget.css', this.path + subNamePath + 'resources/' + subName + '.css');

    } catch (e) {
      this.log(chalk.red(e));
    }
  },

  _templateFile: function (src, dest) {
    //function to update to new method of source and dest
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      this.props
    );
  }

});

module.exports = DojoWidgetGenerator;