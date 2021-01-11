$(document).ready(function () {
    console.log('JQ');
    // Establish Click Listeners
    clickListeners()
    // load existing tasks on page load
    getRoutines();

}); // end doc ready

function clickListeners() {
    console.log('clickListeners has been called');
    $('#addButton').on('click', handleSubmit);
    $('#viewRoutines').on('click', '.deleteTask', deleteTask);
    $('#viewRoutines').on('click', '.completeTask', completeTask);
} // end of clickListeners

function completeTask() {
    console.log('clicked completeTask');
  
    let routine = $(this).closest('tr').data('routine');
    console.log(routine);
    let status = $(this).closest('tr').data('complete');
    console.log(routine, status);
    
  
    $.ajax({
      type: 'PUT',
      url: `/routines/${routine.id}`,
      data: routine
    }).then(function (response) {
      console.log('Updated completion status');
      getRoutines();
    }).catch(function (error) {
      alert('error updating status');
    })
  }

function deleteTask() {
    console.log('deleteTask has been called');
    const routine = $(this).closest('tr').data('id');
    console.log(routine);

    // routine.router/
    $.ajax({
        type: 'DELETE',
        url: `/routines/${routine}`
    }).then(function (response) {
        getRoutines();
    }).catch(function (error) {
        alert('error in delete')
    })

}

function handleSubmit() {
    console.log('Submit button clicked.');
    let taskToAdd = {
        day: $('#dayIn').val(),
        task: $('#taskIn').val(),
        time: $('#timeIn').val(),
        complete: $('#completeIn').val(),
        comment: $('#commentIn').val()
    }
    // adds new task to DOM
    $.ajax({
        type: 'POST',
        url: '/routines',
        data: taskToAdd
    }).then(function (response) {
        console.log('Response from server.', response);
        getRoutines();
        clearFields();
    }).catch(function (error) {
        console.log('Error in POST', error)
        alert('Unable to add task at this time. Please try again later.');
    });
}

// Gets server side database "routines" data via client side GET request (getRequest function)
function getRoutines() {
    console.log('in getRoutines');
    // ajax call to server to get koalas!
    $("#viewRoutines").empty();
    $.ajax({
        type: 'GET',
        url: '/routines'
    }).then(function (response) {
        renderRoutines(response);
    });
} // end of getRoutines

// displays "routines" data on the DOM and stores in server database 
function renderRoutines(routines) {
    for (let i = 0; i < routines.length; i++) {
        let routine = routines[i];
        let $tr = $('<tr></tr>')
        $tr.data('routine', routine)
        $tr.data('id', routine.id)
        $tr.append(`<td>${routine.day}</td>`);
        $tr.append(`<td>${routine.task}</td>`);
        $tr.append(`<td>${routine.time}</td>`);
        $tr.append(`<td>${routine.complete}</td>`);
        $tr.append(`<td>${routine.comment}</td>`);
        if(routine.complete === false) {
            $tr.append(`<td><button class = "completeTask">Complete Task</button></td>`);
        //   addIncompleteClass()
        $(this).closest('tr').addClass("incomplete")
        }else {
            $tr.append(`<td><button class = "completeTask">Task Completed</button></td>`);
            // addcompleteClass()
        }
        $tr.append(`<td><button class="deleteTask">Delete Task</td>`);
        $('#viewRoutines').append($tr);

        if (routine.complete === true) {
            $tr.addClass('complete')
        } else if (routine.complete === false) {
            $tr.addClass('incomplete')
        }
    }

}

function clearFields() {
    console.log('clearFields has been called');
    $('#dayIn').val(''),
        $('#taskIn').val(''),
        $('#timeIn').val(''),
        $('#commentIn').val('')

}


