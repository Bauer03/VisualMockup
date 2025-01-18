import { SimulationRun } from "../types/types";

export class DatabaseManager {
    private static DB_NAME = 'virtualSubstanceDB';
    private static STORE_NAME = 'outputs';
    private static VERSION = 3.2;
    private db: IDBDatabase | null = null;

    /**
     * Initializes the database. Should be called once when the application starts.
     */
    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DatabaseManager.DB_NAME, DatabaseManager.VERSION);

            request.onerror = () => reject(request.error);
            
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                // Create the object store if it doesn't exist
                if (!db.objectStoreNames.contains(DatabaseManager.STORE_NAME)) {
                    db.createObjectStore(DatabaseManager.STORE_NAME, { 
                        keyPath: 'id',
                        autoIncrement: true
                    });
                }
            };
        });
    }

    /**
     * Adds a new output to the database
     */
    async addOutput(data: SimulationRun): Promise<number> {
        if (!this.db) throw new Error('Database not initialized');

        // validate data to ensure it's a valid SimulationRun
        if(!data.uid || !data.runNumber || !data.timestamp || !data.outputData || !data.inputData) {
            alert('Invalid data');
            throw new Error('Invalid data');
        }

        // debug
        // console.log("Adding output: " + JSON.stringify(data));

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([DatabaseManager.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(DatabaseManager.STORE_NAME);
            
            const timestamp = new Date().toISOString();
            const request = store.add({ ...data, timestamp });

            request.onsuccess = () => resolve(request.result as number);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Gets all simulationRuns from the database
     */
    async getAllOutputs(): Promise<SimulationRun[]> {
        if (!this.db) throw new Error('Database not initialized');

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([DatabaseManager.STORE_NAME], 'readonly');
            const store = transaction.objectStore(DatabaseManager.STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Delete a specific output
    async deleteOutput(id: number): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([DatabaseManager.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(DatabaseManager.STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // Clear all outputs
    async clearAllOutputs(): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([DatabaseManager.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(DatabaseManager.STORE_NAME);
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}

// Export a singleton instance
export const dbManager = new DatabaseManager();