/// <reference path="../../../tsd.d.ts" />
/// <amd-dependency path="dojo/text!./templates/<%=subWidgetName%>.html" name="template" />
/// <amd-dependency path="dojo/i18n!widgets/<%=widgetName%>/<%=subWidgetName%>/nls/strings" name="nls" />
declare var template: any;
declare var nls: any;

// dojo
import dojoDeclare = require("dojo/_base/declare");
import lang = require("dojo/_base/lang");

// dijit
import WidgetBase = require("dijit/_WidgetBase");
import TemplatedMixin = require("dijit/_TemplatedMixin");
<% if(widgetsInTemplate) { %>import WidgetsInTemplateMixin = require("dijit/_WidgetsInTemplateMixin");<% }%>

interface I<%=subWidgetName%> {
    constructor(options: any): void;
    startup(args: any): void;
    baseClass: string;
    destroy(): void;
    nls: any;
}

 /* tslint:disable */
var clazz = dojoDeclare<I<%=subWidgetName%>>([WidgetBase, TemplatedMixin<% if(widgetsInTemplate) { %>, WidgetsInTemplateMixin<% }%>], {
 /* tslint:enable */

    // description:
    // <%= description %>

    <% if(widgetsInTemplate) { %>templateString: template,<% }%>
    baseClass: "<%= baseClass %>",
    nls: nls,

    constructor(options: any): void {
        lang.mixin(options);
    },

    startup: function (args: any): void {
        // not allowed in option strict this.inherited(arguments);
        WidgetBase.prototype.startup.call(this, args);

        var self: I<%=subWidgetName%> = this;
        console.log(self.baseClass + "::startup", args);

    },

    destroy: function (args: any): void {
        WidgetBase.prototype.destroy.call(this, args);
    }

});

export = clazz;