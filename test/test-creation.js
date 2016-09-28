
'use strict';
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

var testPath = path.join(__dirname, 'temp');

var expectedFiles = [
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

describe('default run', function () {

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(testPath)
      .withPrompts({
        'widgetName': 'myTestWidget',
        'description': 'test description',
        'widgetsInTemplate': true
      })
      .on('end', done);
  });

  it('creares all the expected files', function () {
    assert.file(expectedFiles);
  });

  it('creates a ts file without WidgetsInTemplateMixin', function () {
    assert.fileContent(path.join(testPath, 'myTestWidget/myTest/myTest.ts'), /WidgetsInTemplateMixin/);
  });
});

describe('no map', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(testPath)
      .withPrompts({
        'widgetName': 'myTestWidget',
        'description': 'test description',
        'widgetsInTemplate': true,
        testPageMap: 'No map'
      })
      .on('end', done);
  });

  it('creares all the expected files', function () {
    assert.file(expectedFiles);
  });


  it('creates a template file has no map', function () {
    assert.noFileContent(path.join(testPath, 'myTestWidget/myTest/tests/myTestTest.html'), /map\W?=/);
  });
});

describe('new Map()', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(testPath)
      .withPrompts({
        'widgetName': 'myTestWidget',
        'description': 'test description',
        'widgetsInTemplate': true,
        testPageMap: 'Empty map - i.e. new Map()'
      })
      .on('end', done);
  });

  it('creares all the expected files', function () {
    assert.file(expectedFiles);
  });


  it('creates a template file with new Map()', function () {
    assert.fileContent(path.join(testPath, 'myTestWidget/myTest/tests/myTestTest.html'), /map\W?=\W?new Map\(/);
  });
});

describe('arcgisUtils.createMap()', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(testPath)
      .withPrompts({
        'widgetName': 'myTestWidget',
        'description': 'test description',
        'widgetsInTemplate': true,
        testPageMap: 'Web map - i.e. arcgisUtils.createMap()'
      })
      .on('end', done);
  });

  it('creares all the expected files', function () {
    assert.file(expectedFiles);
  });

  it('creates a template file with arcgisUtils.createMap()', function () {
    assert.fileContent(path.join(testPath, 'myTestWidget/myTest/tests/myTestTest.html'), /map\W?=\W?response\.map;/);
  });
});


describe('No Widgets in template', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(testPath)
      .withPrompts({
        'widgetName': 'myTestWidget',
        'description': 'test description',
        'widgetsInTemplate': false,
        testPageMap: 'Web map - i.e. arcgisUtils.createMap()'
      })
      .on('end', done);
  });

  it('creates all the expected files', function () {
    assert.file(expectedFiles);
  });

  it('creates a ts file without WidgetsInTemplateMixin', function () {
    assert.noFileContent(path.join(testPath, 'myTestWidget/myTest/myTest.ts'), /WidgetsInTemplateMixin/);
  });

});

describe('Widget name with spaces', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(testPath)
      .withPrompts({
        'widgetName': ' myTestWidget ',
        'description': 'test description',
        'widgetsInTemplate': true,
        testPageMap: 'Web map - i.e. arcgisUtils.createMap()'
      })
      .on('end', done);
  });

  it('creates all the expected files', function () {
    assert.file(expectedFiles);
  });

});

describe('Widget name must end in Widget', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(testPath)
      .withPrompts({
        'widgetName': ' myTest ',
        'description': 'test description',
        'widgetsInTemplate': true,
        testPageMap: 'Web map - i.e. arcgisUtils.createMap()'
      })
      .on('end', done);
  });

  it('creates all the expected files', function () {
    assert.file(expectedFiles);
  });
  
});

