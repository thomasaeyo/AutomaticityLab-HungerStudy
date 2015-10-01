if (Meteor.isServer) {
  Meteor.methods({
    "createRandomUser": function() {
      var user = Accounts.createUser({
        username: "user-"+Meteor.users.find().count(),
        password: "1234"
      });
      return user;
    }
  })
}
