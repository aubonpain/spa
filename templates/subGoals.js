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
            createdAt: new Date()
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
            var data = SubGoals.find({});
            if (!data) {
                return "Nothing to show here! :(";
            }
            return data;//return SubGoals.find({});
        },

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
        "submit #subGoalForm": function (e) {
            e.preventDefault();

            console.log(this._id,
                subGoal.value,
                subGoalStart.value,
                subGoalEnd.value,
                subGoalDescription.value);

            Meteor.call("addSubGoal",
                this._id,
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
 TODO: Each subgoal may or may not have deadlines

 TODO: Each subgoal has a COMPLETED checkbox

 TODO: To add a subgoal, the user clicks on an "Add Subgoal" button

 TODO: Clicking on "Add Subgoal" adds a subgoal with the related goal id

 TODO: On clicking COMPLETED, a CELEBRATION ensues (TODO: Define CELEBRATION)

 TODO: Each subgoal has a REMOVE button which removes the subgoal

 */

