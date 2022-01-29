// VARIABLES ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var id = getColumn("Pollution Table", "id");
var marioStatus = "";

var difficultyLevel = "";
var health = 100;
var dayCount = 1;

var foodlessCount = 0;
var damageToMario = 10;

// ELEMENTS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var carbonMonoxide = getColumn("Pollution Table", "CO(GT)");
var benzene = getColumn("Pollution Table", "C6H6(GT)");
var titaniumDioxide = getColumn("Pollution Table", "PT08.S2(NMHC)");

// FIXED ELEMENTS --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// These lists include all of the data from 2004-2005 but have removed the "undefined" data that appears on page 19
var fixedCarbonMonoxide = [];
var fixedBenzene = [];
var fixedTitaniumDioxide = [];

// FUNCTIONS -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Filters the lists to remove the "undefined" data that code.org adds to the dataset
function filterRelavance(stopNumber){

  for (var i = 0; i < id[stopNumber]; i += 1){
    
    appendItem(fixedCarbonMonoxide, carbonMonoxide[i]);
    appendItem(fixedBenzene, benzene[i]);
    appendItem(fixedTitaniumDioxide, titaniumDioxide[i]);
  }
}

// Because traversing through around 10,000 elements can take some time, there is a loading screen
function startGameNow(){
  
  // Alerts the user the game has finished loading
  playSound("sound://category_bell/vibrant_game_slot_machine_ding_1.mp3");
  setProperty("loadingText", "font-size", 30);
  setText("loadingText", "Get Ready!");
  
  setTimeout(function(){
    
    // Redirects the user to the start screen
    setScreen("mainTitle");
  }, 2000);
}

// Not necessary but it sort of adds realism in which this app really feels like a game 
function transitionAssets(){
  
  // Stops the main page background music
  stopSound("Cursed-Nintendo-Images-but-with-Super-Mario-Bros-music.mp3");
  playSound("sound://category_bell/vibrant_game_slot_machine_ding_1.mp3");
  
  // Redirects the user to the loading screen
  setScreen("loadingScreen");
  setProperty("loadingText", "font-size", 20);
  setText("loadingText", "Loading ...           Please Be Patient");

  // After around 2000 ms (2 seconds)
  setTimeout(function(){
    
    playSound("marioswarudo.mp3", true);
    // Redirects the user to the game screen (actual content)
    setScreen("gameScreen");
  }, 2000);
}

