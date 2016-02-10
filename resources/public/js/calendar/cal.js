//var currentMonth = moment().format('YYYY-MM');
//var nextMonth    = moment().add('month', 1).format('YYYY-MM');
var thisMonth = moment().format('YYYY-MM');

function getEventsToday(events) {
  // make a moment object representing today
  var target = moment();
  var eventsToday = [];

  if(events) {
    // are any of the events happening today?
    eventsToday = $.makeArray( $(events).filter( function() {
    // filter the dates down to the ones that match.
    if ((target.isSame(this._clndrStartDateObject, 'day') ||
        target.isAfter(this._clndrStartDateObject, 'day')) &&
      (target.isSame(this._clndrEndDateObject, 'day') ||
       target.isBefore(this._clndrEndDateObject, 'day')))
      return true;
    else
      return false;
    }));

    // now you have an array eventsToday that will contain any events happening today.
    if(eventsToday.length) {
      //...
    }
  }
  return eventsToday;
}

/*
console.log($( "#dialog" ));
$( "#dialog" ).dialog( "option", "height", 500 );
$( "#dialog" ).dialog( "option", "autoOpen", false );
$( "#dialog" ).dialog( "option", "show", {
  effect: "blind",
  duration: 1000
});
$( "#dialog" ).dialog( "option", "hide", {
  effect: "explode",
  duration: 1000
});
var dd = $( "#dialog" ).dialog({
  autoOpen: false,
  show: {
    effect: "blind",
    duration: 1000
  },
  hide: {
    effect: "explode",
    duration: 1000
  },
  height: 800
});
$("#dialog").dialog();
*/

//fetch events from clojure backend
ajaxEvents = [];
$.ajax({
    method: "POST",
    dataType: "json",
    url: '/calevents',
    success: function(data) {
        $.each(data, function(key, event) {
            var item = {
              "id" : event.id,
              "title" : event.title,
              "description" : event.description,
              "form_id" : event.form_id,
              "start" : moment(event.start).format('YYYY-MM-DD'),
              "_clndrStartDateObject" : moment(event.start),
              "end" : moment(event.end).format('YYYY-MM-DD'),
              "price" : event.payment_amt ? event.payment_amt : 0.0,
              "_clndrEndDateObject" : moment(event.end),
            };
            ajaxEvents.push(item);
        });
      $('#calendar_target').clndr({
        template: $('#template-calendar').html(),
        events: ajaxEvents,
        eventsToday: getEventsToday(ajaxEvents),
        daysOfTheWeek: ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'],
        clickEvents: {
          click: function(target) {
            //$( "#dialog" ).dialog( "open" );
            $("#dialog").dialog();
            $("#dialog").dialog( "option", "title", target.date.format("dddd, MMMM Do YYYY") );
            $("#dialog").dialog( "option", "height", 500 );
            $("#dialog").dialog( "option", "width", 400 );
            $("#dialog").dialog( "option", "show", {  effect: "blind",  duration: 1000  });
            $("#dialog").dialog( "option", "hide", {  effect: "explode",  duration: 1000  });
            $("#dialog ul").empty();
            target.events.forEach(function(event){
              $("#dialog ul").append(
                '<li><a href="/form/'+event.form_id+'/addcart">add to cart<i class="fa fa-shopping-cart"></i></a>'+
                '&nbsp;&nbsp;&nbsp;&nbsp;'+event.title+'&nbsp;&nbsp;&nbsp;'+
                '<i class="fa fa-dollar">'+event.price+'</i></li>');
            });
            console.log(target);}},
        multiDayEvents: {
          startDate: 'start',
          endDate: 'end'}
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    }
});
