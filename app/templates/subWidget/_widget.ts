/// <reference path="../../../tsd.d.ts" />
/// <amd-dependency path="dojo/text!./templates/<%=subWidgetName%>.html" name="template" />
/// <amd-dependency path="dojo/i18n!widgets/<%=widgetName%>/<%=subWidgetName%>/nls/strings" name="nls" />
declare var template: any;
declare var nls: any;

//dojo
import dojoDeclare = require("dojo/_base/declare");
import lang = require("dojo/_base/lang");

//dijit
import WidgetBase = require("dijit/_WidgetBase");
import TemplatedMixin = require("dijit/_TemplatedMixin"); 
<% if(widgetsInTemplate) { %>import WidgetsInTemplateMixin = require("dijit/_WidgetsInTemplateMixin"); <% }%>

interface I<%=subWidgetName%> {
    constructor(options: any);
    startup();
    baseClass: string;
    destroy();
    nls: any;
}

var clazz = dojoDeclare<I<%=subWidgetName%>>([WidgetBase, TemplatedMixin<% if(widgetsInTemplate) { %>, WidgetsInTemplateMixin<% }%>], {

    // description:
    // <%= description %>
	
    <% if(widgetsInTemplate) { %>templateString: template,<% }%>
    baseClass: '<%= baseClass %>',
    nls: nls,

    constructor(options: any) {
        lang.mixin(options);
    },

    startup: function (args) {
        //Not allowed in option strict this.inherited(arguments);
        WidgetBase.prototype.startup.call(this, args);

        var self: I<%=subWidgetName%> = this;
        console.log(self.baseClass + '::startup', args);

    },

    destroy: function (args) {
        WidgetBase.prototype.destroy.call(this, args);
    }

})

export = clazz;