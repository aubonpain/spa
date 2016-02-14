Meteor.methods({

    addGoal: function (goal, goalDeadline, goalDescription) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Goals.insert({
            owner: Meteor.userId(),
            ownerName: Meteor.user().username,
            goal: goal,
            goalDeadline: goalDeadline,
            description: goalDescription
        });
    },

    deleteGoal: function (goalId) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Goals.remove({
            _id: goalId
        });
    }

});

if (Meteor.isClient) {
    Template.goalInput.helpers({
    });

    Template.goalInput.events({
        "click #addGoal": function (e) {
            e.preventDefault();

            Meteor.call("addGoal", goal.value, goalDeadline.value, goalDescription.value);
        }
    });
}