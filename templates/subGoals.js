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

 

 */

