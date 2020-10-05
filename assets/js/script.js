$(document).ready(function () {
    // diaplay current day
    var currentDay = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(currentDay);

    // declare start-hour
    var startHour = moment().hour(9);

    // container to hold scheduledItems
    var scheduledItems = JSON.parse(localStorage.getItem("scheduledItems"));
    if (!scheduledItems) {
        scheduledItems = [];
    }

    // function to create block of time for work day
    function createWorkDay() {
        for (i = 0; i < 9; i++) {
            // create elements that make up time-block
            var workDayRow = $("<div>").addClass("row time-block");
            var timeBlockHr = $("<div>").addClass("hour col-12 col-md-1");
            var timeBlockDescription = $("<textarea>").addClass("description col-12 col-md-10");
            var timeBlockSaveBtn = $("<button>").addClass("saveBtn col-12 col-md-1 fas fa-save");
            timeBlockHr.text(moment(startHour).add(i, 'hours').format('h A'));
            if (scheduledItems[i]) {
                timeBlockDescription.text(scheduledItems[i].description);
            }

            // append time-block children to the time-block row
            workDayRow.append(timeBlockHr, timeBlockDescription, timeBlockSaveBtn);
            // set time-block id
            workDayRow.attr("id", i);


            // append time-block row to container
            $(".container").append(workDayRow);
        }
    }

    // listen for click on save button
    $(document).on("click", ".saveBtn", function () {
            // get workDay row details
            var description = $(this).siblings(".description").val();
            var id = $(this).parent().attr("id");

            // delare scheduledItemsObj
            var scheduledItemsObj = {
                id: id,
                description: description
            };
            // get savedSchedule
            // var savedSchedule = JSON.parse(localStorage.getItem("scheduledItems"));
            if (!scheduledItems) {
                scheduledItems.push(scheduledItemsObj);
            }
            else {
                // find index of item to be update
                scheduledItems[id] = { id, description };
            }
            // save to local storage        
            localStorage.setItem("scheduledItems", JSON.stringify(scheduledItems));
    });

    function hourUpdater() {
        // get current hour
        var currentHour = moment().hours();

        // loop over time-blocks
        $(".hour").each(function () {
            var blockHour = parseInt($(this).text());
            console.log(blockHour);

            // check and update each time-block as necessary
            if (blockHour < currentHour) {
                $(this).addClass("past")
            }
            else if (blockHour === currentHour) {
                $(this).addClass("present")
            }
            else {
                $(this).removeClass("past");
                $(this).removeClass("present");
                $(this).addClass("future");
            }
        });
    }
    hourUpdater();
    createWorkDay();
});