$(document).ready(function () {
    // diaplay current day
    var currentDay = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(currentDay);

    // declare start-hour
    var startHour = moment().hour(9);

    var scheduledItems = [];

    // check for saved schedule items array
    var savedSchedule = localStorage.getItem("scheduledItems");
    console.log(savedSchedule) ;

    // function to create block of time for work day
    function createWorkDay() {
        for (i = 0; i < 9; i++) {
            // create elements that make up time-block
            var workDayRow = $("<div>").addClass("row timeblock");
            var timeBlockHr = $("<div>").addClass("hour col-12 col-md-2");
            var timeBlockDescription = $("<textarea>").addClass("description col-12 col-md-8");
            var timeBlockSaveBtn = $("<button>").addClass("saveBtn col-12 col-md-2 fas fa-save");
            timeBlockHr.text(moment(startHour).add(i, 'hours').format('h A'));

            // append time-block children to the time-block row
            workDayRow.append(timeBlockHr, timeBlockDescription, timeBlockSaveBtn);
            // set time-block id
            workDayRow.attr("id", i);


            // append time-block row to container
            $(".container").append(workDayRow);
        }
    }

    // load work day from storage


    // listen for click on save button
    $(document).on("click", ".saveBtn", function () {
        // get workDay row details
        var timeBlockDescription = $(this).siblings(".description").val();
        var timeBlockHr = $(this).parent().attr("id");

        // delare scheduledItemsObj
        var scheduledItemsObj = {
            id: timeBlockHr,
            description: timeBlockDescription
        };

        scheduledItems.push(scheduledItemsObj);

        // save to local storage        
        localStorage.setItem("scheduledItems", JSON.stringify(scheduledItems));
    });

    createWorkDay();
});