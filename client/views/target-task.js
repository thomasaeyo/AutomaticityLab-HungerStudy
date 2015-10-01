// var ARROW_CLOCK_DELAY = 750;
// var RT_WINDOW_DELAY = 400;
// var BLANK_DELAY = 1000;
// var EXPIRE_DELAY = 1500;

var BLANK_DELAY = 1000;
var READY_DELAY = 300;
var PRIME_DELAY = 150;


/**
* Randomize array element order in-place.
* Using Fisher-Yates shuffle algorithm.
*/
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

realTargets = ["cup",
              "bottle",
              "glass",
              "faucet",
              "tap",
              "liquid",
              "ice",
              "cold",
              "clean",
              "wash",
              "crub",
              "bath",
              "soap",
              "shower",
              "rinse",
              "suds",
              "irrigate",
              "ocean",
              "swim",
              "rain",
              "river",
              "flood",
              "drain",
              "lake",
              "town",
              "camera",
              "book",
              "movie",
              "speaker",
              "music",
              "tree",
              "photo"];

nonsenseTargets = ["ans",
                  "baps",
                  "biff",
                  "ched",
                  "chig",
                  "chome",
                  "dath",
                  "dod",
                  "dopser",
                  "dut",
                  "fabon",
                  "fama",
                  "filltam",
                  "fom",
                  "fum",
                  "gan",
                  "gog",
                  "hettop",
                  "heff",
                  "jeg",
                  "jop",
                  "juff",
                  "krong",
                  "lemt",
                  "lun",
                  "mab",
                  "mip",
                  "mon",
                  "marrt",
                  "pude",
                  "qengs",
                  "quinle"];

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

      setTimeout(function() {

        $('.stimuli.ready').addClass('active').show();

        setTimeout(function() {
          $('.stimuli.ready.active').removeClass('active').hide();
          $('.stimuli.prime').addClass('active').show();

          setTimeout(function() {
            $('.stimuli.prime.active').removeClass('active').hide();
            $('.stimuli.target').addClass('active').show();

            var timeStart = Date.now();
          // wait for the participant's response
          $(window).on("keyup", function (e) {
            if (e.keyCode === 68 || e.keyCode === 75) {
              var timeDiff = Date.now() - timeStart;

              // Store the user response into an array
              var currentTargetTaskResults = Session.get("currentTargetTaskResults");

              var keyPressed = e.keyCode === 68 ? "d" : "k";

              var taskResponse = {
                block: "Block1",
                prime: trial.prime,
                target: trial.target,
                responseTime: timeDiff,
                keyPressed: keyPressed,
                isCorrect: _checkIfCorrect(keyPressed, trial.correctResponse)
              }

              console.log(taskResponse);

              currentTargetTaskResults.push(taskResponse);

              Session.set("currentTargetTaskResults", currentTargetTaskResults);

              displayTarget();

              //deregister the event listener
              $(window).off("keyup");
            }
          });

          }, PRIME_DELAY);

        }, READY_DELAY);

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
      
      Session.set("currentTargetTaskResults", []);

      var trials = [];
      for (var i = 0; i < realTargets.length; i++) {
        var trialObj1 = {
          target: realTargets[i],
          prime: "water",
          correctResponse: 'd',
        };
        var trialObj2 = {
          target: realTargets[i],
          prime: "pencil",
          correctResponse: 'd',
        };
        trials.push(trialObj1);
        trials.push(trialObj2);
      }

      for (var i = 0; i < nonsenseTargets.length; i++) {
        var trialObj1 = {
          target: nonsenseTargets[i],
          prime: "water",
          correctResponse: 'k',
        };
        var trialObj2 = {
          target: realTargets[i],
          prime: "pencil",
          correctResponse: 'k',
        };
        trials.push(trialObj1);
        trials.push(trialObj2);
      }

      TRIALS = shuffleArray(trials);

      // Finally, we are ready to listen to events
      $(window).on('keyup', function (e) {
        if (e.keyCode === 68 || e.keyCode === 75) {
          $('.target-prepare-container').hide();
          displayTarget();
        }
      });
    };
}