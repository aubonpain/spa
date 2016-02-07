Goals = new Meteor.Collection('goals');

if (Meteor.isClient) {
    Template.goals.helpers({
        goals: function () {
            return Goals.find();
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