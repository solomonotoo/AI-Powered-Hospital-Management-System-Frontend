export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
    accessTokenExpireAt: string;

    refreshToken: string;
    refreshTokenExpirestAt: string;
}