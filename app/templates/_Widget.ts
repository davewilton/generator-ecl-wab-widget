/// <reference path="../../tsd.d.ts" />
/// <amd-dependency path="jimu/BaseWidget" name="BaseWidget" />
declare var BaseWidget: any; //there is no ts definition of BaseWidget yet

//dojo
import dojoDeclare = require("dojo/_base/declare");
import domConstruct = require("dojo/dom-construct");

//local 
import Module = require("./<%= subWidgetName %>/<%= subWidgetName %>");

var clazz = dojoDeclare([BaseWidget], {

    // description:
    // <%= description %>
    baseClass: "<%= baseClass %>",

    postCreate: function() {
       //Not allowed in option strict this.inherited(arguments);
      BaseWidget.prototype.postCreate.call(arguments);
      console.log(this.baseClass + "::postCreate");
    },

    startup: function (args) {
        //Not allowed in option strict this.inherited(arguments);
        BaseWidget.prototype.startup.call(this, args);
        console.log(this.baseClass + "::startup");

        //create an instance of our widget and place on the widget dom
        var widget = new Module({map: this.map, config: this.config}, domConstruct.create('div', null, this.domNode));
        widget.startup();

    }

    //other widget methods: onOpen, onClose, onMinimize, onMaximize, onSignIn, onSignOut, onPositionChange, resize
})

export = clazz;


