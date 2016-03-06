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
    },

    editGoal: function (id) {
        // We want to make the goal editable
        // We want to have a Save button
        // We want to have a Cancel button
        Goals.update(id,
            {
                $set: { beingEdited: true }
            }
        )
    },

    cancelEditGoal: function (id) {
        // We want to make the goal editable
        // We want to have a Save button
        // We want to have a Cancel button
        Goals.update(id,
            {
                $set: { beingEdited: false }
            }
        )
    },

    saveEditGoal: function (id, goal, goalStartDate, goalDeadline, description) {
        // We want to make the goal editable
        // We want to have a Save button
        // We want to have a Cancel button
        Goals.update(
            id,
            {
                $set: {
                    goal: goal,
                    goalStartDate: goalStartDate,
                    goalEndDate: goalDeadline,
                    description: description,
                    beingEdited: false
                }
            }
        );
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

    Template.goalList.events({

        "click #removeGoal": function (e) {
            e.preventDefault();

            Meteor.call("deleteGoal", this._id);
        },

        "click #editGoal": function (e) {
            e.preventDefault();

            Meteor.call("editGoal", this._id);
        },

        "click #cancelEditGoal": function (e) {
            Meteor.call("cancelEditGoal", this._id);
        },

        "click #saveEditGoal": function (e, template) {
            Meteor.call("saveEditGoal",
                this._id,
                template.find("#goal" + this._id).value,
                template.find("#goalStart" + this._id).value,
                template.find("#goalEnd" + this._id).value,
                template.find("#goalDescription" + this._id).value);
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