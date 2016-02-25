//Goals = new Meteor.Collection('goals');

Meteor.methods({

    deleteGoal: function (goalId) {
        // Make sure the user is logged in before deleting a goal
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        SubGoals.remove({
            ownerGoalId: goalId
        });

        Goals.remove({
            _id: goalId
        });
    }

});

if (Meteor.isClient) {

    Meteor.subscribe('goals');

    Template.goalList.helpers({
        goals: function () {
            var data = Goals.find({owner: Meteor.userId()}, {sort: {createdAt: -1}});
            if (!data) {
                return "Nothing to show here! :(";
            }
            return data;
        }
    });

    Template.goals.events({

        "click #addGoal": function (e) {
            e.preventDefault();

            Meteor.call("addGoal",
                this._id,
                goal.value,
                goalStartDate.value,
                goalDeadline.value,
                goalDescription.value,
                measurementNoun.value,
                measurementVerb.value,
                measurementPeriod.value
            );
        },

        "click #removeGoal": function (e) {
            e.preventDefault();

            Meteor.call("deleteGoal", this._id);
        }
    });
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