
export interface Menu {
    id: number;
    pid: number;
    path: string;
    name: string;
    title: string;
    children?: Menu[];
}