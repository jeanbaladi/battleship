export interface navbarElements {
    path: string,
    active: boolean,
    method: method
}
type method = (params?:string) => void;