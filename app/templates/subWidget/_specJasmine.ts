/// <reference path="../../../../../tsd.d.ts" />
import WidgetUnderTest = require("widgets/<%= path %><%= subWidgetName %>/<%= subWidgetName %>");
import domConstruct = require("dojo/dom-construct");


describe('widgets/<%= path %><%= subWidgetName %>', () => {
    var widget = new WidgetUnderTest();

    beforeEach(() => {
        widget = new WidgetUnderTest({}, domConstruct.create("div", null, document.body));
    });

    afterEach(() => {
        widget.destroy();
    });

    it("should create a <%= subWidgetName %> widget", function () {
        expect(widget).toEqual(jasmine.any(WidgetUnderTest));
    });

});