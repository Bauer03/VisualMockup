export class ThemeManager {
    constructor() {
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.mediaQuery.addEventListener('change', (e) => this.handleSystemThemeChange(e));
        // Set initial theme based on system preference or stored preference
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            this.setTheme(storedTheme);
        }
        else {
            this.setTheme(this.mediaQuery.matches ? 'dark' : 'light');
        }
    }
    static getInstance() {
        if (!ThemeManager.instance) {
            ThemeManager.instance = new ThemeManager();
        }
        return ThemeManager.instance;
    }
    handleSystemThemeChange(e) {
        // Only update theme if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            this.setTheme(e.matches ? 'dark' : 'light');
        }
    }
    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        // Store user preference
        localStorage.setItem('theme', newTheme);
    }
    setTheme(theme) {
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);
        // Update all theme-specific classes
        if (theme === 'dark') {
            html.classList.add('dark');
        }
        else {
            html.classList.remove('dark');
        }
    }
    getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }
}
//# sourceMappingURL=themeManager.js.map