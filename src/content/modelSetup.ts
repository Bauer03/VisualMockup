import { createPotentialParameters } from './potentialParameters';

export const createModelSetupContent = (): HTMLElement => {
    const content = document.createElement('div');
    content.className = 'flex flex-col px-3';
    
    // Create the form content
    const formContent = document.createElement('div');
    formContent.className = 'flex flex-col gap-4';
    // Only showing the main HTML template with updated styles - rest of code remains the same
    formContent.innerHTML = `
    <div class="flex justify-between gap-8">
        <fieldset class="flex flex-col gap-2">
            <label for="AtomType" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Atom Type</label>
            <select id="AtomType">
                <option value="He">He</option>
                <option value="Ne">Ne</option>
                <option value="Ar">Ar</option>
                <option value="Kr">Kr</option>
                <option value="Xe">Xe</option>
                <option value="User">User</option>
            </select>
        </fieldset>

        <fieldset class="flex flex-col gap-2">
            <label for="Boundary" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Boundary</label>
            <select id="Boundary">
                <option value="FixedWalls">Fixed Walls</option>
                <option value="Periodic">Periodic</option>
            </select>
        </fieldset>

        <fieldset class="flex flex-col gap-2">
            <label for="PotentialModel" class="block text-sm font-medium text-gray-700 dark:text-gray-200">Potential Model</label>
            <select id="PotentialModel">
                <option value="NoPotential">No Potential</option>
                <option value="LennardJones">LennardJones</option>
                <option value="SoftSphere">Soft Sphere</option>
            </select>
        </fieldset>
    </div>

    <div class="flex gap-4 items-center justify-between" id="model-setup-inputs">
        <div class="grid gap-2 ps-0 px-2 py-2">
            <div class="flex gap-2 justify-between">
                <label for="AtomCount" class="flex justify-between items-center">
                    <span class="block text-sm font-medium text-gray-700 dark:text-gray-200">Num. of atoms</span>
                </label>
                <input type="number" 
                    id="AtomCount" 
                    class="block w-20 py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    placeholder="1">
            </div>

            <div class="flex gap-2 justify-between">
                <label for="AtomicMass" class="flex justify-between items-center">
                    <span class="block text-sm font-medium text-gray-700 dark:text-gray-200">Atomic Mass</span>
                </label>
                <input type="number" 
                    id="AtomicMass" 
                    class="block w-20 py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                    placeholder="4.002602">
            </div>
        </div>
    </div>
    `;

    let atomCount = formContent.querySelector("#AtomCount") as HTMLInputElement;
    let atomType = formContent.querySelector("#AtomType") as HTMLSelectElement;
    let atomicMass = formContent.querySelector("#AtomicMass") as HTMLInputElement;

    atomType.addEventListener("change", (event) => {
        const atomType = (event.target as HTMLSelectElement).value;
        // based on atom type, set atomicMass.
        if(atomType === 'He') {
            if(atomicMass.value === "") {
                atomicMass.placeholder = "4.002602";
            } else atomicMass.value = "4.002602";
        } else if(atomType === 'Ne') {
            if(atomicMass.value === "") {
                atomicMass.placeholder = "20.1797";
            } else atomicMass.value = "20.1797";
        } else if(atomType === 'Ar') {
            if(atomicMass.value === "") {
                atomicMass.placeholder = "39.948";
            } else atomicMass.value = "39.948"; 
        } else if(atomType === 'Kr') {
            if(atomicMass.value === "") {
                atomicMass.placeholder = "83.798";
            } else atomicMass.value = "83.798";
        } else if(atomType === 'Xe') {
            if(atomicMass.value === "") {
                atomicMass.placeholder = "131.293";
            } else atomicMass.value = "131.293";
        } else if(atomType === 'Rn') {  
            if(atomicMass.value === "") atomicMass.placeholder = "222"; 
            else atomicMass.value = "222";
        }
    });

    let pModelDropdown = formContent.querySelector("#PotentialModel") as HTMLSelectElement;
    pModelDropdown.onchange = (event) => {
        const potentialModel = (event.target as HTMLSelectElement).value;
        if((document.getElementById('model-setup-inputs') as HTMLElement).children.length > 1) {
            document.getElementById('model-setup-inputs')?.children[1].remove();
        }
        if(potentialModel === 'SoftSphere' || potentialModel === 'LennardJones') {
            if(formContent.querySelector("#potential-parameters")) {
                formContent.querySelector("#potential-parameters")?.remove();
            }
            document.getElementById('model-setup-inputs')?.appendChild(createPotentialParameters(potentialModel));    
        }
    };

    content.appendChild(formContent);
    return content;
};