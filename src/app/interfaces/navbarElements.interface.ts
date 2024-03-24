export interface navbarElements {
    path: string,
    active: boolean,
    isAccessible: boolean,
    method: method
}
type method = (params?:string, queryParams?: any) => void;