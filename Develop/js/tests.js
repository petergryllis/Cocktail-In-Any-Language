function language() {  

    let data = ""
    // Get data from local storage
    function getLocalStorage() {
        let storedValue = JSON.parse(localStorage.getItem("cocktail"));
        data = storedValue;
        console.log(data);
      }
      getLocalStorage();

    // make a list of acceptable languages (array)
  let language = "";

  // Variables for DOM elements
  let languageSubmitButton = document.getElementById("language-submit-btn");

  // Function to get the user input and handle button click
  languageSubmitButton.addEventListener("click", function () {
    let languageInput = document.getElementById("language-input");
    let languageValue = languageInput.value;
    languageValue = languageValue.toLowerCase();
    language = languageValue.charAt(0).toUpperCase() + languageValue.slice(1);
    // console.log(language);
    languageInput.value = "";
  });
  // filter languages to code (eg spanish = es)
//   if (language == "spanish") {
//       toLanguage = "es"
//   }
  // get the cocktail data (cocktail variable)
  // translate the cocktail data
  // add the cocktail data to the output box

//   append each value of interest to a single string with mwasurements and ingredients being its own subsection joined by a seperate delimeter
  ingredients = [];
  measurements = [];
  for (let i=1; i<15; i++) {
      if (data["strIngredient" + i] != null) {
        ingredients.push(data["strIngredient" + i]);
      }
      if(data["strMeasure" + i] != null) {
        measurements.push(data["strMeasure" + i]);
      }
  }
  let cocktail = data.strDrink + "~" + data.strInstructions + "~" + ingredients.join(",") + "~" + measurements.join(",");
  let toLanguage = "es";
  let fromLanguage = "en";

  fetch(
    `https://fast-translate.p.rapidapi.com/fastTranslate/translate?text=${cocktail}&langDest=${toLanguage}&langOrigin=${fromLanguage}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "fast-translate.p.rapidapi.com",
        "x-rapidapi-key": "e796e5b386msh092aba973e5001ap1f4c3djsn150ad429e4a2",
      },
    }
  )
    .then(function (response) {
      return response.json()
      })
      .then(function (data) {
        // spliting the data based on delimetr
        splitData = data.translated_text.split("~");
        for (let i=0; i<splitData.length; i++) {
            // console.log(splitData[i] + "\n" + splitData[i].length);
        }
        // Isolate variables based on index in the array or strings
        let cocktailName = splitData[0];
        let cocktailInstructions = splitData[1];
        let splitIngredients = splitData[2].split(","); //split the string by a , to create an array of strings
        let splitMeasure = splitData[3].split(","); //split the string by a , to create an array of strings

        console.log(cocktailName);
        console.log(cocktailInstructions);
        console.log(splitIngredients);
        console.log(splitMeasure);

        // Add the data to the page
        // name
        let translatedCocktailName = document.getElementById("translated-cocktail-name");
        translatedCocktailName.textContent = cocktailName;
        // instructions
        let translatedInstructions = document.getElementById("translated-instructions");
        translatedInstructions.textContent = cocktailInstructions;
        // loop through ingrediens and measurements to set the list to the data contenet

        // ingredients = data[3].split(",");
    })
    .catch((err) => {
      console.error(err);
    });
    
}

language();