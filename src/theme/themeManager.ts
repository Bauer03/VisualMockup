export type Theme = 'light' | 'dark';

export class ThemeManager {
    private static instance: ThemeManager;
    private mediaQuery: MediaQueryList;

    private constructor() {
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.mediaQuery.addEventListener('change', (e) => this.handleSystemThemeChange(e));
        
        // Set initial theme based on system preference or stored preference
        const storedTheme = localStorage.getItem('theme') as Theme | null;
        if (storedTheme) {
            this.setTheme(storedTheme);
        } else {
            this.setTheme(this.mediaQuery.matches ? 'dark' : 'light');
        }
    }

    public static getInstance(): ThemeManager {
        if (!ThemeManager.instance) {
            ThemeManager.instance = new ThemeManager();
        }
        return ThemeManager.instance;
    }

    private handleSystemThemeChange(e: MediaQueryListEvent): void {
        // Only update theme if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            this.setTheme(e.matches ? 'dark' : 'light');
        }
    }

    public toggleTheme(): void {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme') as Theme;
        const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.setTheme(newTheme);
        // Store user preference
        localStorage.setItem('theme', newTheme);
    }

    private setTheme(theme: Theme): void {
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);
        
        // Update all theme-specific classes
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }

    public getCurrentTheme(): Theme {
        return (document.documentElement.getAttribute('data-theme') as Theme) || 'light';
    }
}