import { createModelSetupContent } from '../content/modelSetup.js';
import { createOutputContent } from '../content/output.js';
import { createNotebookContent } from '../content/notebook.js';
import { createConfigurationContent } from '../content/configuration.js';
import { createRunDynamicsContent } from '../content/runDynamics.js';
import { createCommandScriptsContent } from '../content/commandScripts.js';
import { createGraphicsContent } from '../content/graphics.js';
export const topMenuTabs = [
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
    {
        id: 'graphics',
        label: 'Graphics',
        content: createGraphicsContent(),
        materialIcon: "image"
    }
];
export const bottomMenuTabs = [
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
    },
    {
        id: 'configuration',
        label: 'Configuration',
        content: createConfigurationContent(),
        materialIcon: "tune"
    }
];
function saveData(data) {
    return;
    // use indexedDB to save data locally.
}
//# sourceMappingURL=tabConfigurations.js.map