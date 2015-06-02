$(document).ready(function(){

  initGlossary();
});

var xhr = new XMLHttpRequest();
var glossaryFromFile;
var glossaryApigeeData;
var dataBeingSaved;
var blogClient = new Usergrid.Client({

  orgName: "larsj",
  appName: "sandbox",
  logging: true,
  buildCurl: true
});
var glossaryUUID;
var saveID = 0;

function initGlossary(){

  console.log("initGlossary 1.2");

  $("#add-word-button").on("click", addWord);
  $("#reset-button").on("click", resetGlossary);

  console.log("new glossary");
  
  //loadDefaultGlossaryData(displayGlossaryGlossary);

  getGlossary(displayGlossaryGlossary);
  
}



function displayGlossaryGlossary(){

  displayGlossary(glossaryApigeeData, $('#wordList'));
}

function sendAJAX() {
   xhr.send();
 }

function resetGlossary(e){

  saveID++;

  console.log("reset glossary: saveID = " + saveID);

  saveGlossary(initGlossaryDictionary(),glossaryReset);
  displayGlossary(initGlossaryDictionary(), $('#wordList'));
  e.preventDefault();
}

function glossaryReset(){

  console.log("----------------- glossary reset ------------------ saveID = "+saveID);

  // display updated data from server
  displayGlossary(glossaryApigeeData, $('#wordList'));
}

function addWord(e){

  saveID++;

  console.log("addWord: saveID = "+saveID);
  e.preventDefault();

  var newWord = $("#new-word").val();
  var newWordDefinition = $("#new-word-definition").val();
  var entry = {word: newWord, definition: newWordDefinition, url:""};
  var existingGlossary = glossaryApigeeData;
  existingGlossary.unshift(entry);
  
  // display updated data
  displayGlossary(existingGlossary, $('#wordList'));

  // save data to apigee
  saveGlossary(existingGlossary, glossarySaved);

  $("#new-word").val("");
  $("#new-word-definition").val("");
  
}

function glossarySaved(){

  console.log("----------------- glossary saved ------------------ saveID = "+saveID);

  // display updated data from server
  displayGlossary(glossaryApigeeData, $('#wordList'));
}

function displayGlossary(glossaryData, $container, numToDisplay){


  var $glossaryList = $container;
  $glossaryList.html(" ");

  $.each(glossaryData,function(index, entry){

    if(index < numToDisplay || numToDisplay === undefined){

      if(entry.url != ""){

        $glossaryList.append("<div class='glossary-word'><dt><a href='"+entry.url+"' target='blank'>" + entry.word + "</a></dt><dd>" + entry.definition + "</dd></div>");
      }else{
        $glossaryList.append("<div class='glossary-word'><dt>" + entry.word + "</dt><dd>" + entry.definition + "</dd></div>");
      }

    }
    
  });
}

function saveGlossary(glossaryData, callback){

  console.log("saveGlossary: save ---");

    dataBeingSaved = glossaryData;

    var options = {

      type: "glossary",
      words: dataBeingSaved,
      uuid: glossaryUUID
    }

    blogClient.createEntity(options, function(error, result){

      if(error){

        console.log("Error: "+error);

      }else{

        console.log("Result 2: "+result);

        console.log("Word = "+result.entities[0].words[0].word + " Def: " + result.entities[0].words[0].definition);

        console.log("dataBeingSaved[0].word = "+dataBeingSaved[0].word);
        console.log("result.entities[0].words[0].word = "+result.entities[0].words[0].word);

        if(JSON.stringify(dataBeingSaved) === JSON.stringify(result.entities[0].words)){

            // data is the same as local data

            glossaryApigeeData = result.entities[0].words;

        }else{

            // data is not the same as local data
        }

        //glossaryApigeeData = result.entities[0].words;

        callback();
      }
    });

  

  

  //localStorage.setItem('blogGlossary', JSON.stringify(glossaryData));
}

function getGlossary(callback){



  var options = {

    type: "glossary"
  }

  blogClient.getEntity(options, function(error, result){

    console.log("error: "+error+", result: "+result+", result.entities[0]: "+result.entities[0])

    if(error || result.entities[0] === undefined){

      console.log("Get Error: "+error);

      glossaryUUID = null;

      createGlossaryData(callback);

    }else{

      console.log("Get Result: "+result);

       glossaryUUID = result.entities[0].uuid;

       console.log("Get Result: glossaryUUID = "+glossaryUUID);

       glossaryApigeeData = result.entities[0].words;

       callback();

    }
  });

  // var blogGlossaryString = localStorage.getItem('blogGlossary');

  // if(blogGlossaryString === null){

  //   //init glossary
  //   return(initGlossaryDictionary());

  // }else{

  //   // return glossary
  //   return(JSON.parse(blogGlossaryString));
  // }
}

function createGlossaryData(callback){

  console.log("saveGlossary: create");

      var options = {

        type: "glossary",
        words: initGlossaryDictionary()
      }

      blogClient.createEntity(options, function(error, result){

        if(error){

          console.log("Error: "+error);

        }else{

          console.log("Result: "+result);

          console.log("Word = "+result.entities[0].words[0].word + " Def: " + result.entities[0].words[0].definition)

          glossaryUUID = result.entities[0].uuid;

          glossaryApigeeData = result.entities[0].words;

          callback();
        }
      });
}

function initGlossaryDictionary(){

  console.log("initGlossaryDictionary");

 // var dictionary = glossaryFromFile.dictionary;

  var dictionary = [
  {"word": "$.on()", "definition":"Attach an event handler function for one or more events to the selected elements.","url":"http://api.jquery.com/on/"},
  {"word": "$.html()", "definition":"Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.","url":"https://api.jquery.com/html/"},
  {"word": "$.text()", "definition":"Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements.","url":"http://api.jquery.com/text/"},
    {"word": "$.prepend()", "definition":"Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.","url":"http://api.jquery.com/prepend/"},
    {"word": "$.append()", "definition":"Insert content, specified by the parameter, to the end of each element in the set of matched elements.","url":"http://api.jquery.com/append/"},
    {"word": "$.after()", "definition":"Insert content, specified by the parameter, after each element in the set of matched elements.","url":"http://api.jquery.com/after/"},
    {"word": "$.before()", "definition":"Insert content, specified by the parameter, before each element in the set of matched elements.","url":"http://api.jquery.com/before/"}
  ];

  return(dictionary);
}