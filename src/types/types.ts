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
export interface ModelSetupData {
    atomType: string;
    boundary: string;
    potentialModel: string;
    numAtoms: number;
    atomicMass: number;
    potentialParams?: {
        sigma?: number;
        epsilon?: number;
    };
}