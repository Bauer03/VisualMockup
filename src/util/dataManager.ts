import { 
    ModelSetupData, 
    RunDynamicsData, 
    ScriptData, 
    InputData,
    OutputData,
    SimulationRun,
} from '../types/types';
import { SimulationManager } from '../simulation/simulationManager';

const defaultModelData: ModelSetupData = {
    atomType: 'He',
    boundary: 'Fixed Walls',
    potentialModel: 'NoPotential',
    numAtoms: 1,
    atomicMass: 1,
    potentialParams: {
        sigma: 1,
        epsilon: 1
    }
};

const defaultRunDynamicsData: RunDynamicsData = {
    simulationType: 'ConstPT',
    initialTemperature: 0,
    initialVolume: 0,
    timeStep: 0,
    stepCount: 0,
    interval: 0
};

const defaultScriptData: ScriptData = 1;

const defaultOutputData: OutputData = {
    basic: {
        temperature: { sample: 0, average: 0 },
        pressure: { sample: 0, average: 0 },
        volume: { sample: 0, average: 0 }
    },
    energy: {
        total: { sample: 0, average: 0 },
        kinetic: { sample: 0, average: 0 },
        potential: { sample: 0, average: 0 }
    }
};

export class DataManager {
    private static counter = 0;
    static modelSetupData: ModelSetupData = defaultModelData;
    static runDynamicsData: RunDynamicsData = defaultRunDynamicsData;
    static scriptData: ScriptData = defaultScriptData;
    static modelSetupModified = false;
    static runDynamicsModified = false;
    static scriptModified = false;
    static inputData = {
        ModelSetupData: defaultModelData,
        RunDynamicsData: defaultRunDynamicsData,
        ScriptData: defaultScriptData
    };
    static outputData: OutputData = defaultOutputData; // ... i'll figure this out later don't as
    static simulationManager: SimulationManager | null = null;

    /**
     * Generates a unique ID combining timestamp and counter
     * Format: <timestamp><counter> as a number
     */
    private static generateUID(): number {
        const timestamp = Date.now();
        this.counter = (this.counter + 1) % 1000; // Reset at 1000 to keep numbers manageable
        return Number(`${timestamp}${this.counter.toString().padStart(3, '0')}`);
    }

    static updateOutputDisplay(data: OutputData): void {
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

    static getCurrentSimulationRun(): SimulationRun {
        return {
            uid: this.generateUID(),
            runNumber: 0o1,
            timestamp: new Date().toISOString(),
            outputData: this.collectOutputData(),
            inputData: this.collectInputData()
        };
    }

    static collectOutputData(): OutputData {
        if(this.outputData === undefined) {
            alert("No output data to collect!");
            return defaultOutputData
        }
        return this.outputData;
    }

    static collectInputData(): InputData {
        return {
            ModelSetupData: this.collectCurrentModelSetupData(),
            RunDynamicsData: this.collectCurrentRunDynamicsData(),
            ScriptData: this.scriptData
        };
    }

    static collectCurrentModelSetupData(): ModelSetupData {
        this.modelSetupData = {
            atomType: this.modelSetupData.atomType,
            boundary: this.modelSetupData.boundary,
            potentialModel: this.modelSetupData.potentialModel,
            numAtoms: this.modelSetupData.numAtoms,
            atomicMass: this.modelSetupData.atomicMass,
            potentialParams: this.modelSetupData.potentialParams
        }
        return this.modelSetupData;
    }

    static collectCurrentRunDynamicsData(): RunDynamicsData {
        this.runDynamicsData = {
            simulationType: this.runDynamicsData.simulationType,
            initialTemperature: this.runDynamicsData.initialTemperature,
            initialVolume: this.runDynamicsData.initialVolume,
            timeStep: this.runDynamicsData.timeStep,
            stepCount: this.runDynamicsData.stepCount,
            interval: this.runDynamicsData.interval
        }
        return this.runDynamicsData;
    }

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
       
        return [headers, ...rows].join('\n');
    }
}