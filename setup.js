

/// create a function called setupExperiment() that will be called when the page loads
function setupExperiment() {





    var jsPsych = initJsPsych({
        on_finish: function() {
            jsPsych.data.displayData();
          }
        }
    );
    const subject_id = jsPsych.randomization.randomID(10);
    const filename = `${subject_id}.csv`;
    jsPsych.data.addProperties({
        subject: subject_id
        });
    
    
    var timeline = [];
    
    
    var welcome = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "Welcome to the experiment. Press any key to begin."
      };
    
      var instructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
          <p>In this experiment, you will see two drawings on the screen.</p>
          <p>If you see a lion press the letter L on the keyboard as fast as you can.
          </p><p>If the drawing is of a badger, 
          press the letter B on the keyboard as fast as you can.</p>
          <div style='width: 700px;'>
          <div style='float: left;'><img src='img/badger.png'></img>
          <p class='small'><strong>Press the B key</strong></p></div>
          <div style='float: right;'><img src='img/lion.png'></img>
          <p class='small'><strong>Press the L key</strong></p></div>
          </div>
          <p>Press any key to begin.</p>
        `,
      };
    
    
      var goodbye = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
          <p>Great job! You've completed all the trials!</p>
        `,
        post_trial_gap: 2000
      };
    
      var fixation = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<div style="font-size:60px;">+</div>',
        choices: "NO_KEYS",
        trial_duration: 1000,
      };
    
    
      var rtTrial = {
        type: jsPsychImageKeyboardResponse,
        stimulus: jsPsych.timelineVariable('stimulus'),
        choices: ['b', 'l'],
        data: {
            stimType: jsPsych.timelineVariable('stimType')
          }
      }
    
      var testStims = [
        { stimulus: "img/lion.png", stimType: "lion" },
        { stimulus: "img/badger.png", stimType: "badger"}
      ];
    
      var expTrials = {
        timeline: [fixation, rtTrial],
        timeline_variables: testStims,
        randomize_order: true,
        repetitions: 3
        
      }
    
      const save_data = {
        type: jsPsychPipe,
        action: "save",
        experiment_id: "wwEim3AIpKP9",
        filename: filename,
        data_string: ()=>jsPsych.data.get().csv()
      };
    
    
    
    
    timeline.push(welcome);
    timeline.push(instructions);
    timeline.push(expTrials);
    timeline.push(goodbye);
    timeline.push(save_data);
    
    jsPsych.run(timeline);
    
    }