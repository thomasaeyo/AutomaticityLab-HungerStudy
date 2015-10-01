Template.Debriefing1.onRendered(function() {
  var secondTargetTaskResults = Session.get("currentTargetTaskResults");

  Helpers.updateResponse({
    secondTargetTaskResults: secondTargetTaskResults
  });
});

Template.Debriefing1.events({
  "click .go-to-debrief2": function (e) {
    var age = $('input[name="age"]').val();
    var sex = $('input[name="sex"]').val();
    var attention1 = $('input[name="attention1"]:checked').val();
    var attention2 = $('input[name="attention2"]:checked').val();
    var focused1 = $('input[name="focused1"]:checked').val();
    var focused2 = $('input[name="focused2"]:checked').val();
    var motivated = $('input[name="motivated"]:checked').val();

    var partialAnswers = {
      age: age,
      sex: sex,
      attention1: attention1,
      attention2: attention2,
      focused1: focused1,
      focused2: focused2,
      motivated: motivated
    };

    Session.set("debriefing", partialAnswers);
  }
});

Template.Debriefing2.events({
  "click .finish-experiment": function (e) {
    var positive = $('input[name="positive"]:checked').val();
    var negative = $('input[name="negative"]:checked').val();
    var unusual = $('textarea[name="unusual"]').val();
    var guess = $('textarea[name="guess"]').val();
    var comments = $('textarea[name="comments"]').val();

    var partialAnswers2 = {
      positive: positive,
      negative: negative,
      unusual: unusual,
      guess: guess,
      comments: comments
    };

    debugger

    var debriefingAnswers = _.extend({}, Session.get("debriefing"), partialAnswers2);

    var compiledResponse = Session.get("response");
    compiledResponse = _.extend(compiledResponse, {
      debriefing:debriefingAnswers
    });

    Meteor.call("addResponse", compiledResponse);
  }
});