SubGoals = new Meteor.Collection('subGoals');


if (Meteor.isClient) {
    Template.subGoals.helpers({
        subGoal: function () {
            return {
                goals: "wakawef123",
                subGoals: "wakawef123 - suweb"
            };
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