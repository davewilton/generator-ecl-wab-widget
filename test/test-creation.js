/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('generator-ecl-wab-widget', function () {

  var expectedFiles;

  before(function () {
    expectedFiles = [
      //the main widget
      'myTestWidget/Widget.ts',
      'myTestWidget/manifest.json',
      'myTestWidget/config.json',
      'myTestWidget/images/icon.png',
      
      // add files you expect to exist here.
      'myTestWidget/myTest/myTest.ts',
      'myTestWidget/myTest/nls/strings.js',
      'myTestWidget/myTest/templates/myTest.html',
      'myTestWidget/myTest/tests/tests.css',
      'myTestWidget/myTest/tests/myTestTest.html',
      'myTestWidget/myTest/tests/spec/myTestSpec.ts',
      'myTestWidget/myTest/resources/myTest.css'
    ];
  });

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('ecl-wab-widget:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files and defaults to no map', function (done) {

    helpers.mockPrompt(this.app, {
      'widgetName': 'myTestWidget',
      'description': 'test description',
      'widgetsInTemplate': true
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expectedFiles);
      // by default, don't include a map in the test page
      helpers.assertNoFileContent('myTestWidget/myTest/tests/myTestTest.html', /map\W?=/);
      done();
    });
  });

  it('creates an empty map with new Map()', function (done) {

    helpers.mockPrompt(this.app, {
      'widgetName': 'myTestWidget',
      'description': 'test description',
      'widgetsInTemplate': true,
      'testPageMap': 'Empty map - i.e. new Map()'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expectedFiles);
      // create empty map in the test page
      helpers.assertFileContent('myTestWidget/myTest/tests/myTestTest.html', /map\W?=\W?new Map\(/);
      done();
    });
  });

  it('creates a map from a web map', function (done) {

    helpers.mockPrompt(this.app, {
      'widgetName': 'myTestWidget',
      'description': 'test description',
      'widgetsInTemplate': true,
      'testPageMap': 'Web map - i.e. arcgisUtils.createMap()'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expectedFiles);
      // create empty map in the test page
      helpers.assertFileContent('myTestWidget/myTest/tests/myTestTest.html', /map\W?=\W?response\.map;/);
      done();
    });
  });



});
