import { Tab } from '../types/types.js';

export class TabSystem {
    private container: HTMLElement;
    private tabs: Tab[];
    private activeTabId: string;
    private tabButtons: Map<string, HTMLButtonElement>;
    private contentContainer: HTMLElement;

    constructor(containerId: string, tabs: Tab[]) {
        const container = document.getElementById(containerId);
        if (!container) throw new Error(`Container with id ${containerId} not found`);
        
        this.container = container;
        this.tabs = tabs;
        this.activeTabId = tabs[0].id;
        this.tabButtons = new Map();
        
        this.contentContainer = document.createElement('div');
        this.contentContainer.className = 'flex flex-col gap-8 px-3';

        this.initialize();
    }

    private initialize(): void {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'flex justify-start items-center content-start menu-tab gap-1';
        
        this.tabs.forEach(tab => {
            const button = document.createElement('button');
            button.className = 'px-4 py-2 flex items-center gap-2';
            button.textContent = tab.label;
            button.onclick = () => this.switchTab(tab.id);

            if (tab.materialIcon) {
                const icon = document.createElement('span');
                icon.className = `material-icons text-sm`;
                icon.textContent = tab.materialIcon;
                button.appendChild(icon);
            }
            
            this.tabButtons.set(tab.id, button);
            buttonContainer.appendChild(button);
        });

        this.container.innerHTML = '';
        this.container.appendChild(buttonContainer);
        this.container.appendChild(this.contentContainer);

        // show initial tab
        this.switchTab(this.activeTabId);
    }

    private switchTab(tabId: string): void {
        this.activeTabId = tabId;

        this.tabButtons.forEach((button, id) => {
            button.className = 'px-4 py-2 flex items-center gap-2' + (id === tabId ? ' tab-selected' : '');
        });

        // Update content
        const tab = this.tabs.find(t => t.id === tabId);
        if (!tab) return;

        this.contentContainer.innerHTML = '';
        const content = typeof tab.content === 'function' ? tab.content() : tab.content;
        this.contentContainer.appendChild(content);
    }

    public addTab(tab: Tab): void {
        this.tabs.push(tab);
        
        const button = document.createElement('button');
        button.className = 'px-4 py-2';
        button.textContent = tab.label;
        button.onclick = () => this.switchTab(tab.id);
        
        this.tabButtons.set(tab.id, button);
        this.container.querySelector('.menu-tab')?.appendChild(button);
    }

    public removeTab(tabId: string): void {
        const index = this.tabs.findIndex(t => t.id === tabId);
        if (index === -1) return;

        this.tabs.splice(index, 1);
        const button = this.tabButtons.get(tabId);
        button?.remove();
        this.tabButtons.delete(tabId);

        // If we removed the active tab, switch to the first available tab
        if (tabId === this.activeTabId && this.tabs.length > 0) {
            this.switchTab(this.tabs[0].id);
        }
    }
}