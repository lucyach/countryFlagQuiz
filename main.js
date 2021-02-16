// JQUERY 3.4.1

 var continents = {
        'North America': [],
        'South America': [],
        'Europe': [],
        'Asia': [],
        'Africa': [],
      };

      var random;
      var possibleCountries = [];
      var selectedContinent;
      var score = 0;
      var rounds;
      var setting;

      function countryClick() {
        console.log(selectedContinent);
        event.preventDefault();
        var selectedButton = event.target.id;
        $("#gameContainer").empty();
        $("#gameContainer").append("'<button class='ui-button ui-widget ui-corner-all'> Change continent </button>'");
        $("button").click(startGame);
        $("#gameContainer").append("<p>Score: </p>" + score);
        if (selectedButton == possibleCountries[random]["name"]) {
          score += 100;
          $("#gameContainer").append("<p>Correct!</p>");
        } else {
          score -= 50;
          $("#gameContainer").append("<p>Incorrect! The answer was </p>" + possibleCountries[random]["name"]);
        }
        rounds -= 1;
        if (rounds > 0) {
          $("#gameContainer").append("'<button id = '" + selectedContinent + "'class='ui-button ui-widget ui-corner-all'> Next level </button>'");
          $("button").click(handleClick);
        } else {
          $("#gameContainer").append("'<button class='ui-button ui-widget ui-corner-all'> Game over! Return to continents page. </button>'");
          $("button").click(startGame);
        }
      }

      function capitalClick() {
        event.preventDefault();
        var selectedButton = event.target.id;
        $("#gameContainer").empty();
        random = getRandomInt(5);
        $("#gameContainer").append("'<button class='ui-button ui-widget ui-corner-all'> Change continent </button>'");
        $("button").click(startGame);
        $("#gameContainer").append("<p>Score: </p>" + score);
        if (selectedButton == "capital") {
          $("#gameContainer").append("<p>" + possibleCountries[random].capital + "</p>");
        } else {
          $("#gameContainer").append("<img src = '" + possibleCountries[random].flag + "'/>");
        }

        for (var i = 0; i < 5; i++) {
          $("#gameContainer").append("<button id='" + possibleCountries[i]["name"] + "' class='ui-button ui-widget ui-corner-all'>" + possibleCountries[i]["name"] + "</button>");
        }
        $("button").click(countryClick);
      }

      function handleClick() {
        event.preventDefault();
        var selectedButton = event.target.id;
        selectedContinent = selectedButton;
        possibleCountries = [];
        while (possibleCountries.length < 5) {
          random = getRandomInt(continents[selectedButton].length - 1);
          if (!(possibleCountries.includes(continents[selectedButton][random]))) {
            possibleCountries.push(continents[selectedButton][random]);
          }
        }
        $("#gameContainer").append("<button id= 'flag' class='ui-button ui-widget ui-corner-all'> Quiz me on Flags!</button>");
        $("#gameContainer").append("<button id= 'capital' class='ui-button ui-widget ui-corner-all'> Quiz me on Capitals!</button>");
        $("button").click(capitalClick);
      }

      function startGame() {
        $("#gameContainer").empty();
        rounds = 5;
        var continentNames = Object.keys(continents);
        for (var i = 0; i < continentNames.length; i++) {
          $("#gameContainer").append("<button id='" + continentNames[i] + "' class='ui-button ui-widget ui-corner-all'>" + continentNames[i] + "</button>");
        }
        $("button").click(handleClick);
      }

      $.get({
        url: "https://restcountries.eu/rest/v2/all",
        success: function(result) {
          for (var i = 0; i < result.length; i++) {
            if (result[i].population >= 3000000) {
              var region = result[i].region;
              if (continents[region]) {
                continents[region].push(result[i]);
              } else {
                if (result[i].subregion === "South America") {
                  continents["South America"].push(result[i]);
                } else if (result[i].region === "Oceania") {
                  continents["Asia"].push(result[i]);
                } else {
                  continents["North America"].push(result[i]);
                }
              }
            }
          }
          startGame();
        },
        error: function(error) {
          console.log(error);
        }
      });

      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
