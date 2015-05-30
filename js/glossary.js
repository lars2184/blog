$(document).ready(function(){

  initGlossary();
});

var xhr = new XMLHttpRequest();
var glossaryFromFile;
var blogClient = new Usergrid.Client({

  orgName: "larsj",
  appName: "sandbox",
  logging: true,
  buildCurl: true
});

function initGlossary(){

  

  $("#add-word-button").on("click", addWord);
  $("#reset-button").on("click", resetGlossary);

  console.log("new glossary");
  
  loadDefaultGlossaryData(displayGlossaryGlossary);
  
}

function displayGlossaryGlossary(){

  displayGlossary(getGlossary(), $('#wordList'));
}

function loadDefaultGlossaryData(callback){

  xhr.onreadystatechange = function () {
     if (xhr.readyState === 4) {
       console.log("result = "+xhr.responseText);

       glossaryFromFile = JSON.parse(xhr.responseText);
       //glossaryFromFile = xhr.responseText;

       console.log("glossaryFromFile.dictionary = " + glossaryFromFile.dictionary);

       //glossaryFromFile.dictionary

       //displayGlossary(getGlossary(), $('#wordList'));

       callback();
     }
  };
  
  xhr.open('GET', 'js/glossaryData.js');

  sendAJAX();
}

function sendAJAX() {
   xhr.send();
 }

function resetGlossary(e){

  saveGlossary(initGlossaryDictionary());
  displayGlossary(getGlossary(), $('#wordList'));
  e.preventDefault();
}

function addWord(e){

  var newWord = $("#new-word").val();
  var newWordDefinition = $("#new-word-definition").val();
  var entry = {word: newWord, definition: newWordDefinition, url:""};
  var existingGlossary = getGlossary();
  existingGlossary.unshift(entry);
  saveGlossary(existingGlossary);
  displayGlossary(getGlossary(), $('#wordList'));
  $("#new-word").val("");
  $("#new-word-definition").val("");
  e.preventDefault();
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

function saveGlossary(glossaryData){

  var options = {

    type: "glossary",
    words: glossaryData
  }

  blogClient.createEntity(options, function(error, result){

    if(error){

      console.log("Error: "+error);

    }else{

      console.log("Result: "+result);

      console.log("Word = "+result.entities[0].words[0].word + " Def: " + result.entities[0].words[0].definition)
    }
  });

  //localStorage.setItem('blogGlossary', JSON.stringify(glossaryData));
}

function getGlossary(){

  var blogGlossaryString = localStorage.getItem('blogGlossary');

  if(blogGlossaryString === null){

    //init glossary
    return(initGlossaryDictionary());

  }else{

    // return glossary
    return(JSON.parse(blogGlossaryString));
  }
}

function initGlossaryDictionary(){

  console.log("initGlossaryDictionary");

  var dictionary = glossaryFromFile.dictionary;

  // var dictionary = [
  // {word: "$.on()", definition:"Attach an event handler function for one or more events to the selected elements.",url:"http://api.jquery.com/on/"},
  // {word: "$.html()", definition:"Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.",url:"https://api.jquery.com/html/"},
  // {word: "$.text()", definition:"Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements.",url:"http://api.jquery.com/text/"},
  //   {word: "$.prepend()", definition:"Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.",url:"http://api.jquery.com/prepend/"},
  //   {word: "$.append()", definition:"Insert content, specified by the parameter, to the end of each element in the set of matched elements.",url:"http://api.jquery.com/append/"},
  //   {word: "$.after()", definition:"Insert content, specified by the parameter, after each element in the set of matched elements.",url:"http://api.jquery.com/after/"},
  //   {word: "$.before()", definition:"Insert content, specified by the parameter, before each element in the set of matched elements.",url:"http://api.jquery.com/before/"}
  // ];

  return(dictionary);
}