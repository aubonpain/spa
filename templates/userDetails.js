if (Meteor.isClient) {
    Template.userDetails.helpers({
        user: function () {
            return {
                goals: "wakawef123",
                subgoals: "wakawef123 - sub"
            };
        }
    });

    Template.userHistory.helpers({

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