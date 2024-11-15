export const createPotentialParameters = (): HTMLElement => {
   const form = document.createElement('div');
   form.className = 'grid gap-2 bg-white dark:bg-gray-800 p-2 rounded shadow relative';
   form.id = 'potential-parameters';
   form.innerHTML = `
           <div class="flex gap-2 justify-between">
               <label for="sigma" class="flex justify-between items-center">
                   <span class="block text-sm font-medium text-gray-700 dark:text-gray-200">Sigma (Ang)</span>
               </label>
               <input type="number"
                    id="sigma"
                    class="block w-20 py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
           </div>
           <div class="flex gap-2 justify-between">
               <label for="epsilon" class="flex justify-between items-center">
                   <span class="block text-sm font-medium text-gray-700 dark:text-gray-200">Epsilon</span>
               </label>
               <input type="number"
                    id="epsilon"
                    class="block w-20 py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
           </div>
   `;
   return form;
};