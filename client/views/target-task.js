var BLANK_DELAY = 750;
var FOCUS_DELAY = 300;
var PRIME_DELAY = 150;
var MASK_DELAY = 150;

prime = [ "burger",
          "burger",
          "burger",
          "cake",
          "cake",
          "cake",
          "chips",
          "chips",
          "chips",
          "chocolate",
          "chocolate",
          "chocolate",
          "steak",
          "steak",
          "steak",
          "burger",
          "burger",
          "burger",
          "cake",
          "cake",
          "cake",
          "chips",
          "chips",
          "chips",
          "chocolate",
          "chocolate",
          "chocolate",
          "steak",
          "steak",
          "steak",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm",
          "zxcvbnm"];

target = ["juicy",
          "hot",
          "grilled",
          "mousse",
          "butter",
          "frosting",
          "salty",
          "crispy",
          "crunchy",
          "rich",
          "smooth",
          "sweet",
          "tender",
          "sizzling",
          "juicy",
          "disk",
          "round",
          "brown",
          "layer",
          "slice",
          "platter",
          "yellow",
          "wavy",
          "bag",
          "brown",
          "dark",
          "tan",
          "brown",
          "cow",
          "knife",
          "juicy",
          "hot",
          "grilled",
          "mousse",
          "butter",
          "frosting",
          "salty",
          "crispy",
          "crunchy",
          "rich",
          "smooth",
          "sweet",
          "tender",
          "sizzling",
          "juicy",
          "disk",
          "round",
          "brown",
          "layer",
          "slice",
          "platter",
          "yellow",
          "wavy",
          "bag",
          "brown",
          "dark",
          "tan",
          "brown",
          "cow",
          "knife",
          "chair",
          "weather",
          "sky",
          "side",
          "top",
          "under",
          "wall",
          "wood",
          "plastic",
          "nail",
          "green",
          "quiet",
          "box",
          "trees",
          "degree",
          "finger",
          "face",
          "carpet",
          "light",
          "point",
          "occur",
          "neutral",
          "blank",
          "screen",
          "watch",
          "deer",
          "sign",
          "way",
          "paid",
          "tide"];

if (Meteor.isClient) {
  var _checkIfCorrect = function (keyPressed, correctResponse) {
    return correctResponse === keyPressed;
  }

  function displayTarget() {
    $(window).off('keyup');

    if (TRIALS.length > 0) {
      var trial = TRIALS.pop();

      $('.stimuli.target.active').removeClass('active').hide();
      $('.stimuli.target').text(trial.target);
      $('.stimuli.prime').text(trial.prime);

      // FOCUS
      setTimeout(function() {
        $('.stimuli.ready').addClass('active').show();

        // PRIME
        setTimeout(function() {
          $('.stimuli.ready.active').removeClass('active').hide();
          $('.stimuli.prime').addClass('active').show();

          // POST-PRIME MASK
          setTimeout(function() {
            $('.stimuli.prime.active').removeClass('active').hide();
            $('.stimuli.mask').addClass('active').show();
   
            // TARGET
            setTimeout(function() {
              $('.stimuli.mask.active').removeClass('active').hide();
              $('.stimuli.target').addClass('active').show();

              var timeStart = Date.now();
              // wait for the participant's response
              $(window).on("keyup", function (e) {
                if (e.keyCode === 90 || e.keyCode === 191) {
                  var timeDiff = Date.now() - timeStart;

                  // Store the user response into an array
                  var currentTargetTaskResults = Session.get("currentTargetTaskResults");

                  var keyPressed = e.keyCode === 90 ? "z" : "/";

                  var taskResponse = {
                    prime: trial.prime,
                    target: trial.target,
                    responseTime: timeDiff,
                    keyPressed: keyPressed,
                    isCorrect: _checkIfCorrect(keyPressed, trial.correctResponse)
                  }

                  console.log(taskResponse);

                  currentTargetTaskResults.push(taskResponse);
                  Session.set("currentTargetTaskResults", currentTargetTaskResults);

                  // recursively display the target
                  displayTarget(); 

                  // deregister the event listener
                  $(window).off("keyup");
                }
              });
            }, MASK_DELAY);

          }, PRIME_DELAY);

        }, FOCUS_DELAY);

      }, BLANK_DELAY);

    } else {
      Router.go('/debriefing1');
      return;
    }
  };

  Template.TargetTask.created = function (e, template) {
    Session.set("numTrials", 0);
  };

  Template.TargetTask.destroyed = function (e, template) {
    // clearInterval(window.clock);
    $(window).off();
  };


  Template.TargetPrepareTask.rendered = function() {

    if (!Meteor.user()) {
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
      
    Session.set("currentTargetTaskResults", []);

    var trials = [];
    for (var i = 0; i < target.length; i++) {
      var trialObj = {
        prime: prime[i],
        target: target[i],
        correctResponse: '/'
      };
      trials.push(trialObj);
    }

    TRIALS = shuffle(trials);
    // TRIALS.splice(3);

    // Finally, we are ready to listen to events
    $(window).keyup(function (e) {
      if (e.keyCode === 32) {
        $('.target-prepare-container').hide();
        displayTarget();
      }
    });
  };
}