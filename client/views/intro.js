// CONDITION_1 = "WHY_FIRST_HIGH_DIAGNOCITY";
// CONDITION_2 = "WHY_FIRST_LOW_DIAGNOCITY";
// CONDITION_3 = "HOW_FIRST_HIGH_DIAGNOCITY";
// CONDITION_4 = "HOW_FIRST_LOW_DIAGNOCITY";

Template.Consent.onRendered(function() {

  if (Meteor.user()){
    Meteor.logout();
  }

  $('.agree_button').click(function (e) {
      Router.go("/intro1");
    });
  });


Template.Intro1.onRendered(function() {
  // var coin = Math.random();
  // var condition;

  // // Set one of the four choices
  // if (coin < 0.25) {
  //   condition = CONDITION_1;
  //   Helpers.updateResponse({
  //     firstCondition: "why",
  //     secondCondition: "how",
  //     targetDetectionCondition1: "80 cong 20 incong",
  //     targetDetectionCondition2: "80 cong 20 incong"
  //   });
  // } else if (coin < 0.5) {
  //   condition = CONDITION_2;
  //   Helpers.updateResponse({
  //     firstCondition: "why",
  //     secondCondition: "how",
  //     targetDetectionCondition1: "50 cong 50 incong",
  //     targetDetectionCondition2: "50 cong 50 incong"
  //   });
  // } else if (coin < 0.75) {
  //   condition = CONDITION_3;
  //   Helpers.updateResponse({
  //     firstCondition: "how",
  //     secondCondition: "why",
  //     targetDetectionCondition1: "80 cong 20 incong",
  //     targetDetectionCondition2: "80 cong 20 incong"
  //   });
  // } else {
  //   condition = CONDITION_4;
  //   Helpers.updateResponse({
  //     firstCondition: "how",
  //     secondCondition: "why",
  //     targetDetectionCondition1: "50 cong 50 incong",
  //     targetDetectionCondition2: "50 cong 50 incong"
  //   });
  // }

  // Session.set("condition", condition);

  // Login
  Meteor.call("createRandomUser", function (err, userId) {
    if (err) {
      console.log(err);
    } else {
      var user = Meteor.users.findOne(userId);
      Meteor.loginWithPassword(user.username, "1234", function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log("logged in as:", Meteor.user().username);

          Helpers.updateResponse({
            userId: Meteor.userId(),
            username: Meteor.user().username
          });
        }
      });
    }
  });

  $(window).keyup(function (e) {
      if (e.keyCode === 32) {
        $(window).off('keyup');
        Router.go("/intro2");
      }
    });

});

Template.Intro2.onRendered(function() {

  $(window).on('keyup', function (e) {
    $(window).off('keyup');
        if (e.keyCode === 68 || e.keyCode === 75) {
          Router.go("/targettask");
        }
      });
});