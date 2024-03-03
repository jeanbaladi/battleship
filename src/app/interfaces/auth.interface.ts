export interface user {
    name : string,
    password: string
};
export interface ProfileDTO {
    identityId: string,
    userName: string,
    elo?: number
}

export interface authenticationResponse {
    token: string | null,
    expiration: Date,
}
export interface IdentityUser {
    email: string | null,
    emailConfirmed: boolean,
    id: string,
    userName: string,
}
export interface Auth {
    user: IdentityUser,
    authenticationResponse: authenticationResponse,
    sessionId: string,
    roles: string[]
}
export interface checkPsw {
    errMsg: string,
    valid: boolean
}
export interface PswRequirements {
    hasUpperCase: string,
    hasLowerCase: string,
    hasNumeric: string,
    hasSpecialCaracter: string,
}
export interface PlayerGuest {
    Id: number,
    IdentityId: string,
    CreationDate: Date,
}