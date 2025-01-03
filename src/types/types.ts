export interface Tab {
    id: string;
    label: string;
    content: HTMLElement | (() => HTMLElement);
    materialIcon?: string;
    onDataReceived?: (data: string) => void; 
}

export interface OutputData {
    basic: {
        temperature: {
            sample: number;
            average: number;
        };
        pressure: {
            sample: number;
            average: number;
        };
        volume: {
            sample: number;
            average: number;
        };
    };
    energy: {
        total: {
            sample: number;
            average: number;
        };
        kinetic: {
            sample: number;
            average: number;
        };
        potential: {
            sample: number;
            average: number;
        };
    };
}

// types here make sure i'm not passing in wrong data & for autocompletion
export type atomType = "He" | "Ne" | "Ar" | "Kr" | "Xe" | "User";
export type boundary = "Fixed Walls" | "Periodic";
export type potentialModel = "Lennard-Jones" | "No Potential" | "Soft Sphere";
export interface ModelSetupData {
    atomType: atomType;
    boundary: boundary;
    potentialModel: potentialModel;
    numAtoms: number;
    atomicMass: number;
    potentialParams?: {
        sigma?: number;
        epsilon?: number;
    };
}

export type simulationType = "Const-PT" | "Const-VT";
export interface RunDynamicsData {
    simulationType: simulationType;
    temperature: number;
    volume: number;
    timeStep: number;
    stepCount: number;
    interval: number;
}

export type scriptData = string;
export interface ScriptData {
    script: scriptData;
}

export interface SelectedData {
    ModelSetupData: ModelSetupData,
    RunDynamicsData: RunDynamicsData,
    ScriptData:ScriptData;
};

type sign = "+" | "-";
type rotationAxis = "x" | "y" | "z";
export type rotateOpx = {
    rotationAxis: rotationAxis;
    sign: sign;
}

export interface SimulationRun {
    runNumber: number;
    timestamp: string;
    outputData: OutputData;
    setupData: ModelSetupData;
    runData: RunDynamicsData;
}