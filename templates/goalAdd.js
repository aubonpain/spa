Goals = new Meteor.Collection('goals');

Meteor.methods({

    addGoal: function (id, goal, goalStartDate, goalDeadline, goalDescription) {
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
            description: goalDescription,
            createdAt: new Date(),
            beingEdited: false
        });
    }

});

if (Meteor.isClient) {

    Meteor.subscribe('goals');

    Template.goalAdd.events({

        "click #addGoal": function (e, template) {
            e.preventDefault();

            Meteor.call("addGoal",
                this._id,
                template.find("#goal").value,
                template.find("#goalStartDate").value,
                template.find("#goalDeadline").value,
                template.find("#goalDescription").value
            );
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