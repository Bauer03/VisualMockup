import { buildSubstanceButton } from './content/buildSubstance.js';
import { TabSystem } from './tabSystem.js';
import { topMenuTabs, bottomMenuTabs } from './tabs/tabConfigurations.js';
import { setupThemeToggle } from './theme/themeToggle.js';
// creating tabs
const topMenu = new TabSystem('top-menu-container', topMenuTabs);
const bottomMenu = new TabSystem('bottom-menu-container', bottomMenuTabs);
const bottomRight = document.getElementById('bottom-right-menu-container');
bottomRight?.appendChild(buildSubstanceButton());
setupThemeToggle('theme-toggle');
//# sourceMappingURL=main.js.map