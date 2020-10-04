var startHour = $("#start-hour").attr("start-hour")

function createWorkDay() {
    for(i=0; i < 8; i++) {
        // create elements that make up time-block
        var workDayRow = $("<div>").addClass("row timeblock");
        var timeBlockHr = $("<div>").addClass("hour col-12 col-md-2");
        var timeBlockDescription = $("<div>").addClass("description col-12 col-md-8");
        var timeBlockSaveBtn = $("<button>").addClass("saveBtn col-12 col-md-2");

        // append time-block children to the time-block row
        workDayRow.append(timeBlockHr, timeBlockDescription, timeBlockSaveBtn);

        // append time-block row to container
        $(".container").append(workDayRow);
    }
}

createWorkDay();