export const createThemeButton = (): HTMLElement => {
    const button = document.createElement('button');
    button.id = 'theme-toggle';
    button.className = `
        material-icons absolute shadow-sm -top-14 right-0 text-3xl bg-white dark:bg-gray-800
        rounded text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors 
        duration-200 h-10 w-10 flex items-center justify-center`;
    button.innerHTML = 'dark_mode';
    return button;
}