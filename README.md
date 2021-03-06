# Depreciated

## This tool has now been depreciated in favour of

[generator-typescript-wab-widget](https://github.com/davewilton/generator-typescript-wab-widget/)

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
# generator-ecl-wab-widget [![Build Status](https://travis-ci.org/davewilton/generator-ecl-wab-widget.svg?branch=master)](https://travis-ci.org/davewilton/generator-ecl-wab-widget)

> [Yeoman](http://yeoman.io) generator to create custom Dojo widgets for [Esri WebApp Builder](https://developers.arcgis.com/web-appbuilder/) applications.

## About

This generator scaffolds out the boilerplate files that are need each time you create a new custom WebApp Builder widget. The structure is designed to remove dependancy on the WAB to enable tests to be easily written and allow rapid development testing within the html test page. It creates

* TypeScript Widgets.
* Pure dojo widget inside the esri WAB BaseWidget.
* Jasmine tests in TypeScript.
* A test page with the dojo widget for development outside of the WAB.


![Screenshot](https://raw.githubusercontent.com/davewilton/generator-ecl-wab-widget/master/docs/images/generator-interface.png)

This generator was adapted from [@steveoh](https://github.com/steveoh)'s [generator-dojo-widget](https://github.com/steveoh/generator-dojo-widget), @tomwaysons [generator-esri-widget](https://raw.githubusercontent.com/tomwayson/generator-esri-widget/) and [Esri/generator-esri-appbuilder-js](http://github.com/Esri/generator-esri-appbuilder-js) 

## Getting Started

### Installation

To install Yeoman from npm (if not already), run:

```bash
$ npm install -g yo
```

To install generator-esri-widget from npm, run:

```bash
$ npm install -g generator-ecl-wab-widget
```

### Running the Generator

Navigate to your application's **widgets** folder and run the following at the command line:

```
$ yo ecl-wab-widget
```

A few opinionated files will be created. If you created a widget called `coordinateReadoutWidget` in the `widgets` folder, the following files will be created for you.

**The WAB Widget** - most of our custom code will not be placed here
```
   create coordinateReadoutWidget\Widget.ts
   create coordinateReadoutWidget\config.json
   create coordinateReadoutWidget\images\icon.png
   create coordinateReadoutWidget\manifest.json
```
**The pure dojo widget** - this is where development of the custom functionality will take place
```
   create coordinateReadoutWidget\coordinateReadout\coordinateReadout.ts
   create coordinateReadoutWidget\coordinateReadout\templates\coordinateReadout.html
   create coordinateReadoutWidget\coordinateReadout\nls\strings.js
```
**The test files** - Includes a Jasmine Spec (TypeScript) for writing tests and a test page for rapid testing during development
```
   create coordinateReadoutWidget\coordinateReadout\tests\tests.css
   create coordinateReadoutWidget\coordinateReadout\tests\coordinateReadoutTest.html
   create coordinateReadoutWidget\coordinateReadout\tests\spec\coordinateReadoutSpec.ts
   create coordinateReadoutWidget\coordinateReadout\resources\coordinateReadout.css
```
The widgets assume that a TypeScript defintion file (tsd.d.ts) is stored within the root of the WAB project (next to the index page). This includes definitions for:

* [Dojo Typings] (https://github.com/dojo/typings)
* [Jasmine Typings] (https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/jasmine)
* [ArcGIS JS API Typings] (https://github.com/DefinitelyTyped/DefinitelyTyped/tree/cc3d223a946f661eff871787edeb0fcb8f0db156/arcgis-js-api)

A sample tsd.d.ts is stored within the docs folder.

### TypeScript dojo widgets

Dojo 1 was not written with TypeScript in mind so there are some caveats to using it. The type of the object literal created by [dojo declare](http://dojotoolkit.org/reference-guide/1.10/dojo/_base/declare.html#dojo-base-declare) is of type any. Therefore using 'this' will not provide intelisense when writing within the widget.
This is overcome by the use of an interface which is used to type this in the first argument of the functions within the object literal:

```TypeScript
startup: function (this: IWidgetInterface, args: any): void {
```


The interface is also exported to other modules using the widget so they too can get intellisense. However, if you want to use the widget using declarative markup (i.e. in a html template) you must only export the widget (export = clazz) and not the interface.

I'm sure there are other ways of approaching this, please let me know if you have another/better way.

## License

MIT
