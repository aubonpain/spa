Goals = new Meteor.Collection('goals');

Meteor.methods({

    addGoal: function (goal, goalStartDate, goalDeadline, goalDescription) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Goals.insert({
            owner: Meteor.userId(),
            ownerName: Meteor.user().username,
            goal: goal,
            goalStartDate: goalStartDate,
            goalDeadline: goalDeadline,
            description: goalDescription
        });
    },

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

    Template.goals.helpers({
        goals: function () {
            var data = Goals.find({owner: Meteor.userId()});
            if (!data) {
                return "Nothing to show here! :(";
            }
            return data;
        }
    });

    Template.goals.events({

        "click #addGoal": function (e) {
            e.preventDefault();

            Meteor.call("addGoal", goal.value, goalStartDate.value, goalDeadline.value, goalDescription.value);

            // Clear the form
            e.target.text.value = "";
        },

        "click #removeGoal": function (e) {
            e.preventDefault();

            Meteor.call("deleteGoal", this._id);
        }

        /*"click #addSubGoal": function (e) {
         e.preventDefault();

         // When this is clicked, we want to insert a blank record into the DB
         // This will automatically display the sub goal fields on the page.
         Meteor.call("addSubGoal",
         this._id,
         "Enter Sub Goal",
         "",
         "",
         "Enter Sub Goal Description"
         );
         }*/
    });

    //if (Meteor.isClient) {


    /*Template.goals.events({
     "click #removeGoal": function (e) {
     e.preventDefault();

     Meteor.call("deleteGoal", this._id);
     }
     })*/

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