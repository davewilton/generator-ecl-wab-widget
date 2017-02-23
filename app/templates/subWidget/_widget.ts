/// <amd-dependency path="dojo/text!./templates/<%=subWidgetName%>.html" name="template" />
/// <amd-dependency path="dojo/i18n!widgets/<%=widgetName%>/<%=subWidgetName%>/nls/strings" name="nls" />
/// <amd-dependency path="xstyle/css!./resources/<%= subWidgetName %>.css" name="style" />
declare var template: any;
declare var nls: any;
declare var style: any;

// dojo
import dojoDeclare = require("dojo/_base/declare");
import lang = require("dojo/_base/lang");

// dijit
import WidgetBase = require("dijit/_WidgetBase");
import TemplatedMixin = require("dijit/_TemplatedMixin");
<% if(widgetsInTemplate) { %>import WidgetsInTemplateMixin = require("dijit/_WidgetsInTemplateMixin");<% }%>

// esri
import Map = require("esri/map");

// local
import IConfig = require("./IConfig<%= subWidgetName %>");

interface I<%=subWidgetName%> {
    // methods
    constructor(options: any): void;
    startup(args: any): void;
    destroy(args: any): void;
    // properties
    config: IConfig;
    baseClass: string;
    nls: any;
	templateString: string;
}

 /* tslint:disable */
var clazz = dojoDeclare<I<%=subWidgetName%>>([WidgetBase, TemplatedMixin<% if(widgetsInTemplate) { %>, WidgetsInTemplateMixin<% }%>], {
 /* tslint:enable */

    // description:
    // <%= description %>

    <% if(widgetsInTemplate) { %>templateString: template,<% }%>
    baseClass: "<%= baseClass %>",
    nls: nls,
	config: null,

    constructor(options: any): void {
        lang.mixin(options);
    },

    startup: function (args: any): void {
        // not allowed in option strict this.inherited(arguments);
        WidgetBase.prototype.startup.call(this, args);

        var self: I<%=subWidgetName%> = this;
        console.log(self.baseClass + "::startup", args);

        // test the config file interface
        console.log(self.config.serviceUrl);
    },

    destroy: function (args: any): void {
        WidgetBase.prototype.destroy.call(this, args);
    }

});

export {clazz as <%=subWidgetName%>};
export {I<%=subWidgetName%> as I<%=subWidgetName%>};