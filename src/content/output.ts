import { DataManager } from '../util/dataManager';

export const createOutputContent = (): HTMLElement => {
    const content = document.createElement("div");
    content.className = "grid px-3 gap-2 min-h-[165px] content-start";

    // header with tabs and copy button 
    const headerHtml = `
        <div class="flex justify-between items-center border-b dark:border-gray-600">
            <div class="flex gap-2">
                <button id="basic-tab"
                    class="px-3 py-1 font-light hover:bg-gray-100 dark:hover:bg-gray-700 
                    transition-colors duration-200 border-b-2 border-blue-400">
                    Basic
                </button>
                <button id="energy-tab"
                    class="px-3 py-1 font-light hover:bg-gray-100 dark:hover:bg-gray-700 
                    transition-colors duration-200 border-b-2 border-transparent">
                    Energy
                </button>
                <button id="time-tab"
                    class="px-3 py-1 font-light hover:bg-gray-100 dark:hover:bg-gray-700 
                    transition-colors duration-200 border-b-2 border-transparent">
                    Time
                </button>
            </div>
            <button 
                id="copy-notebook"
                class="text-xs shadow-sm rounded font-light
                hover:bg-white dark:hover:bg-gray-800
                bg-gray-100 dark:bg-gray-700
                text-gray-800 dark:text-gray-200
                border border-white dark:border-gray-600
                transition-colors duration-200 items-center
                flex gap-1 px-3 py-2 mb-1">
                <span>Copy to Notebook</span>
                <span class="material-icons text-xs">content_copy</span>
            </button>
        </div>
    `;

    // table sections
    const tableHtml = `
        <div class="overflow-hidden">
            <div id="basic-content">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="border-b dark:border-gray-600">
                            <th class="text-left py-1">Property</th>
                            <th class="text-right px-2 w-16">Sample</th>
                            <th class="text-right px-2 w-16">Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b dark:border-gray-600">
                            <td class="text-left py-1 whitespace-nowrap">Temperature (K)</td>
                            <td id="temperature-sample" class="text-right w-16">20</td>
                            <td id="temperature-average" class="text-right w-16">20</td>
                        </tr>
                        <tr class="border-b dark:border-gray-600">
                            <td class="text-left py-1 whitespace-nowrap">Pressure (atm)</td>
                            <td id="pressure-sample" class="text-right w-16">20</td>
                            <td id="pressure-average" class="text-right w-16">20</td>
                        </tr>
                        <tr class="border-b dark:border-gray-600">
                            <td class="text-left py-1 whitespace-nowrap">Volume (L/mol)</td>
                            <td id="volume-sample" class="text-right w-16">20</td>
                            <td id="volume-average" class="text-right w-16">20</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="energy-content" class="hidden">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="border-b dark:border-gray-600">
                            <th class="text-left py-1">Property</th>
                            <th class="text-right px-2 w-16">Sample</th>
                            <th class="text-right px-2 w-16">Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b dark:border-gray-600">
                            <td class="text-left py-1 whitespace-nowrap">Total Energy (J/mol)</td>
                            <td id="total-energy-sample" class="text-right w-16">20</td>
                            <td id="total-energy-average" class="text-right w-16">20</td>
                        </tr>
                        <tr class="border-b dark:border-gray-600">
                            <td class="text-left py-1 whitespace-nowrap">Kinetic Energy (J/mol)</td>
                            <td id="kinetic-energy-sample" class="text-right w-16">20</td>
                            <td id="kinetic-energy-average" class="text-right w-16">20</td>
                        </tr>
                        <tr class="border-b dark:border-gray-600">
                            <td class="text-left py-1 whitespace-nowrap">Potential Energy (J/mol)</td>
                            <td id="potential-energy-sample" class="text-right w-16">20</td>
                            <td id="potential-energy-average" class="text-right w-16">20</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="time-content" class="hidden">
                <div class="grid grid-cols-2 gap-8 text-sm">
                    <div class="grid gap-2">
                        <div class="flex gap-4 justify-between">
                            <span>Time (ps)</span>
                            <span id="current-time" class="w-16 text-right">20</span>
                        </div>
                        <div class="flex gap-4 justify-between">
                            <span>Total Time (ps)</span>
                            <span id="total-time" class="w-16 text-right">20</span>
                        </div>
                    </div>
                    <div class="grid gap-2">
                        <div class="flex gap-4 justify-between">
                            <span>Run Time</span>
                            <span id="run-time" class="w-16 text-right">20</span>
                        </div>
                        <div class="flex gap-4 justify-between">
                            <span>Total Time</span>
                            <span id="total-runtime" class="w-16 text-right">20</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    content.innerHTML = headerHtml + tableHtml;

    const basicTab = content.querySelector('#basic-tab') as HTMLButtonElement;
    const energyTab = content.querySelector('#energy-tab') as HTMLButtonElement;
    const timeTab = content.querySelector('#time-tab') as HTMLButtonElement;
    const basicContent = content.querySelector('#basic-content') as HTMLDivElement;
    const energyContent = content.querySelector('#energy-content') as HTMLDivElement;
    const timeContent = content.querySelector('#time-content') as HTMLDivElement;

    const hideAllTabs = () => {
        [basicContent, energyContent, timeContent].forEach(content => content.classList.add('hidden'));
        [basicTab, energyTab, timeTab].forEach(tab => {
            tab.classList.remove('border-blue-400');
            tab.classList.add('border-transparent');
        });
    };

    basicTab.addEventListener('click', () => {
        hideAllTabs();
        basicTab.classList.add('border-blue-400');
        basicTab.classList.remove('border-transparent');
        basicContent.classList.remove('hidden');
    });

    energyTab.addEventListener('click', () => {
        hideAllTabs();
        energyTab.classList.add('border-blue-400');
        energyTab.classList.remove('border-transparent');
        energyContent.classList.remove('hidden');
    });

    timeTab.addEventListener('click', () => {
        hideAllTabs();
        timeTab.classList.add('border-blue-400');
        timeTab.classList.remove('border-transparent');
        timeContent.classList.remove('hidden');
    });

    const savedData = DataManager.loadOutputData();
    if(savedData) {
        DataManager.updateOutputDisplay(savedData);
    }

    const copyButton = content.querySelector('#copy-notebook') as HTMLButtonElement;
    copyButton.addEventListener('click', () => {
        console.log('Attempting to copy data to notebook');
        const currentData = DataManager.collectCurrentOutputData();
        DataManager.saveOutputData(currentData);
        // dispatchEvent(new CustomEvent('copy-notebook'));
    });

    return content;
};