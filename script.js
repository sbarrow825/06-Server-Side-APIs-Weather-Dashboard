$(document).ready(function () {

    var cities = [
        "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
        "bird", "ferret", "turtle", "sugar glider", "chinchilla",
        "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
        "capybara", "teacup pig", "serval", "salamander", "frog"
    ];

    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var newButton = $("<button>");
            newButton.addClass(classToAdd);
            newButton.attr("data-type", arrayToUse[i]);
            newButton.text(arrayToUse[i]);
            $(areaToAddTo).append(newButton);
        }

    }

    $(document).on("click", ".search-button", function () {

        var cityName = $("#city-text").val();
        //   console.log(cityName);
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=a0a661e14f2fa47b84d518a6c1889db2"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var cityDisplayName = response.name;
                $("#city-name").text(cityDisplayName);
                $("#city-date").text(moment().format('M/DD/YYYY'));
                var cityTemp = response.main.temp;
                var cityTempFarhenheit = ((parseFloat(cityTemp) - 273.15) * 1.8 + 32).toFixed(2);
                $("#city-temperature").text(cityTempFarhenheit);
                var cityHumidity = response.main.humidity;
                $("#city-humidity").text(cityHumidity);
                var cityWindSpeed = response.wind.speed;
                $("#city-windspeed").text(cityWindSpeed);

                var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=a0a661e14f2fa47b84d518a6c1889db2" + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon

                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                    .then(function (response2) {
                        var cityUVIndex = response2.value;
                        $("#city-uvindex").text(cityUVIndex);
                        var cityUVIndex = parseFloat(cityUVIndex);
                        if (cityUVIndex >= 11) {
                            $("#city-uvindex").css("background-color", "purple");
                        } else if (cityUVIndex >= 8) {
                            $("#city-uvindex").css("background-color", "red");
                        } else if (cityUVIndex >= 6) {
                            $("#city-uvindex").css("background-color", "orange");
                        } else if (cityUVIndex >= 3) {
                            $("#city-uvindex").css("background-color", "yellow");
                        } else {
                            $("#city-uvindex").css("background-color", "green");
                        }
                    })



            }


            )

        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=a0a661e14f2fa47b84d518a6c1889db2"

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                for (i = 1; i < 6; i += 1) {
                    var nextDay = moment().add(i, "days").format("YYYY-MM-DD");
                    var displayDate = moment().add(i, "days").format("M/DD/YYYY");
                    console.log(nextDay);
                    for (j = 0; j < response.list.length; j += 1) {
                        if (response.list[j].dt_txt === nextDay + " 12:00:00") {
                            if (i === 1) {
                                $("#1-date").text(displayDate);
                                $("#1-date-temperature").text(((response.list[j].main.temp - 273.15) * 1.8 + 32).toFixed(2));
                                $("#1-date-humidity").text(response.list[j].main.humidity);
                            } else if (i === 2) {
                                $("#2-date").text(displayDate);
                                $("#2-date-temperature").text(((response.list[j].main.temp - 273.15) * 1.8 + 32).toFixed(2));
                                $("#2-date-humidity").text(response.list[j].main.humidity);
                            } else if (i === 3) {
                                $("#3-date").text(displayDate);
                                $("#3-date-temperature").text(((response.list[j].main.temp - 273.15) * 1.8 + 32).toFixed(2));
                                $("#3-date-humidity").text(response.list[j].main.humidity);
                            } else if (i === 4) {
                                $("#4-date").text(displayDate);
                                $("#4-date-temperature").text(((response.list[j].main.temp - 273.15) * 1.8 + 32).toFixed(2));
                                $("#4-date-humidity").text(response.list[j].main.humidity);
                            } else {
                                $("#5-date").text(displayDate);
                                $("#5-date-temperature").text(((response.list[j].main.temp - 273.15) * 1.8 + 32).toFixed(2));
                                $("#5-date-humidity").text(response.list[j].main.humidity);
                            }
                        }
                    }
                }
                // console.log(response);
                // console.log(response.city.id);
                // var today = moment().format("YYYY-MM-DD")
                // var tomorrow = moment().add(1, "days")
                // console.log(today);
                // console.log(tomorrow);
            })

    })
});

//           for (var i = 0; i < results.length; i++) {
//             var animalDiv = $("<div class=\"animal-item\">");

//             var rating = results[i].rating;

//             var p = $("<p>").text("Rating: " + rating);

//             var animated = results[i].images.fixed_height.url;
//             var still = results[i].images.fixed_height_still.url;

//             var animalImage = $("<img>");
//             animalImage.attr("src", still);
//             animalImage.attr("data-still", still);
//             animalImage.attr("data-animate", animated);
//             animalImage.attr("data-state", "still");
//             animalImage.addClass("animal-image");

//             animalDiv.append(p);
//             animalDiv.append(animalImage);

//             $("#animals").append(animalDiv);
//           }
//         });
//     });

//     $(document).on("click", ".animal-image", function() {

//       var state = $(this).attr("data-state");

//       if (state === "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//       }
//       else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//       }
//     });

//     $("#add-animal").on("click", function(event) {
//       event.preventDefault();
//       var newAnimal = $("input").eq(0).val();

//       if (newAnimal.length > 2) {
//         animals.push(newAnimal);
//       }

//       populateButtons(animals, "animal-button", "#animal-buttons");

//     });

//     populateButtons(animals, "animal-button", "#animal-buttons");
//   });
