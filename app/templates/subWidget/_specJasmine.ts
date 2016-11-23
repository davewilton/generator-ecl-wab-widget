/// <reference path="../../../../../tsd.d.ts" />
/// <amd-dependency path="dojo/text!widgets/<%= path %>config.json" name="ConfigJson" />
var ConfigJson: any;
import WidgetUnderTest = require("widgets/<%= path %><%= subWidgetName %>/<%= subWidgetName %>");
import domConstruct = require("dojo/dom-construct");


describe("widgets/<%= path %><%= subWidgetName %>", () => {
    /* tslint:disable */
    var widget: WidgetUnderTest.I<%= subWidgetName %>;
    /* tslint:enable */

    beforeEach(() => {
        // create a sample config
        var config = JSON.parse(ConfigJson);

        widget = new WidgetUnderTest.<%= subWidgetName %>({config: config}, domConstruct.create("div", null, document.body));
        widget.startup({});
    });

    afterEach(() => {
        widget.destroy();
    });

    it("should create a <%= subWidgetName %> widget", function (): void {
        expect(widget).toEqual(jasmine.any(WidgetUnderTest.<%= subWidgetName %>));
    });

});