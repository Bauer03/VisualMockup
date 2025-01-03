// db/databaseManager.ts
export class DatabaseManager {
    private static DB_NAME = 'virtualSubstanceDB';
    private static STORE_NAME = 'outputs';
    private static VERSION = 1;
    private db: IDBDatabase | null = null;

    // Initialize the database
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

    // Add new output data
    async addOutput(data: any): Promise<number> {
        if (!this.db) throw new Error('Database not initialized');

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([DatabaseManager.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(DatabaseManager.STORE_NAME);
            
            const timestamp = new Date().toISOString();
            const request = store.add({ ...data, timestamp });

            request.onsuccess = () => resolve(request.result as number);
            request.onerror = () => reject(request.error);
        });
    }

    // Get all outputs
    async getAllOutputs(): Promise<any[]> {
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