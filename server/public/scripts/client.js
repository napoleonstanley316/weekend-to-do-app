
$( document ).ready( function(){
    console.log( 'JQ' );
    // Establish Click Listeners
    clickListeners()
    // load existing tasks on page load
    getRoutines();
    
  }); // end doc ready

  function clickListeners() {
      console.log('clickListeners has been called');
      
  } // end of clickListeners

  function getRoutines() {
    console.log( 'in getRoutines' );
    // ajax call to server to get koalas!
    $("#viewRoutines").empty();
    $.ajax({
      type: 'GET',
      url: '/routines'
    }).then(function (response) {
      renderRoutines(response);
    });
  } // end of getRoutines



  function renderRoutines(routines) {
    for (let i = 0; i < routines.length; i++) {
      let routine = routines[i];
      let $tr = $('<tr></tr>')
      $tr.data('routine', routine)
      $tr.append(`<td>${routine.day}</td>`);
      $tr.append(`<td>${routine.task}</td>`);
      $tr.append(`<td>${routine.time}</td>`);
      $tr.append(`<td>${routine.comment}</td>`);
      $tr.append(`<td><button class="completeTask">Mark As Complete</td>`);
      $tr.append(`<td><button class="deleteTask">Delete Task</td>`);
      $('#viewRoutines').append($tr);
    }
  }

