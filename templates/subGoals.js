SubGoals = new Meteor.Collection('subGoals');

Meteor.methods({

    addSubGoal: function (owner, subGoal, subGoalStartDate, subGoalEndDate, subGoalDescription) {
        SubGoals.insert({
            owner: owner,
            subGoal: subGoal,
            subGoalStartDate: subGoalStartDate,
            subGoalEndDate: subGoalEndDate,
            subGoalDescription: subGoalDescription
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

    updateSubGoal: function (owningGoalId, subGoal, subGoalStartDate, subGoalEndDate, subGoalDescription) {
        SubGoals.update(
            { ownerId: owningGoalId },
            {
                subGoal: subGoal,
                subGoalStartDate: subGoalStartDate,
                subGoalEndDate: subGoalEndDate,
                subGoalDescription: subGoalDescription
            }
        );
    }

});

if (Meteor.isClient) {

    Meteor.subscribe("subGoals");

    Template.subGoals.helpers({
        subGoal: function () {
            return SubGoals.find({
                ownerId: this.userId // TODO: Need to insert main goal id here
            });
        }
    });

    Template.subGoals.events({
        "click #addSubGoal": function (e) {
            e.preventDefault();

            // When this is clicked, we want to insert a blank record into the DB
            // This will automatically display the sub goal fields on the page.
            Meteor.call("addSubGoal",
                        this.userId,
                        "Enter Sub Goal",
                        "",
                        "",
                        "Enter Sub Goal Description"
            );
        },

        "click #updateSubGoal": function (e) {
            e.preventDefault();

            Meteor.call("updateSubGoal",
                        name,
                        subGoal.value,
                        subGoalStartDate.value,
                        subGoalEndDate.value,
                        subGoalDescription.value
            );
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
        Meteor.publish("subGoals", function () {
            return SubGoals.find({
                // ownerId: this._id
            });
        });
    });
}

// Templates
/*
 Take portions of html and put it into a template
 */

/*
 TODO: Each subgoal may or may not have deadlines

 TODO: Each subgoal has a COMPLETED checkbox

 TODO: To add a subgoal, the user clicks on an "Add Subgoal" button

 TODO: Clicking on "Add Subgoal" adds a subgoal with the related goal id

 TODO: On clicking COMPLETED, a CELEBRATION ensues (TODO: Define CELEBRATION)

 TODO: Each subgoal has a REMOVE button which removes the subgoal

 */

