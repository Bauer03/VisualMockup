export interface Tab {
    id: string;
    label: string;
    content: HTMLElement | (() => HTMLElement);
}