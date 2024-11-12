import { createPotentialParameters } from './potentialParameters.js';
export const createModelSetupContent = () => {
    const content = document.createElement('div');
    content.className = 'flex flex-col px-3';
    // Create the form content
    const formContent = document.createElement('div');
    formContent.className = 'flex flex-col gap-4';
    formContent.innerHTML = `
        <div class="flex justify-between">
            <fieldset class="flex flex-col gap-2">
                <label for="AtomType" class="text-gray-700 dark:text-gray-300">Atom Type</label>
                <select id="AtomType" class="w-full rounded shadow-sm 
                    bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100
                    border border-gray-200 dark:border-gray-700">
                    <option value="He">He</option>
                    <option value="Ne">Ne</option>
                    <option value="Ar">Ar</option>
                    <option value="Kr">Kr</option>
                    <option value="Xe">Xe</option>
                    <option value="User">User</option>
                </select>
            </fieldset>

            <fieldset class="flex flex-col gap-2">
                <label for="Boundary" class="text-gray-700 dark:text-gray-300">Boundary</label>
                <select id="Boundary" class="w-full rounded shadow-sm
                    bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100
                    border border-gray-200 dark:border-gray-700">
                    <option value="FixedWalls">Fixed Walls</option>
                    <option value="Periodic">Periodic</option>
                </select>
            </fieldset>

            <fieldset class="flex flex-col gap-2">
                <label for="PotentialModel" class="text-gray-700 dark:text-gray-300">Potential Model</label>
                <select id="PotentialModel" class="w-full rounded shadow-sm
                    bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100
                    border border-gray-200 dark:border-gray-700">
                    <option value="NoPotential">No Potential</option>
                    <option value="LennardJones">LennardJones</option>
                    <option value="SoftSphere">Soft Sphere</option>
                </select>
            </fieldset>
        </div>

        <div class="flex gap-4 items-center justify-between" id="model-setup-inputs">
            <div class="grid gap-2 ps-0 px-4 py-2">
                <div class="flex gap-2 justify-between">
                    <label for="AtomCount" class="flex text-gray-700 dark:text-gray-300">
                        Num. of atoms
                    </label>
                    <input type="number" 
                        id="AtomCount" 
                        class="p-1 rounded w-20 shadow-sm
                            bg-white dark:bg-gray-800 
                            text-gray-900 dark:text-gray-100
                            border border-gray-200 dark:border-gray-700
                            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                            focus:border-transparent">
                </div>

                <div class="flex gap-2 justify-between">
                    <label for="AtomicMass" class="flex text-gray-700 dark:text-gray-300">
                        Atomic Mass
                    </label>
                    <input type="number" 
                        id="AtomicMass" 
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
    let pModelDropdown = formContent.querySelector("#PotentialModel");
    pModelDropdown.onchange = (event) => {
        const potentialModel = event.target.value;
        if (document.getElementById('model-setup-inputs').children.length > 1) {
            document.getElementById('model-setup-inputs')?.children[1].remove();
        }
        if (potentialModel === 'SoftSphere' || potentialModel === 'LennardJones') {
            if (formContent.querySelector("#potential-parameters")) {
                formContent.querySelector("#potential-parameters")?.remove();
            }
            document.getElementById('model-setup-inputs')?.appendChild(createPotentialParameters());
        }
    };
    content.appendChild(formContent);
    return content;
};
//# sourceMappingURL=modelSetup.js.map