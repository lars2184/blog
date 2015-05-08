$(document).ready(function(){

  initHomeGlossary();
});

function initHomeGlossary(){

  var glossaryDictionary = initGlossaryDictionary();
  var $glossaryList = $('#glossaryList');
  $glossaryList.html(" ");
  $.each(glossaryDictionary,function(index, entry){

    if(index < 2){
      $glossaryList.append("<dt>" + entry.word + "</dt><dd>" + entry.definition + "</dd>");
    }
  });
}