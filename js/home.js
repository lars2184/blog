$(document).ready(function(){

  initHomeGlossary();
});

function initHomeGlossary(){

  // display 3 items from the glossary
  displayGlossary(getGlossary(), $('#glossaryList'), 3);
}