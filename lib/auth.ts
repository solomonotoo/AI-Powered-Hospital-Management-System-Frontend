const TOKEN_KEY = "access_token";

export function getAccessToken(){
    if(typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token:string){
    localStorage.setItem(TOKEN_KEY,token);
}

export function removeAccessToken(){
    localStorage.removeItem(TOKEN_KEY);
}

// Later we'll add:

// Refresh Token
// Logout
// Auto Refresh
// Token Expiry