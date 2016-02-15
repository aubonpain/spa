Goals = new Meteor.Collection('goals');

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
        // Make sure the user is logged in before deleting a goal
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Goals.remove({
            _id: goalId
        });
    }

});

if (Meteor.isClient) {

    Meteor.subscribe('goals');

    Template.goals.helpers({
        goals: function () {
            var data = Goals.find({ owner: Meteor.userId() });
            if (!data) {
                return "Nothing to show here! :(";
            }
            return data;
        }
    });

    Template.goals.events({
        "click #removeGoal": function (e) {
            e.preventDefault();

            Meteor.call("deleteGoal", this._id);
        }
    })
}

if (Meteor.isServer) {

    Meteor.publish('goals', function () {
        return Goals.find({ owner: this.userId });
    });

    Meteor.startup(function () {
        // code to run on server at startup


    });
}

// Templates
/*
 Take portions of html and put it into a template
 */