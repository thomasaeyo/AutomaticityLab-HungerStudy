Template.Debriefing1.onRendered(function() {
  var TargetTaskResults = Session.get("currentTargetTaskResults");

  Helpers.updateResponse({
    TargetTaskResults: TargetTaskResults
  });

  if (!Meteor.user()){
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
    } else {
      Helpers.updateResponse({
        userId: Meteor.userId(),
        username: Meteor.user().username
      });
    }
});

Template.Debriefing1.events({
  "click .go-to-debrief2": function (e) {
    e.preventDefault();
    var isNativeSpeaker = $('input[name="is_native_speaker"]:checked').val();
    var nativeSpeakerAge = isNativeSpeaker === "yes" ? $('input[name="native_speaker_age"]').val() : "";
    var age = $('input[name="age"]').val();
    var gender = $('input[name="gender"]:checked').val();

    if (isNativeSpeaker === undefined || age === "" || gender === undefined) {
      alert("Please answer all the starred questions.");
      return;
    } else {

        if (isNativeSpeaker === "yes" && nativeSpeakerAge === "") {
          alert("You indicated that you are a native speaker. Please enter the age when you spoke English fluently.");
          return;
        } else {

          var partialAnswers = {
            isNativeSpeaker: isNativeSpeaker,
            nativeSpeakerAge: nativeSpeakerAge,
            currentAge: age,
            gender: gender,
          };

          Session.set("debriefing", partialAnswers);
          Router.go("/debriefing2");
        }
    }
  }
});

Template.Debriefing2.onRendered(function() {
  if (!Meteor.user()){
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
    } else {
      Helpers.updateResponse({
        userId: Meteor.userId(),
        username: Meteor.user().username
      });
    }
});

Template.Debriefing3.onRendered(function() {
  if (!Meteor.user()){
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
    } else {
      Helpers.updateResponse({
        userId: Meteor.userId(),
        username: Meteor.user().username
      });
    }
});

Template.Debriefing2.events({
  "click .finish-experiment": function (e) {

    e.preventDefault();
    
    var unusual = $('textarea[name="unusual"]').val().trim();
    var guess = $('textarea[name="guess"]').val().trim();
    var similarStudy = $('textarea[name="similar_study"]').val().trim();

    if (unusual === "" || guess === "" || similarStudy === "") {
      alert("Please answer all the questions.");
      return;
    } else {
        var partialAnswers2 = {
          unusual: unusual,
          guess: guess,
          similarStudy: similarStudy
        };

        debugger

        var debriefingAnswers = _.extend({}, Session.get("debriefing"), partialAnswers2);

        var compiledResponse = Session.get("response");
        compiledResponse = _.extend(compiledResponse, {
          debriefing:debriefingAnswers
        });

        Meteor.call("addResponse", compiledResponse, function(error) {
          Router.go("/debriefing3");
        });
      }
    }
});

Template.Debriefing3.helpers({
  usercode: function() {
        return Meteor.userId(); // is UI.getData() the right choice?
      }
});