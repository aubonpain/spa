MeasurementDefinition = new Meteor.Collection('measurementDefinition');

Meteor.methods({

    addMeasurementDefinition: function (ownerGoalId, measurementNoun, measurementVerb, measurementPeriod) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        MeasurementDefinition.insert({
            ownerGoalId: ownerGoalId,
            userOwnerId: Meteor.userId(),
            measurementNoun: measurementNoun,
            measurementVerb: measurementVerb,
            measurementPeriod: measurementPeriod,
            createdAt: new Date(),
            beingEdited: false
        });
    },

    editMeasurementDefinition: function (id) {
        MeasurementDefinition.update(id,
            {
                $set: { beingEdited: true }
            }
        )
    },

    cancelMeasurementDefinition: function (id) {
        MeasurementDefinition.update(id,
            {
                $set: { beingEdited: false }
            }
        )
    },

    saveEditMeasurementDefinition: function (id, measurementNoun, measurementVerb, measurementPeriod) {
        MeasurementDefinition.update(
            id,
            {
                $set: {
                    measurementNoun: measurementNoun,
                    measurementVerb: measurementVerb,
                    measurementPeriod: measurementPeriod,
                    createdAt: new Date(),
                    beingEdited: false
                }
            }
        );
    }
});

if (Meteor.isClient) {

    Meteor.subscribe('measurementDefinition');

    Template.measurementDefinitionAdd.helpers({
        measurementDefinition: function (id) {
            var data = MeasurementDefinition.find({
                ownerGoalId: id
            });
            if (!data) {
                return "No measurement data!";
            }
            return data;
        },

        measurementDefinitionExists: function (id) {
            return MeasurementDefinition.find({ownerGoalId: id}).count() > 0;
        }
    });

    Template.measurementDefinitionAdd.events({

        "click #addMeasurementDefinition": function (e, template) {
            e.preventDefault();

            Meteor.call("addMeasurementDefinition",
                this._id,
                template.find("#measurementNoun").value,
                template.find("#measurementVerb").value,
                template.find("#measurementPeriod").value
            );
        },

        "click #editMeasurementDefinition": function (e) {
            e.preventDefault();

            Meteor.call("editMeasurementDefinition", this._id);
        },

        "click #cancelEditMeasurementDefinition": function (e) {
            Meteor.call("cancelMeasurementDefinition", this._id);
        },

        "click #saveEditMeasurementDefinition": function (e, template) {
            Meteor.call("saveEditMeasurementDefinition",
                this._id,
                template.find("#measurementNoun" + this._id).value,
                template.find("#measurementVerb" + this._id).value,
                template.find("#measurementPeriod" + this._id).value
            );
        }
    });
}

if (Meteor.isServer) {

    Meteor.startup(function () {
        // code to run on server at startup
        Meteor.publish("measurementDefinition", function () {
            return MeasurementDefinition.find({
                userOwnerId: this.userId
            });
        });
    });
}


// Templates
/*
 Take portions of html and put it into a template
 */