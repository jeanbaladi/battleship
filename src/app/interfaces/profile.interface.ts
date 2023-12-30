export interface Profile {
    identityId: string,
    userName: string,
    address: string | null,
    statistics: PlayerStatistics
}

export interface PlayerStatistics
{
    battlesWin: number,
    battlesLose: number,
    totalBattlesPlayed: number,
    elo: number,
}