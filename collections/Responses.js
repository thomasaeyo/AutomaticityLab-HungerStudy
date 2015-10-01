
Responses = new Mongo.Collection("responses");

Meteor.methods({
  addResponse: function (response) {
    Responses.insert(response);
  }
});
