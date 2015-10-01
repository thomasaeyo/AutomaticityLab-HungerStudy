Router.configure({
  layoutTemplate: 'Layout',
  waitOn: function() {
    // return Meteor.subscribe('userData');
  },
  onAfterAction: function() {
    // Clear previous search results
    // CourseSearch.store.remove({});
  }
});

Router.route('/', function () {
  this.render('Intro1', {
    to: 'content'
  }); // Yield Main template to where {{> yield "content"}} is in layout.html
});


Router.route('/targettask', function () {
  this.render('TargetTask', {
    to: 'content'
  });
});

Router.route('/intermission', function () {
  this.render('Intermission', {
    to: 'content'
  });
});

Router.route('/debriefing1', function () {
  this.render('Debriefing1', {
    to: 'content'
  });
});

Router.route('/debriefing2', function () {
  this.render('Debriefing2', {
    to: 'content'
  });
});

Router.route('/debriefing3', function () {
  this.render('Debriefing3', {
    to: 'content'
  });
});

Router.route('/admin', function () {
  this.render('Admin', {
    to: 'content'
  });
});

