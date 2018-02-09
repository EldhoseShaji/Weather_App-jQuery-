var Global = {};
$(document).one("pagecreate",function(){
  Global.lat = "";
  Global.lng = "";
  Global.city = "";
  Global.search ="";

  getData();

  $('#currLoc').on('click',function() {
    getData();
  });

  $('#search').on('click',function() {
    Global.search = $("#searchcitytext").val();
    console.log(Global.search);
    $.ajax({
          url: "https://maps.googleapis.com/maps/api/geocode/json?address="+Global.search,
          dataType: 'JSON',
          success: function(position){
            console.log(position);
          Global.lat =  position.results[0].geometry.location.lat;
          Global.lng =  position.results[0].geometry.location.lng;
          updateData(Global.lat,Global.lng);
        }
    });
  });

    $('select.city').on('change', function() {
      Global.city = $("#listOfCities option:selected").text();
      if(Global.city){
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address="+Global.city,
            dataType: 'JSON',
            success: function(position){
            Global.lat =  position.results[0].geometry.location.lat;
            Global.lng =  position.results[0].geometry.location.lng;
            updateData(Global.lat,Global.lng);
            }
        });
      }
    });

    function getData(){
      navigator.geolocation.getCurrentPosition(showPosition, showErr);
      function showErr() {
        alert("Geolocation is not supported by this browser.");
      }
      function showPosition(position) {
        Global.lat =  position.coords.latitude;
        Global.lng =  position.coords.longitude;
        updateData(Global.lat,Global.lng);
      }
    }

    function updateData(lat,lng) {
      $.ajax({
          url: "https://api.darksky.net/forecast/46e617b0198645d3eea0c3396a119a31/"+lat+","+lng,
          dataType: 'jsonp',
          success: getWeather
      });
      function getWeather(data){
        console.log(data);
        $('#currentweatherlabel').empty();
        var currTemp=Math.ceil((data.currently.temperature-32)*0.5556);
        $('#currentweatherlabel').append("Current Weather: "+currTemp+"&#8451;");
      }
    }


});
