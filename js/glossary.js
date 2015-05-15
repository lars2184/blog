$(document).ready(function(){

  initGlossary();
});

function initGlossary(){

  displayGlossary(getGlossary());

  $("#add-word-button").on("click", addWord);
  $("#reset-button").on("click", resetGlossary);
}

function resetGlossary(e){

  saveGlossary(initGlossaryDictionary());
  displayGlossary(getGlossary());
  e.preventDefault();
}

function addWord(e){

  var newWord = $("#new-word").val();
  var newWordDefinition = $("#new-word-definition").val();
  var entry = {word: newWord, definition: newWordDefinition, url:""};
  var existingGlossary = getGlossary();
  existingGlossary.unshift(entry);
  saveGlossary(existingGlossary);
  displayGlossary(getGlossary());
  $("#new-word").val("");
  $("#new-word-definition").val("");
  e.preventDefault();
}

function displayGlossary(glossaryData){

  var $glossaryList = $('#wordList');
  $glossaryList.html(" ");
  $.each(glossaryData,function(index, entry){

    if(entry.url != ""){

      $glossaryList.append("<dt><a href='"+entry.url+"' target='blank'>" + entry.word + "</a></dt><dd>" + entry.definition + "</dd>");
    }else{
      $glossaryList.append("<dt>" + entry.word + "</dt><dd>" + entry.definition + "</dd>");
    }
    
  });
}

function saveGlossary(glossaryData){

  localStorage.setItem('blogGlossary', JSON.stringify(glossaryData));
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

  var dictionary = [
  {word: "$.on()", definition:"Attach an event handler function for one or more events to the selected elements.",url:"http://api.jquery.com/on/"},
  {word: "$.html()", definition:"Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.",url:"https://api.jquery.com/html/"},
  {word: "$.text()", definition:"Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements.",url:"http://api.jquery.com/text/"},
    {word: "$.prepend()", definition:"Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.",url:"http://api.jquery.com/prepend/"},
    {word: "$.append()", definition:"Insert content, specified by the parameter, to the end of each element in the set of matched elements.",url:"http://api.jquery.com/append/"},
    {word: "$.after()", definition:"Insert content, specified by the parameter, after each element in the set of matched elements.",url:"http://api.jquery.com/after/"},
    {word: "$.before()", definition:"Insert content, specified by the parameter, before each element in the set of matched elements.",url:"http://api.jquery.com/before/"}
  ];

  return(dictionary);
}