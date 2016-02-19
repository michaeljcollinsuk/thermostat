$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();

  function updateTemperature() {
  $('#temperature').text(thermostat.temperature);
  // $('#temperature').attr('class', thermostat.currentEnergyUsage);
  }

  $('#temperature-up').on('click', function() {
    thermostat.increaseTemperature();
    updateTemperature();
  })

  $('#temperature-down').on('click', function() {
    thermostat.decreaseTemperature();
    updateTemperature();
  })

  $('#reset').on('click', function() {
    thermostat.reset();
    updateTemperature();
  })

  $('#psm').on('click', function() {
    if(thermostat.powerSaving === true) {
      thermostat.switchPowerSaving();
      $('#power-saving-status').text('OFF');
    }
    else {
      thermostat.switchPowerSaving();
      $('#power-saving-status').text('ON');
    }
  })

  function displayWeather(city){
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
    var units = '&units=metric';
    $.get(url + token + units, function(data) {
      $('#current-temperature').text(Math.round(data.main.temp));
      $('#humidity').text(data.main.humidity);
      $('#icon').html("<img src=http://openweathermap.org/img/w/"+data.weather[0].icon+".png>")
    });
  };

  $('#select-city').submit(function(){
    event.preventDefault();
    var city = $('#current-city').val();
    $('#city').text(city);
    displayWeather(city);
  });

  $.get('http://ip-api.com/json', function(data) {
    $('#city').text(data.city);
    var city = data.city;
    displayWeather(city);
  });

  $('#toggle').toggle(function(){
    $('#search').animate({width:200});
  },function(){
  $('#search').animate({width:0});
});



});
