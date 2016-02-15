SubGoals = new Meteor.Collection('subGoals');

/*
 TODO: Each subgoal may or may not have deadlines

 TODO: Each subgoal has a COMPLETED checkbox

 TODO: To add a subgoal, the user clicks on an "Add Subgoal" button

 TODO: Clicking on "Add Subgoal" adds a subgoal with the related goal id

 TODO: On clicking COMPLETED, a CELEBRATION ensues (TODO: Define CELEBRATION)

 TODO: Each subgoal has a REMOVE button which removes the subgoal

 */

var addSubGoalFields = function () {
    // Create the subgoal text, deadline, and description elements
    var subGoalInput = document.createElement("input");
    var subGoalStartInput = document.createElement("input");
    var subGoalEndInput = document.createElement("input");
    var subGoalDescriptionInput = document.createElement("input");
    var removeSubGoal = document.createElement("button");
    var addThisSubGoal = document.createElement("button");

    // For the subgoal fields, we need to add the id
    subGoalInput.setAttribute("id", "subGoal_" + this._id);
    subGoalStartInput.setAttribute("id", "subGoalStart_" + this._id);
    subGoalEndInput.setAttribute("id", "subGoalEnd_" + this._id);
    subGoalDescriptionInput.setAttribute("id", "subGoalDescription_" + this._id);
    removeSubGoal.setAttribute("id", "remove_" + this._id);
    addThisSubGoal.setAttribute("id", "add_" + this._id);

    // On clicking addThisSubGoal, we need to
};

Meteor.methods({

    addSubGoal: function (goalId, subGoal, subGoalDeadline, subGoalDescription) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        SubGoals.insert({
            owner: goalId,
            subGoal: subGoal,
            subGoalDeadline: subGoalDeadline,
            subGoalDescription: subGoalDescription
        });
    },

    deleteAubGoal: function (subGoalId) {
        // Make sure the user is logged in before deleting a sub-goal
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        SubGoals.remove({
            _id: subGoalId
        });
    }

});

if (Meteor.isClient) {
    Template.subGoals.helpers({
        subGoal: function () {
            return {
                goals: "wakawef123",
                subGoals: "wakawef123 - suweb"
            };
        }
    });

    Template.subGoals.events({
        "click #addSubGoal": function (e) {
            e.preventDefault();

            // When this is clicked, we want to insert a field into the html
            Meteor.call("addGoal", goal.value, goalDeadline.value, goalDescription.value);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}

// Templates
/*
    Take portions of html and put it into a template
 */