// LEFT CASTLE ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function leftCastle(){
  
  // Prevent the user from clicking the button again before the function finishes
  setProperty("stayHomeButton", "hidden", true);
  setProperty("outButton", "hidden", true);
  
  // Checks to see if you choose the easy difficulty  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  if (difficultyLevel == "Benzene"){
    
    // Selects a randomBezene value frome the air pollution table
    var randomBenzene = fixedBenzene[randomNumber(0, fixedBenzene.length - 1)];
    
    // Mario's resistance to the pollution (can withstand up to 7 µg/m³ of benzene a day)
    var benResistance = 7;

    // Displays why Mario Loses or gains health
    marioStatus = getText("statusArea");
    marioStatus = marioStatus + "\n\nToday, there was " + randomBenzene + "µg/m³ worth of " + difficultyLevel;
    setText("statusArea", marioStatus);

    // If the benzene value is greater than Mario's abilty to resist the pollution
    if (benResistance < randomBenzene){
      
      // Mario takes damage (The amount ranges by difficulty)
      health = health - damageToMario;
      marioIsHurt();
      
      // After 1.7 seconds, return Mario back to the castle and make the buttons reappear for the user
      setTimeout(resetDay, 1700);
    }
  
    else if (benResistance >= randomBenzene){
      
      // You finally got food! Reset the foodless count
      foodlessCount = 0;
      
      // Mario gains 10 health if he does not have 100 health already
      if (health != 100){
        health = health + 10;}
      marioSurvives();
      
      // After 1.6 seconds, return Mario back to the castle and make the buttons reappear for the user
      setTimeout(resetDay, 1600);
    }
  }

  // Checks to see if you choose the intermediate difficulty  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  if (difficultyLevel == "Carbon Monoxide"){
    
    var randomCO = fixedCarbonMonoxide[randomNumber(0, fixedCarbonMonoxide.length - 1)];
    
    // Mario's resistance to the pollution (can withstand up to 1.5 µg/m³ of CO a day)
    var coResistance = 1.5;

    // Displays why Mario Loses or gains health
    marioStatus = getText("statusArea");
    marioStatus = marioStatus + "\n\nToday, there was " + randomCO + "µg/m³ worth of " + difficultyLevel;
    setText("statusArea", marioStatus);

    if (coResistance < randomCO){
      
      health = health - (damageToMario * 2);
      marioIsHurt();
      
      setTimeout(resetDay, 1700);
    }
  
    else if (coResistance >= randomCO){
      
      // You finally got food! Reset the foodless count
      foodlessCount = 0;
      
      if (health != 100){
        health = health + 10;}
      marioSurvives();
      
      setTimeout(resetDay, 1600);
    }
  }
  
  // Checks to see if you choose the hard difficulty  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  if (difficultyLevel == "Titanium Dioxide"){
    
    var randomTitan = fixedTitaniumDioxide[randomNumber(0, fixedTitaniumDioxide.length - 1)];
    
    // Mario's resistance to the pollution (can withstand up to 800 µg/m³ of titanium dioxide a day)
    var tDioxideResistance = 800;

    // Displays why Mario Loses or gains health
    marioStatus = getText("statusArea");
    marioStatus = marioStatus + "\n\nToday, there was " + randomTitan + "µg/m³ worth of " + difficultyLevel;
    setText("statusArea", marioStatus);

    if (tDioxideResistance < randomTitan){
      
      health = health - (damageToMario * 10);
      marioIsHurt();
      
      setTimeout(resetDay, 1700);
    }
  
    else if (tDioxideResistance >= randomTitan){

      // You finally got food! Reset the foodless count
      foodlessCount = 0;

      if (health != 100){
        health = health + 10;}
      marioSurvives();
      
      setTimeout(resetDay, 1600);
    }
  }
}

// STAYED HOME -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function stayedHome(){
  
  // Mario's stomach gurgles, letting the user know staying home isn't great!
  playSound("stomach.mp3");
  
  foodlessCount = foodlessCount + 1;
  nightTime();
  
  // Displays why Mario Loses or gains health
  marioStatus = getText("statusArea");
  marioStatus = marioStatus + "\n\nMario has slept for " + foodlessCount + " days without food";
  setText("statusArea", marioStatus);
  
  // Displays a sleepy Mario, taking the buttons away to remove spam clicking
  setProperty("sleepyMario", "hidden", false);
  setProperty("marioCastle", "hidden", true);

  setProperty("stayHomeButton", "hidden", true);
  setProperty("outButton", "hidden", true);

  // If you have tapped the stay home button for more than 3 days, take 20 damage 
  // Note that if you go out hungry and fail to get food b/c of pollutant, you take additional damage
  if (foodlessCount > 3){
    
    health = health - 20;
  }

  setTimeout(resetDay, 1600);
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// A hurt Mario sprite shows up to alert the user of their actions and displays health 
function marioIsHurt(){

  // Hides both the store and the castle (so it looks like he fainted while traveling)
  setProperty("store", "hidden", true);
  setProperty("castle", "hidden", true);

  // Displays the hurt Mario sprite
  setProperty("marioCastle", "hidden", true);
  setProperty("hurtMario", "hidden", false);
  
  // Stopsound is to prevent sound effects stacking on top of sound effects
  stopSound("Mario-Fall-(Waa)---Sound-Effect-(HD).mp3");
  stopSound("-Super-Mario-64--Mario---YAHOO-!-Sound-Effect--Free-Ringtone-Download-.mp3");
  
  playSound("Mario-Fall-(Waa)---Sound-Effect-(HD).mp3");  
}

// A  Mario sprite shows at the grocery store to alert the user of their actions and displays health
function marioSurvives(){
  
  // Hides the castle and reveals the store
  setProperty("store", "hidden", false);
  setProperty("castle", "hidden", true);
  
  setProperty("marioCastle", "hidden", true);
  setProperty("marioStore", "hidden", false);
  
  stopSound("Mario-Fall-(Waa)---Sound-Effect-(HD).mp3");
  stopSound("-Super-Mario-64--Mario---YAHOO-!-Sound-Effect--Free-Ringtone-Download-.mp3");
  
  playSound("-Super-Mario-64--Mario---YAHOO-!-Sound-Effect--Free-Ringtone-Download-.mp3");
}

