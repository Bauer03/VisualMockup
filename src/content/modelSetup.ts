export const createModelSetupContent = (): HTMLElement => {
    const content = document.createElement('div');
    content.className = 'flex flex-col gap-8 px-3';
    
    // Create the form content
    const formContent = document.createElement('div');
    formContent.className = 'flex flex-col gap-8';
    formContent.innerHTML = `
        <div class="flex justify-between">
            <fieldset class="flex flex-col gap-2">
                <label for="Atom Type" class="text-gray-700 dark:text-gray-300">Atom Type</label>
                <select id="Atom Type" class="w-full rounded shadow-sm 
                    bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100
                    border border-gray-200 dark:border-gray-700">
                    <option value="1">Ar</option>
                    <option value="2">Mg</option>
                    <option value="3">Li</option>
                    <option value="4">Ca</option>
                </select>
            </fieldset>

            <fieldset class="flex flex-col gap-2">
                <label for="Boundary" class="text-gray-700 dark:text-gray-300">Boundary</label>
                <select id="Boundary" class="w-full rounded shadow-sm
                    bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100
                    border border-gray-200 dark:border-gray-700">
                    <option value="1">Fixed Walls</option>
                    <option value="2">Fuzzy Walls</option>
                </select>
            </fieldset>

            <fieldset class="flex flex-col gap-2">
                <label for="Potential Model" class="text-gray-700 dark:text-gray-300">Potential Model</label>
                <select id="Potential Model" class="w-full rounded shadow-sm
                    bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100
                    border border-gray-200 dark:border-gray-700">
                    <option value="1">No Potential</option>
                    <option value="2">Lennard-Jones</option>
                    <option value="3">Buckingham</option>
                </select>
            </fieldset>
        </div>

        <div class="flex gap-4 items-center">
            <div class="grid gap-2 w-2/5">
                <div class="flex gap-2 justify-between">
                    <label for="Number of atoms" class="flex text-gray-700 dark:text-gray-300">
                        Num. of atoms
                    </label>
                    <input type="number" 
                        id="Number of atoms" 
                        class="p-1 rounded w-20 shadow-sm
                            bg-white dark:bg-gray-800 
                            text-gray-900 dark:text-gray-100
                            border border-gray-200 dark:border-gray-700
                            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                            focus:border-transparent">
                </div>
                <div class="flex gap-2 justify-between">
                    <label for="Atomic Mass" class="flex text-gray-700 dark:text-gray-300">
                        Atomic Mass
                    </label>
                    <input type="number" 
                        id="Atomic Mass" 
                        class="p-1 rounded w-20 shadow-sm
                            bg-white dark:bg-gray-800 
                            text-gray-900 dark:text-gray-100
                            border border-gray-200 dark:border-gray-700
                            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                            focus:border-transparent">
                </div>
            </div>
        </div>
    `;
    
    content.appendChild(formContent);
    return content;
};