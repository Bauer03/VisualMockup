import { dbManager } from '../db/databaseManager';
import { 
    ModelSetupData, 
    RunDynamicsData, 
    ScriptData, 
    InputData,
    OutputData,
    SimulationRun,
    atomType, 
    boundary, 
    potentialModel,
    simulationType,
} from '../types/types';
import { log } from 'three/webgpu';

export class DataManager {
    static simulationRun: SimulationRun;
    static InputData: InputData;
    static OutputData: OutputData;
    static ScriptData: ScriptData;
    // do i need a boolean to check if simulation is running?
    // what about a boolean for simulationrun saved? hmm. i'll sleep on it and it may come to me in a dream

    static updateOutputDisplay(data: OutputData): void {
        // check data exists
        if(data === undefined) {
            console.warn('data is undefined');
            return;
        }
        if(data.basic === undefined) {
            console.warn('data.basic is undefined');
            return;
        }
        if(data.basic.temperature.sample !== undefined) {
            this.updateElement('temperature-sample', data.basic.temperature.sample);
        }
        if(data.basic.temperature.average !== undefined) {
            this.updateElement('temperature-average', data.basic.temperature.average);
        }
        if(data.basic.pressure.sample !== undefined) {
            this.updateElement('pressure-sample', data.basic.pressure.sample);
        }
        if(data.basic.pressure.average !== undefined) {
            this.updateElement('pressure-average', data.basic.pressure.average);
        }
        if(data.basic.volume.sample !== undefined) {
            this.updateElement('volume-sample', data.basic.volume.sample);
        }
        if(data.basic.volume.average !== undefined) {
            this.updateElement('volume-average', data.basic.volume.average);
        }

        // Update energy measurements
        this.updateElement('total-energy-sample', data.energy.total.sample);
        this.updateElement('total-energy-average', data.energy.total.average);
        this.updateElement('kinetic-energy-sample', data.energy.kinetic.sample);
        this.updateElement('kinetic-energy-average', data.energy.kinetic.average);
        this.updateElement('potential-energy-sample', data.energy.potential.sample);
        this.updateElement('potential-energy-average', data.energy.potential.average);
    }

    /**
     * Updates the text content of an element with the given id using the given value
     */
    private static updateElement(id: string, value: number): void {
        const element = document.getElementById(id);
        if (element) element.textContent = value.toString();
    }

    /**
     * Searches the DOM for the current output data and returns it as an object
     */
    static collectOutputData(): OutputData {
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

    static collectSelectedData(): InputData {
        return {
            ModelSetupData: this.collectCurrentModelSetupData(),
            RunDynamicsData: this.collectCurrentRunDynamicsData(),
            ScriptData: this.ScriptData
        };
    }

    private static getElementValue(id: string): number {
        const element = document.getElementById(id);
        return element ? parseFloat(element.textContent || '0') : 0;
    }

    // private static getElementValueAsString(id: string): string {
    //     const element = document.getElementById(id);
    //     return element ? element.textContent || '' : '';
    // }

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
        const simulationTypeSelect = document.getElementById('SimulationType') as HTMLSelectElement;
        const temperatureInput = document.getElementById('Temperature') as HTMLInputElement;
        const volumeInput = document.getElementById('Volume') as HTMLInputElement;
        const timeStepInput = document.getElementById('TimeStep') as HTMLInputElement;
        const stepCountInput = document.getElementById('NumberOfSteps') as HTMLInputElement;
        const intervalInput = document.getElementById('UpdateInterval') as HTMLInputElement;

        return {
            simulationType: simulationTypeSelect?.value as simulationType || 'Const-PT',
            initialTemperature: parseFloat(temperatureInput?.value || '0'),
            initialVolume: parseFloat(volumeInput?.value || '0'),
            timeStep: parseFloat(timeStepInput?.value || '0'),
            stepCount: parseInt(stepCountInput?.value || '0'),
            interval: parseFloat(intervalInput?.value || '0')
        };
    }

    /**
     * Gets the current simulation run from the UI. By default, it will save the run to the database.
     */
    static async getCurrentSimulationRun(outputData: OutputData, inputData: InputData, saveToDB: boolean = true): Promise<SimulationRun> {
        const run: SimulationRun = {
            uid: (Date.now()*17),
            runNumber: 0o1,
            timestamp: new Date().toISOString(),
            outputData,
            inputData
        };
        if(saveToDB) {
            await dbManager.addOutput(run);
        }
        return run;
    }

    /**
     * Exports the simulation data to a CSV string.
     */
    static exportSimulationData(data: SimulationRun[]): string {
        console.log(data);
        const headers = [
            'UID',
            'Run Number',
            'Timestamp',
            'Atom Type',
            'Number of Atoms',
            'Boundary Type',
            'Simulation Type',
            'Initial Temperature (K)',
            'Initial Volume (L/mol)',
            'Time Steps (s)', 
            'Number of Steps',
            'Update Interval (s)',
            'Sample Temperature (K)',
            'Avg Temperature (K)',
            'Sample Pressure (atm)',
            'Avg Pressure (atm)',
            'Sample Volume (L/mol)',
            'Avg Volume (L/mol)',
            'Sample Total Energy (J/mol)',
            'Avg Total Energy (J/mol)',
            'Sample Kinetic Energy (J/mol)',
            'Avg Kinetic Energy (J/mol)',
            'Sample Potential Energy (J/mol)',
            'Avg Potential Energy (J/mol)',
        ].join(','); 

        const rows = data.map(run => {
            return [
                run.uid,
                run.runNumber,
                run.timestamp,
                run.inputData.ModelSetupData.atomType,
                run.inputData.ModelSetupData.numAtoms,
                run.inputData.ModelSetupData.boundary,
                run.inputData.RunDynamicsData.simulationType,
                run.inputData.RunDynamicsData.initialTemperature,
                run.inputData.RunDynamicsData.initialVolume,
                run.inputData.RunDynamicsData.timeStep,
                run.inputData.RunDynamicsData.stepCount,
                run.inputData.RunDynamicsData.interval,
                run.outputData.basic.temperature.sample,
                run.outputData.basic.temperature.average,
                run.outputData.basic.pressure.sample,
                run.outputData.basic.pressure.average,
                run.outputData.basic.volume.sample,
                run.outputData.basic.volume.average,
                run.outputData.energy.total.sample,
                run.outputData.energy.total.average,
                run.outputData.energy.kinetic.sample,
                run.outputData.energy.kinetic.average,
                run.outputData.energy.potential.sample,
                run.outputData.energy.potential.average
            ].join(',');
        });
        
        console.log(rows);
        return [headers, ...rows].join('\n');
    }
}