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

export const getBottomMenuTabs = async (): Promise<Tab[]> => {
    const [outputContent, notebookContent] = await Promise.all([
        createOutputContent(),
        createNotebookContent()
    ]);
    
    return [
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
};