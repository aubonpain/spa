if (Meteor.isClient) {
    Template.goalInput.helpers({
    });

    Template.goalInput.events({
        "click #addGoal": function (e) {
            e.preventDefault();

            Goals.insert({
                relatedUser: this._id,
                goal: goalText.value,
                description: goalDescriptionText.value
            });
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