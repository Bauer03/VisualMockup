export const createOutputContent = () => {
    const content = document.createElement('div');
    content.className = 'grid px-3 gap-8';
    content.innerHTML = `
        <div class="flex gap-12">
            <div class="grid gap-2">
                <div class="flex gap-4 justify-between">
                    <span>Time (ps)</span><span id="current-time" class="w-16 text-right">20</span>
                </div>
                <div class="flex gap-4 justify-between">
                    <span>Total Time (ps)</span><span id="total-time" class="w-16 text-right">20</span>
                </div>
            </div>
            <div class="grid gap-2">
                <div class="flex gap-4 justify-between">
                    <span>Run Time </span><span id="run-time" class="w-16 text-right">20</span>
                </div>
                <div class="flex gap-4 justify-between">
                    <span>Total Time</span><span id="total-runtime" class="w-16 text-right">20</span>
                </div> 
            </div>
        </div>
        <table class="w-full">
            <thead>
                <tr class="border-b">
                    <th class="text-left p-2"></th>
                    <th class="text-right p-2 w-16">Sample</th>
                    <th class="text-right p-2 w-16">Average</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b">
                    <td class="text-left p-2 whitespace-nowrap">Pressure (atm)</td>
                    <td id="pressure-sample" class="text-right p-2 w-16">20</td>
                    <td id="pressure-average" class="text-right p-2 w-16">20</td>
                </tr>
                <tr class="border-b">
                    <td class="text-left p-2 whitespace-nowrap">Volume (L/mol)</td>
                    <td id="volume-sample" class="text-right p-2 w-16">20</td>
                    <td id="volume-average" class="text-right p-2 w-16">20</td>
                </tr>
                <tr class="border-b">
                    <td class="text-left p-2 whitespace-nowrap">Total Energy (J/mol)</td>
                    <td id="total-energy-sample" class="text-right p-2 w-16">20</td>
                    <td id="total-energy-average" class="text-right p-2 w-16">20</td>
                </tr>
                <tr class="border-b">
                    <td class="text-left p-2 whitespace-nowrap">Kinetic Energy (J/mol)</td>
                    <td id="kinetic-energy-sample" class="text-right p-2 w-16">20</td>
                    <td id="kinetic-energy-average" class="text-right p-2 w-16">20</td>
                </tr>
                <tr class="border-b">
                    <td class="text-left p-2 whitespace-nowrap">Potential Energy (J/mol)</td>
                    <td id="potential-energy-sample" class="text-right p-2 w-16">20</td>
                    <td id="potential-energy-average" class="text-right p-2 w-16">20</td>
                </tr>
            </tbody>
        </table>
    `;
    return content;
};
//# sourceMappingURL=output.js.map