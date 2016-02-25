SubGoals = new Meteor.Collection('subGoals');

Meteor.methods({

    addSubGoal: function (ownerGoalId, subGoal, subGoalStartDate, subGoalEndDate, subGoalDescription) {
        SubGoals.insert({
            userOwnerId: Meteor.userId(),
            ownerGoalId: ownerGoalId,
            subGoal: subGoal,
            subGoalStartDate: subGoalStartDate,
            subGoalEndDate: subGoalEndDate,
            subGoalDescription: subGoalDescription,
            createdAt: new Date(),
            beingEdited: false
        });
    },

    deleteSubGoal: function (subGoalId) {
        // Make sure the user is logged in before deleting a sub-goal
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        SubGoals.remove({
            _id: subGoalId
        });
    },

    editSubGoal: function (id) {
        // We want to make the subgoal editable
        // We want to have a Save button
        // We want to have a Cancel button
        SubGoals.update(id,
            {
                $set: { beingEdited: true }
            }
        )
    },

    cancelEditSubGoal: function (id) {
        // We want to make the subgoal editable
        // We want to have a Save button
        // We want to have a Cancel button
        SubGoals.update(id,
            {
                $set: { beingEdited: false }
            }
        )
    },

    saveEditSubGoal: function (id, subGoal, subGoalStartDate, subGoalEndDate, subGoalDescription) {
        // We want to make the subgoal editable
        // We want to have a Save button
        // We want to have a Cancel button
        SubGoals.update(
            id,
            {
                $set: {
                    subGoal: subGoal,
                    subGoalStartDate: subGoalStartDate,
                    subGoalEndDate: subGoalEndDate,
                    subGoalDescription: subGoalDescription,
                    beingEdited: false
                }
            }
        );
    }

});

if (Meteor.isClient) {

    Meteor.subscribe("subGoals");

    Template.subGoals.helpers({
        isOwner: function (id) {
            var data = SubGoals.find({
                ownerGoalId: id
            });
            if (!data) {
                return "Nothing to show here! :(";
            }
            return data;
        }
    });

    Template.subGoals.events({
        "submit #subGoalForm": function (e, template) {
            e.preventDefault();

            Meteor.call("addSubGoal",
                this._id,
                template.find("#subGoal").value,
                template.find("#subGoalStart").value,
                template.find("#subGoalEnd").value,
                template.find("#subGoalDescription").value
            );
        },

        "click #removeSubGoal": function (e) {
            e.preventDefault();

            Meteor.call("deleteSubGoal", this._id);
        },

        "click #editSubGoal": function (e) {
            e.preventDefault();

            Meteor.call("editSubGoal", this._id);
        },

        "click #cancelEditSubGoal": function (e) {
            Meteor.call("cancelEditSubGoal", this._id);
        },

        "click #saveEditSubGoal": function (e, template) {
            Meteor.call("saveEditSubGoal",
                this._id,
                template.find("#subGoal" + this._id).value,
                template.find("#subGoalStart" + this._id).value,
                template.find("#subGoalEnd" + this._id).value,
                template.find("#subGoalDescription" + this._id).value);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
        Meteor.publish("subGoals", function () {
            return SubGoals.find({
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
 DONE: Each subgoal may or may not have deadlines

 TODO: Each subgoal has a COMPLETED checkbox

 DONE: To add a subgoal, the user clicks on an "Add Subgoal" button

 DONE: Clicking on "Add Subgoal" adds a subgoal with the related goal id

 TODO: On clicking COMPLETED, a CELEBRATION ensues (TODO: Define CELEBRATION)

 DONE: Each subgoal has a REMOVE button which removes the subgoal

 TODO: Subgoals can be edited

 TODO: Subgoals have an edit button

 TODO: On clicking Edit, the subgoal shows up as inputs that the user can then edit

 TODO: On clicking Edit, a Save button also shows up with which the user saves changes

 // Other framework stuff

 TODO: Add divs for goals, subgoals, and measurements

 */

