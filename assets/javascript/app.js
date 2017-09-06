$(document).ready(function() {

  var qArray;
  var right;
  var wrong;
  var unanswered;
  var currentIndex;
  var timeIsUp;

  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "Assets/got.mp3");

  $(".theme-button").on("click", function() {
    audioElement.play();
  });

  $(".pause-button").on("click", function() {
    audioElement.pause();
  });

  var questionTimer = {
    time: 30,

  reset: function() {
        questionTimer.time = 30;
  },
  start: function() {
    $("#time").html("Time Remaining: " + questionTimer.time).css("color", "#BCFEFF");;
    counter = setInterval(questionTimer.count, 1000);
  },
  stop: function() {
        clearInterval(counter);
  },
  count: function() {
        questionTimer.time--;
        $("#time").html("Time Remaining: " + questionTimer.time);

      // Timer will flash white/yellow/pink when close to time-up
      if(questionTimer.time < 6) {
      if(questionTimer.time % 2 == 0) {
        $("#time").css("color", "#EBFFE3");
      } else {
        $("#time").css("color", "#E8867D");
      }
    }
  },
}

function startTrivia() {
  qArray = [{
    question: "Who is the Queen of Dragons?",
    answers: ["Sansa", "Daenerys", "Cersei", "Melisandre"],
    picright: "assets/images/q1_correct.gif",
    picwrong: "assets/images/q1_wrong.gif",
    correctanswer: 1
  }, {
    question: "Who is the King Beyond the Wall?",
    answers: ["Eddard Stark", "Jon Snow", "Mance Rayder", "Night King"],
    picright: "assets/images/q2_correct.gif",
    picwrong: "assets/images/q2_wrong.gif",
    correctanswer: 2
  }, {
    question: "Who was killed by 'The Strangler?'",
    answers: ["Khal Drogo", "Catelyn Stark", "Shae", "Joffrey Baratheon"],
    picright: "assets/images/q3_correct.gif",
    picwrong: "assets/images/q3_wrong.gif",
    correctanswer: 3
  }, {
    question: "Which House Sigil goes with the words, 'We Do Not Sow?'",
    answers: ["Greyjoy", "Stark", "Tully", "Mormont"],
    picright: "assets/images/q4_correct.gif",
    picwrong: "assets/images/q4_wrong.gif",
    correctanswer: 0
  }]

  right = 0;
  wrong = 0;
  unanswered = 0;

  currentIndex = -1;

  $('#questions').html("<button class='button' id='start'>Start</button>");
  $('#answer0, #answer1, #answer2, #answer3').hide().off('click');

  $('#start').on("click", function() {
    advance();
  });
}

  function askQuestions() {
    questionTimer.start();
    $('#questions').html(qArray[currentIndex].question);
    $('#answer0').show().html(qArray[currentIndex].answers[0]);
    $('#answer1').show().html(qArray[currentIndex].answers[1]);
    $('#answer2').show().html(qArray[currentIndex].answers[2]);
    $('#answer3').show().html(qArray[currentIndex].answers[3]);
    $('#gif-holder').hide().off('click');

    onClickAnswer();
  }

  function onClickAnswer() {
    $('.button').on("click", function() {
      var buttonClick = parseInt($(this).attr("value"));
      if(buttonClick === qArray[currentIndex].correctanswer) {
        rightAnswer();
      }
      else {
        wrongAnswer();
      }
    });
  }

function rightAnswer(){
  clearTimeout(timeIsUp);
  right++;
  questionTimer.stop();
  questionTimer.reset();
  $("#time").empty();
  $("#questions").html("<h3>Correct!</h3>");
  $('#answer0, #answer1, #answer2, #answer3').hide().off('click');
  $('#gif-holder').show().html("<img class='gifs' src=" + qArray[currentIndex].picright + ">");

  timeIsUp = setTimeout(advance, 3 * 1000);
}

function wrongAnswer() {
  clearTimeout(timeIsUp);
  wrong++;
  questionTimer.stop();
  questionTimer.reset();
  $("#time").empty();
  $("#questions").html("<h3>Incorrect!</h3>");
  $('#answer0, #answer1, #answer2, #answer3').hide().off('click');
  $('#gif-holder').show().html("The correct answer was: " + qArray[currentIndex].answers[qArray[currentIndex].correctanswer] + "<br><img class='gifs' src=" + qArray[currentIndex].picwrong + ">");

  timeIsUp = setTimeout(advance, 3 * 1000);
}

function timesUp() {
  clearTimeout(timeIsUp);
  unanswered++;
  questionTimer.stop();
  questionTimer.reset();
  $("#time").empty();
  $("#question").html("<h2>Time's Up!</h2>");
  $('#answer0, #answer1, #answer2, #answer3').hide().off('click');
  $('#gif-holder').show().html("The correct answer was: " + qArray[currentIndex].answers[qArray[currentIndex].correctanswer] + "<br><img class='gifs' src=" + qArray[currentIndex].picwrong + ">");

  timeIsUp = setTimeout(advance, 3 * 1000);
}

function endScreen() {
  $("#time").html("<h2>Great job!</h2>");
  $("#questions").html("Your Results <br><br>Right: " + right + "<br>Wrong: " + wrong + "<br>Unanswered: " + unanswered);

  $("#gif-holder").html("<button class='button' id='playagain'>Play again?</button>");

  $("#playagain").on("click", function() {
    startTrivia();
    advance();
  });
}

function advance() {
  currentIndex++;

  if(currentIndex < qArray.length) {
    askQuestions();
    timeIsUp = setTimeout(timesUp, 30 * 1000);
  } else {
    endScreen();
  }
}

startTrivia();

});
