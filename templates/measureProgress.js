MeasureProgress = new Meteor.Collection('measureProgress');

Meteor.methods({

    addMeasureProgressData: function (ownerGoalId, unitOfMeasurement, unitsCompleted, targetGoalUnits) {
        MeasureProgress.insert({
            userOwnerId: Meteor.userId(),
            ownerGoalId: ownerGoalId,
            measureGoalPeriod: unitOfMeasurement,
            unitsCompleted: unitsCompleted,
            targetGoalUnits: targetGoalUnits,
            beingEdited: false
        });
    },

    deleteMeasureProgressData: function (goalId) {
        // Make sure the user is logged in before deleting a sub-goal
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        MeasureProgress.remove({
            _id: goalId
        });
    },

    editMeasureProgress: function (id) {
        MeasureProgress.update(id,
            {
                $set: { beingEdited: true }
            }
        )
    },

    cancelEditMeasureProgress: function (id) {
        // We want to make the measureProgress editable
        // We want to have a Save button
        // We want to have a Cancel button
        MeasureProgress.update(id,
            {
                $set: { beingEdited: false }
            }
        )
    },

    saveEditMeasureProgress: function (id, unitOfMeasurement, unitsCompleted, targetGoalUnits) {
        // We want to make the measureProgress editable
        // We want to have a Save button
        // We want to have a Cancel button
        MeasureProgress.update(
            id,
            {
                $set: {
                    unitOfMeasurement: unitOfMeasurement,
                    unitsCompleted: unitsCompleted,
                    targetGoalUnits: targetGoalUnits,
                    beingEdited: false
                }
            }
        );
    }

});

if (Meteor.isClient) {

    Meteor.subscribe("MeasureProgress");

    Template.measureProgress.helpers({
        isOwner: function (id) {
            var data = MeasureProgress.find({
                ownerGoalId: id
            });
            if (!data) {
                return "Nothing to show here! :(";
            }
            return data;
        }
    });

    Template.measureProgress.events({
        "submit #measureProgressForm": function (e, template) {
            e.preventDefault();

            Meteor.call("addMeasureProgressData",
                this._id,
                template.find("#measureGoalNoun" + this._id).value,
                template.find("#measureGoalVerb" + this._id).value
            );
        },

        "click #removemeasureProgress": function (e) {
            e.preventDefault();

            Meteor.call("deleteMeasureProgressData", this._id);
        },

        "click #editmeasureProgress": function (e) {
            e.preventDefault();

            Meteor.call("editMeasureProgress", this._id);
        },

        "click #cancelEditmeasureProgress": function (e) {
            Meteor.call("cancelEditMeasureProgress", this._id);
        },

        "click #saveEditmeasureProgress": function (e, template) {
            Meteor.call("saveEditMeasureProgress",
                this._id,
                template.find("#measureProgress" + this._id).value,
                template.find("#MeasureProgresstart" + this._id).value,
                template.find("#measureProgressEnd" + this._id).value,
                template.find("#measureProgressDescription" + this._id).value);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
        Meteor.publish("MeasureProgress", function () {
            return MeasureProgress.find({
                userOwnerId: this.userId
            });
        });
    });
}

// Templates
/*
 Take portions of html and put it into a template
 */

/*
 DONE: Each measureProgress may or may not have deadlines

 TODO: Each measureProgress has a COMPLETED checkbox

 DONE: To add a measureProgress, the user clicks on an "Add measureProgress" button

 DONE: Clicking on "Add measureProgress" adds a measureProgress with the related goal id

 TODO: On clicking COMPLETED, a CELEBRATION ensues (TODO: Define CELEBRATION)

 DONE: Each measureProgress has a REMOVE button which removes the measureProgress

 TODO: MeasureProgress can be edited

 TODO: MeasureProgress have an edit button

 TODO: On clicking Edit, the measureProgress shows up as inputs that the user can then edit

 TODO: On clicking Edit, a Save button also shows up with which the user saves changes

 // Other framework stuff

 TODO: Add divs for goals, MeasureProgress, and measurements

 */

