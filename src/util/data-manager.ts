import { OutputData, ModelSetupData } from '../types/types.js';

export class DataManager {
    private static readonly STORAGE_KEY = 'virtualSubstance_output'; // does uid matter?

    static saveOutputData(data: OutputData): void {
        console.log("saving data");
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        this.updateOutputDisplay(data);
    }

    static loadOutputData(): OutputData | null {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (!stored) {
            console.log("loadOutputData(): No data in localStorage to load");
            return null;
        }
        
        const data = JSON.parse(stored) as OutputData;
        // this.updateOutputDisplay(data);
        return data;
    }

    static removeOutputData(): void {
        localStorage.removeItem(this.STORAGE_KEY);
    }

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
}