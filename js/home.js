$(document).ready(function(){

  initHomeGlossary();
});

function initHomeGlossary(){

  // display 3 items from the glossary
  //displayGlossary(getGlossary(), $('#glossaryList'), 3);

  loadDefaultGlossaryData(displayHomeGlossary);
}

function displayHomeGlossary(){

  displayGlossary(getGlossary(), $('#glossaryList'), 3);
}