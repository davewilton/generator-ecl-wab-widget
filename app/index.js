'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var dasherize = require('underscore.string/dasherize');
var updateNotifier = require('update-notifier');
var pkg = require('../package.json');

var DojoWidgetGenerator = yeoman.generators.Base.extend({
  askFor: function () {
    var done = this.async();

    var testPageMapChoices = ['No map', 'Empty map - i.e. new Map()', 'Web map - i.e. arcgisUtils.createMap()'];

    // have Yeoman greet the user
    console.log(this.yeoman);

    //check fot updates
    var notifier = updateNotifier({pkg: pkg});
    notifier.notify();
    if(notifier.update){
      console.log(chalk.red('Update available: ${notifier.update.latest}'));
      console.log(notifier.update);
    }

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('Welcome to the ecl-wab-widget generator.'));
    console.log(chalk.green('It is best to run this generator within the "Widgets" folder of a WAB application'));

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
        'default': 0
      }, {
        type: 'checkbox',
        message: 'Which features would you like to include?',
        name: 'features',
        choices: [
          {
            value: 'inPanel',
            name: 'Run inside a panel'
          },
          {
            value: 'hasConfig',
            name: 'Config (JSON) file'
          }
        ],
        'default': ['inPanel', 'hasLocale', 'hasConfig']
      }];

    this.prompt(prompts, function (props) {
      this.widgetName = props.widgetName;
      this.subWidgetName = this.widgetName.replace('Widget', '');
      this.description = props.description;
      this.path = props.widgetName + '/';
      this.widgetsInTemplate = props.widgetsInTemplate;
      this.testPageMap = testPageMapChoices.indexOf(props.testPageMap);

      this.baseClass = dasherize(this.widgetName).replace(/^-/, '');
      

      //TODO
      this.widgetTitle = this.widgetName;

      //widget choices
      this.inPanel = props.features.indexOf('inPanel') > -1;
      this.hasConfig = props.features.indexOf('hasConfig') > -1;
      this.hasLocale = false; // Our sub widget will contain the nls
      this.hasStyle = false; // Our sub widget will contain the style
      this.hasUIFile = false; // Our sub widget will contain the UI

      //settings choices
       // settings
      this.hasSettingPage = props.hasSettingPage;;
      this.hasSettingUIFile = this.hasSettingPage ? (props.settingsFeatures.indexOf('hasSettingUIFile') > -1) : false;
      this.hasSettingLocale = this.hasSettingPage ? (props.settingsFeatures.indexOf('hasSettingLocale') > -1) : false;
      this.hasSettingStyle = this.hasSettingPage ? (props.settingsFeatures.indexOf('hasSettingStyle') > -1) : false;
      this.needsManifestProps = (!this.inPanel || !this.hasLocale);

      this.consoleLog = this.path + this.widgetName;
      this.consoleLog = this.consoleLog.replace(/\//g, '.');
      var splitPath = this.path.split('/');
      this.packageName = splitPath[0];
      this.testPageBaseUrl = '';
      for (var x = 0; x < splitPath.length; x++) {
        this.testPageBaseUrl += '../';
      }
      done();
    }.bind(this));
  },

  app: function () {


    //create the main widget
    this.template('_Widget.ts', this.path + 'Widget.ts');
    if (this.hasUIFile) {
      this.template('_Widget.html', this.path + 'Widget.html');
    }
    if (this.hasConfig) {
      this.template('_config.json', this.path + 'config.json');
    }
    if (this.hasStyle) {
      this.template('css/_style.css', this.path + 'css/style.css');
    }

    this.copy('images/icon.png', this.path + 'images/icon.png');
    this.template('_manifest.json', this.path + 'manifest.json');


    //get the name of the widget to create our sub widget
    var subNamePath = '/' + this.subWidgetName + '/';
    var subName = this.subWidgetName;

    //create the sub widget
    this.copy('subWidget/tests.css', this.path + subNamePath + 'tests/tests.css');
    this.template('subWidget/_widget.ts', this.path + subNamePath + subName + '.ts');
    this.template('subWidget/_template.html', this.path + subNamePath + 'templates/' + subName + '.html');
    this.template('subWidget/_test_page.html', this.path + subNamePath + 'tests/' + subName + 'Test.html');
    this.template('subWidget/nls/_strings.js', this.path + subNamePath + 'nls/strings.js');

    //Jasmine tests
    this.template('subWidget/_specJasmine.ts', this.path + subNamePath + 'tests/spec/' + subName + 'Spec.ts');

    this.template('subWidget/_widget.css', this.path + subNamePath + 'resources/' + subName + '.css');
  },

  projectfiles: function () {

  }
});

module.exports = DojoWidgetGenerator;