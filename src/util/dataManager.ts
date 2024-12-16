import { OutputData } from '../types/types';
import { dbManager } from '../db/databaseManager';
import { 
    ModelSetupData, 
    RunDynamicsData, 
    ScriptData, 
    SelectedData, 
    atomType, 
    boundary, 
    potentialModel,
    simulationType
} from '../types/types';

export class DataManager {
    static updateOutputDisplay(data: OutputData): void {
        // Update basic measurements
        this.updateElement('temperature-sample', data.basic.temperature.sample);
        this.updateElement('temperature-average', data.basic.temperature.average);
        this.updateElement('pressure-sample', data.basic.pressure.sample);
        this.updateElement('pressure-average', data.basic.pressure.average);
        this.updateElement('volume-sample', data.basic.volume.sample);
        this.updateElement('volume-average', data.basic.volume.average);

        // Update energy measurements
        this.updateElement('total-energy-sample', data.energy.total.sample);
        this.updateElement('total-energy-average', data.energy.total.average);
        this.updateElement('kinetic-energy-sample', data.energy.kinetic.sample);
        this.updateElement('kinetic-energy-average', data.energy.kinetic.average);
        this.updateElement('potential-energy-sample', data.energy.potential.sample);
        this.updateElement('potential-energy-average', data.energy.potential.average);
    }

    private static updateElement(id: string, value: number): void {
        const element = document.getElementById(id);
        if (element) element.textContent = value.toString();
    }

    // collect current output data from UI
    static collectCurrentOutputData(): OutputData {
        return {
            basic: {
                temperature: {
                    sample: this.getElementValue('temperature-sample'),
                    average: this.getElementValue('temperature-average')
                },
                pressure: {
                    sample: this.getElementValue('pressure-sample'),
                    average: this.getElementValue('pressure-average')
                },
                volume: {
                    sample: this.getElementValue('volume-sample'),
                    average: this.getElementValue('volume-average')
                }
            },
            energy: {
                total: {
                    sample: this.getElementValue('total-energy-sample'),
                    average: this.getElementValue('total-energy-average')
                },
                kinetic: {
                    sample: this.getElementValue('kinetic-energy-sample'),
                    average: this.getElementValue('kinetic-energy-average')
                },
                potential: {
                    sample: this.getElementValue('potential-energy-sample'),
                    average: this.getElementValue('potential-energy-average')
                }
            }
        };
    }

    private static getElementValue(id: string): number {
        const element = document.getElementById(id);
        return element ? parseFloat(element.textContent || '0') : 0;
    }

    private static getElementValueAsString(id: string): string {
        const element = document.getElementById(id);
        return element ? element.textContent || '' : '';
    }

    static collectCurrentModelSetupData(): ModelSetupData {
        // Get select elements
        const atomTypeSelect = document.getElementById('AtomType') as HTMLSelectElement;
        const boundarySelect = document.getElementById('Boundary') as HTMLSelectElement;
        const potentialModelSelect = document.getElementById('PotentialModel') as HTMLSelectElement;

        // Get number inputs
        const numAtomsInput = document.getElementById('AtomCount') as HTMLInputElement;
        const atomicMassInput = document.getElementById('AtomicMass') as HTMLInputElement;

        // Optional potential parameters
        const sigmaInput = document.getElementById('sigma') as HTMLInputElement;
        const epsilonInput = document.getElementById('epsilon') as HTMLInputElement;

        // Build the ModelSetupData object
        const modelSetupData: ModelSetupData = {
            atomType: atomTypeSelect?.value as atomType || 'He',
            boundary: boundarySelect?.value as boundary || 'Fixed Walls',
            potentialModel: potentialModelSelect?.value as potentialModel || 'No Potential',
            numAtoms: parseInt(numAtomsInput?.value || '0'),
            atomicMass: parseFloat(atomicMassInput?.value || '0'),
        };

        // Only add potential parameters if they exist
        if (sigmaInput && epsilonInput) {
            modelSetupData.potentialParams = {
                sigma: parseFloat(sigmaInput.value),
                epsilon: parseFloat(epsilonInput.value)
            };
        }

        return modelSetupData;
    }

    static collectCurrentRunDynamicsData(): RunDynamicsData {
        // Get all input elements
        const simulationTypeSelect = document.getElementById('SimulationType') as HTMLSelectElement;
        const temperatureInput = document.getElementById('Temperature') as HTMLInputElement;
        const volumeInput = document.getElementById('Volume') as HTMLInputElement;
        const timeStepInput = document.getElementById('TimeStep') as HTMLInputElement;
        const stepCountInput = document.getElementById('NumberOfSteps') as HTMLInputElement;
        const intervalInput = document.getElementById('UpdateInterval') as HTMLInputElement;

        return {
            simulationType: simulationTypeSelect?.value as simulationType || 'Const-PT',
            temperature: parseFloat(temperatureInput?.value || '0'),
            volume: parseFloat(volumeInput?.value || '0'),
            timeStep: parseFloat(timeStepInput?.value || '0'),
            stepCount: parseInt(stepCountInput?.value || '0'),
            interval: parseFloat(intervalInput?.value || '0')
        };
    }

    static collectCurrentScriptData(): ScriptData {
        // Assuming there's a textarea or input for scripts
        const scriptInput = document.getElementById('script') as HTMLTextAreaElement;
        
        return {
            script: scriptInput?.value || ''
        };
    }

    static collectAllData(): SelectedData {
        return {
            ModelSetupData: this.collectCurrentModelSetupData(),
            RunDynamicsData: this.collectCurrentRunDynamicsData(),
            ScriptData: this.collectCurrentScriptData()
        };
    }

    // Helper method to validate numeric input
    private static validateNumericInput(value: string, defaultValue: number = 0): number {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? defaultValue : parsed;
    }
}