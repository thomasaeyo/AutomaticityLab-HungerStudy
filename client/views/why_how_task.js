if (Meteor.isClient) {
  Template.WhyTask.onCreated(function() {
    console.log("remove all bound events just to make sure..");
    $(window).off();
  })

  Template.WhyTask.helpers({
    'mindsetContent': function (e, template) {
      return null;
    },

    'nextPage': function (e, template) {
      if (Session.get("nextMindset") === "how") {
        return "/how";
      } else {
        return "/why";
      }
    }
  });

  Template.WhyTask.events({
    "click .task-submit": function (event) {
      var answers = _.map($('input.task-input'), function (input) {
        return $(input).val();
      });

      // need to reverse the order for Why task because it starts from the bottom
      answers.reverse();

      Helpers.updateResponse({
        whySurveyResponses: [answers[0], answers[1], answers[2], answers[3]]
      });
    }
  });

  Template.HowTask.onCreated(function() {
    console.log("remove all bound events just to make sure..");
    $(window).off();
  })

  Template.HowTask.events({
    "click .task-submit": function (event) {
      var answers = _.map($('input.task-input'), function (input) {
        return $(input).val();
      });

      Helpers.updateResponse({
        howSurveyResponses: [answers[0], answers[1], answers[2], answers[3]]
      });
    }
  })
}
