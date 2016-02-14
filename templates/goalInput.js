if (Meteor.isClient) {
    Template.goalInput.helpers({
    });

    Template.goalInput.events({
        "click #addGoal": function (e) {
            e.preventDefault();

            Goals.insert({
                owner: Meteor.userId(),
                ownerName: Meteor.user().username,
                goal: goalText.value,
                description: goalDescriptionText.value
            });
        }
    });
}