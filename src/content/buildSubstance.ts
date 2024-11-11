import { wait } from '../util/wait.js';

export const buildSubstanceButton = (): HTMLElement => {
    const container = document.createElement('div');
    container.className = 'flex justify-end';
    
    const button = document.createElement('button');
    button.className = 'px-4 py-2 shadow-sm rounded uppercase bg-blue-200 dark:bg-blue-800 hover:bg-blue-300 dark:hover:bg-blue-700 text-gray-800 dark:text-gray-200 transition-colors duration-200';
    button.textContent = 'Build Substance';
    button.onclick = async () => {
        console.log('Building Substance');
        button.classList.add('animate-bounce');
        await wait(500);
        button.classList.remove('animate-bounce');
        console.log('Substance Built');
        button.textContent = 'Discard Substance';
    };
    
    container.appendChild(button);
    return container;
};