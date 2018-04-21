            //Dark mode change function
            function dark() {
                if (document.body.style.backgroundColor == 'rgb(255, 255, 255)') {
        
                        document.body.style.backgroundColor = '#333';
                }//End of if statement
                else {
                        document.body.style.backgroundColor = 'rgb(255, 255, 255)';
                }//End of else statement
            }//End of dark function
          
          //Navigation controls
          $(document).ready(function(){
            document.getElementById("home").style.display = "block" ;
            
            });
            
          function switchTo(id) {
            var newSearch = id;
            if(newSearch == "home") {
              document.getElementById("home").style.display = "none";
              document.getElementById("second").style.display = "block";
            }
            else if (newSearch == "second") {
              document.getElementById("second").style.display = "none";
              document.getElementById("third").style.display = 'block';
            }
          }
          
          //Another way to switch screens
          // show the home screen
          $("#home").show();
            
          // when a nav link is clicked, hide screens then show target
          $("li a").on("click", function() {
            $(".screen").hide();
              var targetSelector = $(this).attr("href");
              //console.log(targetSelector);
              $(targetSelector).show();
          });
          
          //both api endpoints 
          var map;
          var heatmap;
          function initialize() {
              
              var arrayPoints = [];
              $.get("https://data.cityofchicago.org/resource/787j-mys9.json")
              .done(function(response) {
                  map = new google.maps.Map(document.getElementById('map'), {
                      center: {lat: 41.8781, lng: -87.6298},
                      //radius: 16093.44,
                      zoom: 13,
                      //types: ['restaurant'],
                      //query: "restuarant",
                      scrollwheel: true
                  }); 
                  
            var input = (document.getElementById('userInput'));
          
            // Create the autocomplete helper, and associate it with
            // an HTML text input box.
            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);
          
            //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            //map.controls[google.maps.ControlPosition.userInput].push(input);
          
            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
              map: map
            });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map, marker);
            });
          
            // Get the full place details when the user selects a place from the
            // list of suggestions.
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
              infowindow.close();
              var place = autocomplete.getPlace();
              if (!place.geometry) {
                return;
              }
          
              if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
              } else {
                map.setCenter(place.geometry.location);
                map.setZoom(13);
              }
          
              // Set the position of the marker using the place ID and location.
              marker.setPlace(({
                placeId: place.place_id,
                location: place.geometry.location
              }));
              marker.setVisible(true);
              
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                  place.formatted_address + '</div>');
                  infowindow.open(map, marker);
                  });
                  
                  //console.log(marker);
                  $.each(response, function(i,v) {
                    //console.log(v);
                    if (v.hasOwnProperty("latitude") && v.hasOwnProperty("longitude")) {
                    
                      arrayPoints.push(new google.maps.LatLng(parseFloat(v.latitude), parseFloat(v.longitude)))
                    }
                  })
                  
                  heatmap = new google.maps.visualization.HeatmapLayer({
                      data: arrayPoints,
                      map: map
                    });
              
              })
          }
          
            function toggleHeatmap() {
              heatmap.setMap(heatmap.getMap() ? null : map);
            }
      
            function changeGradient() {
              var gradient = [
                'rgba(0, 255, 255, 0)',
                'rgba(0, 255, 255, 1)',
                'rgba(0, 191, 255, 1)',
                'rgba(0, 127, 255, 1)',
                'rgba(0, 63, 255, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 0, 223, 1)',
                'rgba(0, 0, 191, 1)',
                'rgba(0, 0, 159, 1)',
                'rgba(0, 0, 127, 1)',
                'rgba(63, 0, 91, 1)',
                'rgba(127, 0, 63, 1)',
                'rgba(191, 0, 31, 1)',
                'rgba(255, 0, 0, 1)'
              ]
              heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
            }
      
            function changeRadius() {
              heatmap.set('radius', heatmap.get('radius') ? null : 20);
            }
      
            function changeOpacity() {
              heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
            }
        
        // Script to add voice api to the userInput
          //Set variables for voice 
          var supportMsg = document.getElementById('msg');
          var speechMsgInput = document.getElementById('userInput');
          var button = document.getElementById('btnSearch')
          
          //create a new utter for user input and add it to the queue
          function speak(text) {
            //create a new speechSunthesisUtterance
            var msg = new SpeechSynthesisUtterance();
            
            //set the text
            msg.text = text;
            
            //queue this utter
            window.speechSynthesis.speak(msg);
          }//End of speak function 
          
          // Set up an event listener for when the 'speak' button is clicked.
          button.addEventListener('click', function(e) {
            if (speechMsgInput.value.length > 0) {
            	speak(speechMsgInput.value);
            }//End of if statement
          });//End of button event listener