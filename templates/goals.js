Goals = new Meteor.Collection('goals');

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