// Function to make the buttons reappear, display how many day's you've survived, or directs to the game over screen
function resetDay(){

  // Displays Mario's health on the screen  
  setProperty("healthDisplay", "text", "Health Remaining: " + health);

  // Sets weather back to day time
  setProperty("gameScreen", "background-color", rgb(99, 205, 255));
  
  setProperty("grass", "background-color", rgb(124, 255, 116));
  setProperty("moon", "hidden", true);
  
  setProperty("cloud1", "hidden", false);
  setProperty("cloud2", "hidden", false);
  setProperty("cloud3", "hidden", false);
  
  if (health > 0){
    
    // Increases you day count by one
    dayCount += 1;  
    setProperty("elementLabel", "text", difficultyLevel + " (Day " + dayCount + ")");
    
    // Returns Mario back to the castle awake
    setProperty("marioCastle", "hidden", false);
    setProperty("hurtMario", "hidden", true);
    setProperty("marioStore", "hidden", true);
    setProperty("sleepyMario", "hidden", true);

    setProperty("stayHomeButton", "hidden", false);
    setProperty("outButton", "hidden", false);
  }
  
  else{
    stopSound("marioswarudo.mp3");
    
    playSound("Sad-Song---Super-Mario-RPG.mp3", true);
    setScreen("gameOverScreenie");
    
    // Displays how many days you have survived total
    setProperty("scoreLabel", "text", "Days Survived: " + dayCount);
  }
  
  // Mario returns to the castle and away from the store
  setProperty("store", "hidden", true);
  setProperty("castle", "hidden", false);
}

// Visual effect to make it seem like a day has passed 
function nightTime(){
  
  setProperty("gameScreen", "background-color", rgb(44, 42, 79));
  
  setProperty("grass", "background-color", rgb(91, 199, 82));
  setProperty("moon", "hidden", false);
  
  setProperty("cloud1", "hidden", true);
  setProperty("cloud2", "hidden", true);
  setProperty("cloud3", "hidden", true);

}  

// MAIN SETUP ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Runs the filterRelavance function (if the debug commands is spinning, then the app is running)
filterRelavance(9356);

// Removes the user from the loading screen
startGameNow();
playSound("Cursed-Nintendo-Images-but-with-Super-Mario-Bros-music.mp3", true);

// Start button is clicked
onEvent("beginButton", "click", function(){
  
  // You are sent to the select difficulty screen
  playSound("sound://category_bell/vibrant_game_slot_machine_ding_1.mp3");
  setScreen("difficultyScreen");
});

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// You have chosen easy difficulty, Mario has high benzene resistance
onEvent("easyButton", "click", function(){
  
  transitionAssets();

  // Tells the program what element it needs to analyse from the dataset
  difficultyLevel = "Benzene";
  setText("statusArea", "Mario can withstand up to 7 µg/m³ of benzene a day");
});

// You have chosen intermediate difficulty, Mario is new to this pollutant
onEvent("midButton", "click", function(){
  
  transitionAssets();

  // Tells the program what element it needs to analyse from the dataset
  difficultyLevel = "Carbon Monoxide";
  setText("statusArea", "Mario can withstand up to 1 µg/m³ of CO a day");
});

// You have chosen hard difficulty, Titanium Dioxide is Mario's weakness
onEvent("intenseButton", "click", function(){
  
  transitionAssets();
  
  // Tells the program what element it needs to analyse from the dataset
  difficultyLevel = "Titanium Dioxide";
  setText("statusArea", "Mario can withstand up to 800 µg/m³ of titanium dioxide a day");
});

// Sends you back to the main page
onEvent("backButton", "click", function(){
  
  playSound("sound://category_bell/vibrant_game_slot_machine_ding_1.mp3");
  setScreen("mainTitle");
});

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

onEvent("outButton", "click", leftCastle);
onEvent("stayHomeButton", "click", stayedHome);

// WORKS CITED ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var documentation = "https://github.com/Larrieeee/Hackathon-COCO-M";
console.log("Documentation: " + documentation);

