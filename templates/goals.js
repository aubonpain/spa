Goals = new Meteor.Collection('goals');

if (Meteor.isClient) {
    Template.goals.helpers({
        goals: function () {
            return [
                {
                    goal: "goal1",
                    subGoals: [
                        {subGoal: "subGoal1_1"},
                        {subGoal: "subGoal1_2"}
                    ]
                },
                {
                    goal: "goal2",
                    subGoals: [
                        {subGoal: "subGoal2_1"},
                        {subGoal: "subGoal2_2"}
                    ]
                },
                {
                    goal: "goal3",
                    subGoals: [
                        {subGoal: "subGoal3_1"},
                        {subGoal: "subGoal3_2"}
                    ]
                }
            ];
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