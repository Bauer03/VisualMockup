import { Tab } from '../types/types';
import { createModelSetupContent } from '../content/modelSetup';
import { createOutputContent } from '../content/output';
import { createNotebookContent } from '../content/notebook';
import { createRunDynamicsContent } from '../content/runDynamics';
import { createCommandScriptsContent } from '../content/commandScripts';

export async function getTopMenuTabs(): Promise<Tab[]> {
    const commandScriptsContent = await createCommandScriptsContent();
    
    return [
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
            content: commandScriptsContent,
            materialIcon: "code"
        },
    ];
}

export async function getBottomMenuTabs(): Promise<Tab[]> {
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
}