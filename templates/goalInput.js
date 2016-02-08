if (Meteor.isClient) {
    Template.goalInput.helpers({
    });

    Template.goalInput.events({
        "click #addGoal": function (e) {
            e.preventDefault();

            Goals.insert({
                relatedUser: "123123",
                goal: goalText.value,
                description: goalDescriptionText.value
            });
        }
    });
}