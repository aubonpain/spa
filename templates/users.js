Users = new Meteor.Collection('users');

if (Meteor.isClient) {
    Template.users.helpers({
        user: function () {
            return Users.findOne()
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