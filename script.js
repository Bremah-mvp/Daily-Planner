$(document).ready(function () {

    // Variables
    const dateDisplay = $("#date-display");
    let now = moment().format("MMMM DD, YYYY");
    const clockDelineator = $(".clock-delineator");
    const clockDisplay = $(".clock-display");
  
    // Displaying the current date
    dateDisplay.text(now);
  
    // activating the timeblock
    function addTimeBlock() {
  
      let planTimeDisplay = moment().hour(8).format("h:00A");
      for (let i = 0; i < 11; i++) {
        planTimeDisplay = moment().hour(8 + i).format("h:00A");
        if (planTimeDisplay === "8:00AM") { planTimeDisplay = "Morning" };
        if (planTimeDisplay === "6:00PM") { planTimeDisplay = "Evening" };
           
      }
    }
    
    addTimeBlock();
  
    const timeBlock = $(".time-block");
    const planTextArea = $(".plan-text-area");
    const planBox = $(".plan-box");
  
    // Initialize the Day planner array to use for local storage
    let dayPlanArray = JSON.parse(localStorage.getItem("saved-plan"));
    if (!dayPlanArray) {
      initializeDayPlanArray();
    }
  
    function initializeDayPlanArray() {
  
      dayPlanArray = ["", "", "", "", "", "", "", "", "", "", "", ""];
  
      // Clear the plans each day
      dayPlanArray[11] = now;
      localStorage.setItem("saved-plan", JSON.stringify(dayPlanArray));
      writeThePlans();
    }
  
    // Sending the Day Planner array to storage
    localStorage.setItem("saved-plan", JSON.stringify(dayPlanArray));
  
    
    function writeThePlans() {
      planTextArea.each(function (index) {
        $(this).text(dayPlanArray[index]);
      })
    }
  
    // saving the plan
    timeBlock.on("click", function () {
      let saveButt = event.target;
  
      const enteredEvent = $(this).find(".plan-text-area").val();
      const eventArrayIndex = parseInt($(this).find(".plan-box").attr("id") - 8);
  
      if (saveButt.matches("i")) {
        saveButt = $(this).find("i");
        dayPlanArray[eventArrayIndex] = enteredEvent;
        localStorage.setItem("saved-plan", JSON.stringify(dayPlanArray));

        //  Style on icon click.
        saveButt.addClass("fa-saved");
        writeThePlans();
        setTimeout(function () {
          saveButt.removeClass("fa-saved");
        }, 1000);
      }
    });
  
    // Initialize the slide down clock. 
    let clockPosition = 234;
  
    // Set the sliding clock position and colors for the time blocks 
    function colorCode() {
      
        // Start the clock
      let currentTime = moment()
      clockDisplay.text(currentTime.format("h:mm"));
  
      //  Slide clock positioning
      let clockHour = parseInt(currentTime.format("H"));
      let clockMinute = parseInt(currentTime.format("m"));
      clockPosition = clockHour * 60 + clockMinute - 299;
      if (clockPosition < 241) { clockPosition = 234 };
      if (clockPosition > 834) { clockPosition = 834 };
      clockDelineator.css("top", clockPosition);
  
      // Jquery .each to run through time block divs and asses past/present/future class.
      planBox.each(function () {
  
        if (parseInt($(this).attr("id")) === 8 && parseInt($(this).attr("id")) >= clockHour) {
          $(this).addClass("current-hour");
        } else if (parseInt($(this).attr("id")) === 18 && parseInt($(this).attr("id")) <= clockHour) {
          $(this).addClass("current-hour");
        } else if (parseInt($(this).attr("id")) < clockHour) {
          $(this).addClass("past-hour");
        } else if (parseInt($(this).attr("id")) === clockHour) {
          $(this).addClass("current-hour");
        } else {
          $(this).addClass("future-hour");
        }
      });
    }
    // Color code function for every second to update the clock and set the colors.
    setInterval(function () {
      colorCode();
  
      // check current date to clear calendar each day
      now = moment().format("MMMM DD, YYYY");
      if (now != dayPlanArray[11]) {
        initializeDayPlanArray();
      }
    }, 1000)
  
   writeThePlans();
    colorCode();
  
  });