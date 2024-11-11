export const createOutputContent = (): HTMLElement => {
    const content = document.createElement('div');
    content.className = 'grid px-3';
    content.innerHTML = `
        <div class="flex gap-12">
            <div class="grid gap-2">
                <div class="flex gap-4 justify-between">
                    <span>Time (ps)</span><span>20</span>
                </div>
                <div class="flex gap-4 justify-between">
                    <span>Total Time (ps)</span><span>20</span>
                </div>
            </div>
            <div class="grid gap-2">
                <div class="flex gap-4 justify-between">
                    <span>Run Time </span><span>20</span>
                </div>
                <div class="flex gap-4 justify-between">
                    <span>Total Time</span><span>20</span>
                </div>
            </div>
        </div>
        <div class="flex gap-4">
        </div>
    `;
    return content;
};