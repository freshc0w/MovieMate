import { drawSections } from "./js/DOMFunctions/drawSections";
import addToggleAnimationFnc from "./js/UI/checkAnimation";
import addSubmitSearchFnc from "./js/UI/submitSearch";

initialisePage();

function initialisePage() {
    addSubmitSearchFnc();
    addToggleAnimationFnc();
}



// drawSections("pee mak");
