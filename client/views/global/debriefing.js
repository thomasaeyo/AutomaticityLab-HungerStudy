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
  "click #dietary_other_text": function (e) {
    $("#dietary_other").prop("checked", true);
  }
});

Template.Debriefing1.events({
  "click .finish-experiment": function (e) {
    e.preventDefault();
    var mood = $('input[name="mood"]').val();
    var avoidFattening = $('input[name="avoid_fattening"]').val();
    var eatingHealthy = $('input[name="eating_healthy"]').val();
    var lastMeal = $('input[name="last_meal"]').val();
    var howHungry = $('input[name="hungry"]').val();
    var instructionToRefrain = $('input[name="refrain"]:checked').val();
    var hasDietaryConstraint = $('input[name="has_dietary_constraint"]:checked').val();
    var dietaryConstraints = [];
    if (hasDietaryConstraint) {
      $('input[name="dietary_constraint"]:checked').each(function() {
        if ($(this).val() === "other") {
          dietaryConstraints.push($('input[id="dietary_other_text"]').val());
        } else {
          dietaryConstraints.push($(this).val())  
        }
      });
    }
    var isNativeSpeaker = $('input[name="is_native_speaker"]:checked').val();
    var nativeSpeakerAge = isNativeSpeaker === "yes" ? $('input[name="native_speaker_age"]').val() : "";
    var age = $('input[name="age"]').val();
    var gender = $('input[name="gender"]:checked').val();
    var thoughts = $('textarea[name="thoughts"]').val().trim();

    if (mood === "" || avoidFattening  === "" || eatingHealthy  === "" || 
        lastMeal  === "" || howHungry  === "" || instructionToRefrain  === undefined || 
        hasDietaryConstraint  === undefined ||  isNativeSpeaker === undefined || age === "" || 
        gender === undefined) {
      alert("Please answer all questions.");
      return;
    } else {
      if (isNativeSpeaker === "yes" && nativeSpeakerAge === "") {
        alert("You indicated that you are a native speaker. Please enter the age when you spoke English fluently.");
        return;
      } else if (hasDietaryConstraint === "yes" && dietaryConstraints.length === 0) {
        alert("You indicated that you have a dietary constraint. Please make a selection.");
        return;
      } else {
        var questionAnswers = {
          mood: mood,
          avoidFattening: avoidFattening,
          eatingHealthy: eatingHealthy,
          lastMeal: lastMeal,
          howHungry: howHungry,
          instructionToRefrain: instructionToRefrain,
          hasDietaryConstraint: hasDietaryConstraint,
          dietaryConstraints: dietaryConstraints,
          isNativeSpeaker: isNativeSpeaker,
          nativeSpeakerAge: nativeSpeakerAge,
          age: age,
          gender: gender,
          thoughts: thoughts
        };

        var response = _.extend(Session.get("response"), {
          debriefing: questionAnswers
        });

        Meteor.call("addResponse", response);
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