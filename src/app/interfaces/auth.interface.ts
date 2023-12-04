export interface user {
    Name : string,
    Password: string
};
export interface Profile {
    id: number,
    identityId: string,
    userName: string,
    address: string,
    battlesWin: number,
    battlesLose: number,
    totalBattlesPlayed: number,
    elo: number,
}
export interface authenticationResponse {
    token: string | null,
    expiration: Date,
}
export interface Auth {
    profile: Profile,
    authenticationResponse: authenticationResponse,
}
