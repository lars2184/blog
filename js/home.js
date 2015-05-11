$(document).ready(function(){

  initHomeGlossary();
});

function initHomeGlossary(){

  var glossaryDictionary = initGlossaryDictionary();
  var $glossaryList = $('#glossaryList');
  $glossaryList.html(" ");
  $.each(glossaryDictionary,function(index, entry){

    if(index < 2){
      if(entry.url != ""){

      $glossaryList.append("<dt><a href='"+entry.url+"' target='blank'>" + entry.word + "</a></dt><dd>" + entry.definition + "</dd>");
    }else{
      $glossaryList.append("<dt>" + entry.word + "</dt><dd>" + entry.definition + "</dd>");
    }
    }
  });
}