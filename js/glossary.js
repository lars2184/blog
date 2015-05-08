$(document).ready(function(){

  initGlossary();
});

function initGlossary(){

  var glossaryDictionary = initGlossaryDictionary();
  var $glossaryList = $('#wordList');
  $glossaryList.html(" ");
  $.each(glossaryDictionary,function(index, entry){

    $glossaryList.append("<dt>" + entry.word + "</dt><dd>" + entry.definition + "</dd>");
  });

}

function initGlossaryDictionary(){

  var dictionary = [
    {word: "lorem", definition:"something greek"},
    {word: "ipsum", definition:"something else greek"},
    {word: "ipsum", definition:"something else greek"},
    {word: "ipsum", definition:"something else greek"},
    {word: "ipsum", definition:"something else greek"}
  ];

  return(dictionary);
}