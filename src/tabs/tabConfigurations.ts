import { Tab } from '../types/tab.js';
import { createModelSetupContent } from '../content/modelSetup.js';
import { createOutputContent } from '../content/output.js';
import { createNotebookContent } from '../content/notebook.js';
import { createConfigurationContent } from '../content/configuration.js';
import { createRunDynamicsContent } from '../content/runDynamics.js';
import { createCommandScriptsContent } from '../content/commandScripts.js';
import { createGraphicsContent } from '../content/graphics.js';
import { buildSubstanceButton  } from '../content/buildSubstance.js';

export const topMenuTabs: Tab[] = [
    {
        id: 'model-setup',
        label: 'Model Setup',
        content: createModelSetupContent()
    },
    {
        id: 'run-dynamics',
        label: 'Run Dynamics',
        content: createRunDynamicsContent()
    },
    {
        id: 'command-scripts',
        label: 'Command Scripts',
        content: createCommandScriptsContent()
    },
    {
        id: 'graphics',
        label: 'Graphics',
        content: createGraphicsContent()
    }
];

export const bottomMenuTabs: Tab[] = [
    {
        id: 'output',
        label: 'Output',
        content: createOutputContent()
    },
    {
        id: 'notebook',
        label: 'Notebook',
        content: createNotebookContent()
    },
    {
        id: 'configuration',
        label: 'Configuration',
        content: createConfigurationContent()
    }
];