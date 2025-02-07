// content/notebook.ts
import { dbManager } from '../db/databaseManager';
import { DataManager } from '../util/dataManager';
import { SimulationRun } from '../types/types';

export const createNotebookContent = async (): Promise<HTMLElement> => {
    // Main container
    const content = document.createElement('div');
    content.className = 'flex flex-col px-3 gap-4 h-full';

    // Initialize database
    await dbManager.init();

    // Create clear all button
    const clearBtn = document.createElement('button');
    clearBtn.className = 
        `px-2 py-1 text-xs shadow-sm rounded font-light
        hover:bg-white dark:hover:bg-gray-800
        bg-gray-100 dark:bg-gray-700
        text-gray-800 dark:text-gray-200
        border border-white dark:border-gray-600
        transition-colors duration-200 items-center
        flex gap-1 self-end`;
    clearBtn.innerHTML = `
        <span>Clear All</span>
        <span class="material-icons text-sm">delete</span>
    `;
    const downloadBtn = document.createElement('button');
    downloadBtn.className = `
        px-2 py-1 text-xs shadow-sm rounded font-light
        hover:bg-white dark:hover:bg-gray-800
        bg-gray-100 dark:bg-gray-700
        text-gray-800 dark:text-gray-200
        border border-white dark:border-gray-600
        transition-colors duration-200 items-center
        flex gap-1 self-end`;
    downloadBtn.innerHTML = `
        <span>Download</span>
        <span class="material-icons text-sm">download</span>
    `;

    // Create a scrollable container for outputs
    const scrollableContainer = document.createElement('div');
    scrollableContainer.className = 'flex flex-col gap-2 overflow-y-auto h-[120px] pr-2';
    scrollableContainer.style.cssText = `
        scrollbar-width: thin;
        scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
    `;

    // Create outputs container
    const outputsContainer = document.createElement('div');
    outputsContainer.className = 'flex flex-col gap-2';

    // Create dialog for displaying detailed output data
    const dialog = document.createElement('div');
    dialog.className = `
        fixed inset-0 bg-black bg-opacity-50 
        flex items-center justify-center hidden
        z-50
    `;
    dialog.onclick = (e) => {
        if (e.target === dialog) {
            dialog.classList.add('hidden');
        }
    };

    const dialogContent = document.createElement('div');
    dialogContent.className = `
        bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
        p-6 rounded-lg shadow-xl 
        max-w-2xl w-full mx-4
        max-h-[80vh] overflow-y-auto
    `;
    dialog.appendChild(dialogContent);
    document.body.appendChild(dialog);

    const showOutputDetails = (output: SimulationRun, index: number) => {
        dialogContent.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-medium">Output ${index + 1} Details</h2>
                <button class="material-icons text-gray-300 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    close
                </button>
            </div>
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <div class="font-medium text-sm">Basic Measurements</div>
                    <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm pl-4">
                        <div>Temperature:</div>
                        <div>${output.outputData.basic.temperature.sample}K (avg: ${output.outputData.basic.temperature.average}K)</div>
                        <div>Pressure:</div>
                        <div>${output.outputData.basic.pressure.sample} atm (avg: ${output.outputData.basic.pressure.average} atm)</div>
                        <div>Volume:</div>
                        <div>${output.outputData.basic.volume.sample} L/mol (avg: ${output.outputData.basic.volume.average} L/mol)</div>
                    </div>
                </div>
                <div class="grid gap-2">
                    <div class="font-medium text-sm">Energy Measurements</div>
                    <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm pl-4">
                        <div>Total Energy:</div>
                        <div>${output.outputData.energy.total.sample} J/mol (avg: ${output.outputData.energy.total.average} J/mol)</div>
                        <div>Kinetic Energy:</div>
                        <div>${output.outputData.energy.kinetic.sample} J/mol (avg: ${output.outputData.energy.kinetic.average} J/mol)</div>
                        <div>Potential Energy:</div>
                        <div>${output.outputData.energy.potential.sample} J/mol (avg: ${output.outputData.energy.potential.average} J/mol)</div>
                    </div>
                </div>
            </div>
        `;
    
        dialogContent.querySelector('button')?.addEventListener('click', () => {
            dialog.classList.add('hidden');
        });
    
        dialog.classList.remove('hidden');
    };

    const loadOutputs = async () => {
        const outputs = await dbManager.getAllOutputs();
        outputsContainer.innerHTML = '';
        
        outputs.forEach((output, index) => {
            const element = document.createElement('div');
            element.className = `
                bg-white dark:bg-gray-800 p-2 rounded shadow
                flex justify-between items-center
                cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600
                transition-colors duration-200
            `;
            
            const info = document.createElement('div');
            info.className = 'text-sm flex-1';
            info.textContent = `Saved Output - ${new Date(output.timestamp).toLocaleString()}`;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'material-icons text-sm text-gray-500 hover:text-red-500 transition-colors duration-200 ml-2';
            deleteBtn.textContent = 'delete';
            deleteBtn.onclick = async (e) => {
                e.stopPropagation();
                e.preventDefault();
                
                try {
                    // debug
                    // console.log('Delete button clicked for output:', output);
                    // console.log('UID:', output.uid);
                    // console.log('UID type:', typeof output.uid);
                    // console.log('Full output object keys:', Object.keys(output));
                    // console.log('Output stringified then parsed:', JSON.parse(JSON.stringify(output)).uid);
                    
                    if (typeof output.uid !== 'number') {
                        throw new Error('Invalid UID type: ' + typeof output.uid);
                    }
                    
                    await dbManager.deleteOutput(Number(output.uid)); // Ensure number type
                    element.remove();
                    await loadOutputs();
                    
                } catch (error) {
                    console.error('Error deleting output:', error);
                    alert('Failed to delete output. Please try again.');
                }
            };
            
            element.appendChild(info);
            element.appendChild(deleteBtn);
            element.onclick = () => showOutputDetails(output, index);
            
            outputsContainer.appendChild(element);
        });
    };

    clearBtn.onclick = async () => {
        if (confirm('Are you sure you want to clear all outputs?')) {
            await dbManager.clearAllOutputs();
            await loadOutputs();
        }
    };

    downloadBtn.onclick = async () => {
        const outputs = await dbManager.getAllOutputs();
        if(outputs.length === 0) {
            alert("There's nothing to download right now! Try copying your simulation results to the notebook first.");
            return;
        }
        const csvContent = DataManager.exportSimulationData(outputs);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'simulationResults.csv';
        link.click();
    };

    const refreshNotebookListener = async (e: Event) => {
        await loadOutputs();
    };

    document.addEventListener('output-copied', refreshNotebookListener);

    let notebookControls = document.createElement('div');
    notebookControls.className = 'flex justify-end items-center gap-4';
    notebookControls.appendChild(clearBtn);
    notebookControls.appendChild(downloadBtn);
    content.appendChild(notebookControls);

    scrollableContainer.appendChild(outputsContainer);
    content.appendChild(scrollableContainer);

    await loadOutputs();
    return content;
};