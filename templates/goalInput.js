if (Meteor.isClient) {

    /*Template.goalInput.events({
        "click #addGoal": function (e) {
            e.preventDefault();

            Meteor.call("addGoal", goal.value, goalDeadline.value, goalDescription.value);
        },

        "click #addSubGoal": function (e) {
            e.preventDefault();

            // When this is clicked, we want to insert a blank record into the DB
            // This will automatically display the sub goal fields on the page.
            Meteor.call("addSubGoal",
                this._id,
                "Enter Sub Goal",
                "",
                "",
                "Enter Sub Goal Description"
            );
        }
    });*/
}