export interface CreateGamingRoom {
    createdBy: string,
    id: string,
    maxPlayerForGroup: number,
    playerCount: number,
    roomCompleted: boolean,
    roomName: string,
}

export interface CreateGamingRoomDTO {
    roomName: string,
    createdBy: string
}
