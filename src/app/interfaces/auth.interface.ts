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
    accessFailedCount: number,
    concurrencyStamp: string,
    email: string | null,
    emailConfirmed: boolean,
    id: string,
    lockoutEnabled: boolean,
    lockoutEnd: null,
    normalizedEmail: string | null,
    normalizedUserName: string,
    passwordHash: string,
    phoneNumber: string | null,
    phoneNumberConfirmed: boolean,
    securityStamp: string,
    twoFactorEnabled: boolean,
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