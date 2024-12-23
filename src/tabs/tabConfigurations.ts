import { Tab } from '../types/types';
import { createModelSetupContent } from '../content/modelSetup';
import { createOutputContent } from '../content/output';
import { createNotebookContent } from '../content/notebook';
import { createRunDynamicsContent } from '../content/runDynamics';
import { createCommandScriptsContent } from '../content/commandScripts';

export const topMenuTabs: Tab[] = [
    {
        id: 'model-setup',
        label: 'Model Setup',
        content: createModelSetupContent(),
        materialIcon: "settings"
    },
    {
        id: 'run-dynamics',
        label: 'Run Dynamics',
        content: createRunDynamicsContent(),
        materialIcon: "play_arrow"
    },
    {
        id: 'command-scripts',
        label: 'Scripts',
        content: createCommandScriptsContent(),
        materialIcon: "code"
    },
];

// Initialize with empty content, then update asynchronously
export let bottomMenuTabs: Tab[] = [];

// Initialize the tabs
Promise.all([createOutputContent(), createNotebookContent()]).then(([outputContent, notebookContent]) => {
    bottomMenuTabs = [
        {
            id: 'output',
            label: 'Output',
            content: outputContent,
            materialIcon: "output"
        },
        {
            id: 'notebook',
            label: 'Notebook',
            content: notebookContent,
            materialIcon: "edit_note"
        }
    ];
});