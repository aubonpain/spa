Users = new Meteor.Collection('users');

if (Meteor.isClient) {
    Template.users.helpers({
        user: function () {
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