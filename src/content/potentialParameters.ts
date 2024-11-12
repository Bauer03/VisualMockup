export const createPotentialParameters = (): HTMLElement => {
    const form = document.createElement('div');
    form.className = `
        grid gap-2 bg-white dark:bg-gray-800 p-2 rounded shadow relative
        `;
        // didn't end up adding the below because of spacing. may add back later? it's an after label that says, in italics, potential parameters.
        // after:content-['Potential_Parameters'] after:absolute after:-top-5 after:-right-0 italic after:text-sm after:text-slate-500 after:font-mono
    form.id = 'potential-parameters';
    form.innerHTML = `
            <div class="flex gap-2 justify-between">
                <label for="sigma" class="flex text-gray-700 dark:text-gray-300">
                    Sigma (Ang)
                </label>
                <input type="number"
                     id="sigma"
                     class="p-1 rounded w-20 shadow-sm
                        bg-white dark:bg-gray-800
                        text-gray-900 dark:text-gray-100
                        border border-gray-200 dark:border-gray-700
                        focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                        focus:border-transparent">
            </div>
            <div class="flex gap-2 justify-between">
                <label for="epsilon" class="flex text-gray-700 dark:text-gray-300">
                    Epsilon
                </label>
                <input type="number"
                     id="epsilon"
                     class="p-1 rounded w-20 shadow-sm
                        bg-white dark:bg-gray-800
                        text-gray-900 dark:text-gray-100
                        border border-gray-200 dark:border-gray-700
                        focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                        focus:border-transparent">
            </div>
    `;
    return form;
};