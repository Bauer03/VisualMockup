import { ThemeManager } from './themeManager';

export function setupThemeToggle(buttonId: string): void {
    const button = document.getElementById(buttonId);
    if (!button) return;

    const themeManager = ThemeManager.getInstance();
    
    const updateButtonIcon = () => {
        const theme = themeManager.getCurrentTheme();
        button.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    };

    updateButtonIcon();

    button.addEventListener('click', () => {
        themeManager.toggleTheme();
        updateButtonIcon();
    });
}