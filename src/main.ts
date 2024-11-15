import { buildSubstanceSection } from './content/buildSubstance.js';
import { TabSystem } from './tabs/tabSystem.js';
import { topMenuTabs, bottomMenuTabs } from './tabs/tabConfigurations.js';
import { setupThemeToggle } from './theme/themeToggle.js';

// creating tabs
const topMenu = new TabSystem('top-menu-container', topMenuTabs);
const bottomMenu = new TabSystem('bottom-menu-container', bottomMenuTabs);

const bottomRight = document.getElementById('bottom-right-menu-container');
if(bottomRight) {
    // bottomRight.appendChild(buildSubstanceSection());
    bottomRight.innerHTML = buildSubstanceSection().innerHTML;
    bottomRight.className = "flex justify-between items-center content-center gap-4 bg-gray-100 dark:bg-gray-700 rounded p-4 shadow";
}
else console.log('Could not find bottom right menu container - Build Substance button not added');

setupThemeToggle('theme-toggle');