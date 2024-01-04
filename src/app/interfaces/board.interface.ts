import { ProfileDTO } from "./auth.interface";
import { CreateGamingRoom } from "./lobby.interface";

export interface ships {
    id: string,
    length: number,
    url: string,
    dir: 'x' | 'y',
    coordinate: Array<coordinate> | null,
    boatParts: Array<string>

}

export interface boardsData {
    id : shipsInBoard;
}

export class shipsInBoard implements ships {
    public id: string = '';
    public length: number = 0;
    public url: string = '';
    public dir: "y" | "x" = 'y';
    public coordinate: coordinate[] | null  = null;
    public attackedCoordinate: coordinate[] | null  = null;
    public deadCoordinate: coordinate[] | null  = null;
    public boatParts: string[] = [];
    public idElement : string = '';
    public status:  'ocuped' | 'empty' |  'hover' | 'wrong' | 'attacked' = 'empty'
    private _cellBackgroundColor: string = '';

    constructor(){
        this._cellBackgroundColor = this.addCellBackgroundColor(this.status);
    }

    public get cellBackgroundColor(): string{
        this._cellBackgroundColor = this.addCellBackgroundColor(this.status);;
        return this._cellBackgroundColor;
    }

    private addCellBackgroundColor(status:'ocuped' | 'empty' | 'hover' | 'wrong' | 'attacked'): string {
        switch(status){
            case 'empty':
                return '#8ACDD7'
            case 'hover':
                return '#0e836a'
            case 'wrong':
                return '#93414e'
            case 'ocuped':
                return '#f987ba'
            case 'attacked':
                return '#93414e'
            
        }
    }
}

export class ShootBoard {
    public idElement : string = '';
    public status:  'ocuped' | 'empty' |  'hover' | 'wrong' | 'attacked' = 'empty'
    private _cellBackgroundColor: string = '';

    constructor(){
        this._cellBackgroundColor = this.addCellBackgroundColor(this.status);
    }
    public get cellBackgroundColor(): string{
        this._cellBackgroundColor = this.addCellBackgroundColor(this.status);;
        return this._cellBackgroundColor;
    }
    private addCellBackgroundColor(status:'ocuped' | 'empty' |  'hover' | 'wrong' | 'attacked'): string {
        switch(status){
            case 'empty':
                return '#8ACDD7'
            case 'hover':
                return '#0e836a'
            case 'wrong':
                return '#1D1C1A'
            case 'ocuped':
                return '#f987ba'
            case 'attacked':
                return '#0e836a'
            
        }
    }
}

export interface coordinate {
    x: string,
    y: string,
    state?: 'ocuped' | 'empty' |  'hover' | 'wrong' | 'attacked',
}

export interface shots {
    coordinate: coordinate,
    impact: boolean
}

export interface Board
{
    boardsData: Array<Array<boardsData>>;
    profile: ProfileDTO;
    room: CreateGamingRoom;
}