import { buildSubstanceButton } from './content/buildSubstance.js';
import { TabSystem } from './tabs/tabSystem.js';
import { topMenuTabs, bottomMenuTabs } from './tabs/tabConfigurations.js';
import { setupThemeToggle } from './theme/themeToggle.js';

// creating tabs
const topMenu = new TabSystem('top-menu-container', topMenuTabs);
const bottomMenu = new TabSystem('bottom-menu-container', bottomMenuTabs);

const bottomRight = document.getElementById('bottom-right-menu-container');
if(bottomRight) bottomRight.appendChild(buildSubstanceButton());
else console.log('Could not find bottom right menu container - Build Substance button not added');

setupThemeToggle('theme-toggle');