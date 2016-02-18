SubGoals = new Meteor.Collection('subGoals');

Meteor.methods({

    addSubGoal: function (userOwner, ownerGoalId, subGoal, subGoalStartDate, subGoalEndDate, subGoalDescription) {
        SubGoals.insert({
            userOwner: userOwner,
            ownerGoalId: ownerGoalId,
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

            });
        }
    });

    Template.subGoals.events({
        // Might not need "addNewSubGoal" implementation
        "click #addNewSubGoal": function (e) {
            e.preventDefault();

            // document.getElementById("subGoalsInputForm").setAttribute("class", "");
        },

        "click #addSubGoal": function (e) {
            e.preventDefault();

            Meteor.call("addSubGoal",
                userOwnerId.value,
                ownerGoalId.value,
                subGoal.value,
                subGoalStart.value,
                subGoalEnd.value,
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
                ownerGoalId: this._id
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

