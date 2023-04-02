import { drawSections } from "./js/DOMFunctions/drawSections";
import addToggleAnimationFnc from "./js/UI/checkAnimation";
import addSubmitSearchFnc from "./js/UI/submitSearch";

initialisePage();
drawSections("Game Of Thrones");

function initialisePage() {
    addSubmitSearchFnc();
    addToggleAnimationFnc();
}



