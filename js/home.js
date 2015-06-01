$(document).ready(function(){

  initHomeGlossary();
});

function initHomeGlossary(){

  // display 3 items from the glossary
  //displayGlossary(getGlossary(), $('#glossaryList'), 3);

  getGlossary(displayHomeGlossary);
}

function displayHomeGlossary(){

  displayGlossary(glossaryApigeeData, $('#glossaryList'), 3);
}