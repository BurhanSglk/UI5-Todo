sap.ui.define([
    "sap/m/MultiInput"
], function(MultiInput) {
    var base;
    return MultiInput.extend('SapUI5Tutorial.resources.component.multiInput', {
        metadata: {
            properties: {
                placeText: { type: 'string', defaultValue: "Kullanıcı Ara..." ,  },
            },
            events: {
                liveWord: {
                    parameters: {
                        data: { type: "any" },
                    }
                },
            }
        },
        renderer: {},
        init: function() {
            base = this;
            if (MultiInput.prototype.init) MultiInput.prototype.init.apply(this, arguments);
            base.attachLiveChange(function(oEvent) {
                oModel.setProperty("", {});
                if (base.getValue().length >= 2) {
                    base.fireEvent("liveWord");
                }
            })
        },
        onAfterRendering: function() {
            base = this;
            if (MultiInput.prototype.onAfterRendering) MultiInput.prototype.onAfterRendering.apply(this, arguments);
            base.setPlaceholder(base.getPlaceText());
            
        }
    })

});