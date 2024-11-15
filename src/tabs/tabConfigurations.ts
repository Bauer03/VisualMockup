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

export const bottomMenuTabs: Tab[] = [
    {
        id: 'output',
        label: 'Output',
        content: createOutputContent(),
        materialIcon: "output"
    },
    {
        id: 'notebook',
        label: 'Notebook',
        content: createNotebookContent(),
        materialIcon: "edit_note"
    }
];