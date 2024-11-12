export interface Tab {
    id: string;
    label: string;
    content: HTMLElement | (() => HTMLElement);
    materialIcon?: string;
    onDataReceived?: (data: string) => void; 
}