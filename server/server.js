if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
        if (Users.find().count() === 0) {
            Users.insert({
                name: {
                    first: "crazyFoo",
                    last: "crazyBar"
                }
            });
        }

        if (Goals.find().count() === 0) {
            Goals.insert({
                relatedUser: 456,
                goal: "GOAL: Finish this awesome website!",
                description: "GOAL_DESC: Keep working at it until it's done!"
            });
        }

        if (SubGoals.find().count() === 0) {
            SubGoals.insert({
                relatedGoal: 123,
                subGoal: "SUBGOAL: Some crazy subGoal!",
                description: "SUBGOAL_DESCKeep working at the crazy SUBGOAL until it's done!"
            });
        }
    });
}

// Templates
/*
    Take portions of html and put it into a template
 */