if (Meteor.isClient) {
  // initialize local response
  Session.set("response", {});

  // some global helpers
  Helpers = {};

  // update the response that's stored in session
  Helpers.updateResponse = function (newPair) {
    var resp = Session.get("response");
    Session.set("response", _.extend(resp, newPair));
  }

  // print the current status of response
  Tracker.autorun(function() {
    var currentResponse = Session.get("response");
    console.log("currentResponse:", currentResponse);
  });
}
