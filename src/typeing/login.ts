
export interface ILogin {
    access_token: string
    refresh_token: string
}


export interface ILoginData {
    user: string
    pass: string
}


export function createLoginData(user: string, pass: string): ILoginData {
    return {
        user: user,
        pass: pass,
    };
}