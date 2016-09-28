/// <reference path="../../../../../tsd.d.ts" />
import WidgetUnderTest = require("widgets/<%= path %><%= subWidgetName %>/<%= subWidgetName %>");
import domConstruct = require("dojo/dom-construct");


describe("widgets/<%= path %><%= subWidgetName %>", () => {
    /* tslint:disable */
    var widget = new WidgetUnderTest();
    /* tslint:enable */

    beforeEach(() => {
        widget = new WidgetUnderTest({}, domConstruct.create("div", null, document.body));
        widget.startup({});
    });

    afterEach(() => {
        widget.destroy();
    });

    it("should create a <%= subWidgetName %> widget", function (): void {
        expect(widget).toEqual(jasmine.any(WidgetUnderTest));
    });

});