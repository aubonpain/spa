if (Meteor.isClient) {

    Template.goalInput.events({
        "click #addGoal": function (e) {
            e.preventDefault();

            Meteor.call("addGoal", goal.value, goalDeadline.value, goalDescription.value);
        },

        "click #addSubGoal": function (e) {
            e.preventDefault();

            Meteor.call("addSubGoalFields");
        }
    });
}