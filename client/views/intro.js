Template.Intro.onRendered(function() {

  if (Meteor.user()){
    Meteor.logout();
  }

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

  // press spacebar to continue
  $(window).on('keyup', function (e) {
    $(window).off('keyup');
    if (e.keyCode === 32) {
      Router.go("/targettask");
    }
  });
});