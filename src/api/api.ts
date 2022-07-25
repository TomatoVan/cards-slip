import axios from "axios"

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAPI = {
    authMe() {
        return instance.post<UserResponseType>('auth/me', {});
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/me', {});
    },
    login(data: RegistrationDataType) {
        return instance.post<UserResponseType>('auth/login', data);
    },
    requestRecoveryLink(email: string) {
        return instance.post<SetNewPasswordType>('https://neko-back.herokuapp.com/2.0/auth/forgot',
            {
                email,
                from: "Cards slip 🤹🏼 <admin@gmail.com>",
                message: `<div style="background-color: lime; padding: 15px">
                            password recovery link:<a href='${'http://localhost:3000/'}#/set-new-password/$token$'> link</a>
                          </div>`
            });
    },
}

export const registrationAPI = {
    registration(data: RegistrationDataType) {
        return instance.post(`auth/register`, data);
    }
}

export const profileAPI = {
    updateData(data: UpdateDataType) {
        return instance.put<UpdateUserResponseType>('auth/me', data);
    },
    logout() {
        return instance.delete('auth/me', {});
    },
}

export type SetNewPasswordType = {
    info: string,
    error: string

}
export type RegistrationDataType = {
    email: string
    password: string
}
type UpdateDataType = {
    name: string,
    avatar?: string,
}
type UserResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: string
    updated: string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}
type UpdateUserResponseType = {
    updatedUser: {
        _id: string,
        email: string,
        rememberMe: boolean,
        isAdmin: boolean,
        name: string,
        verified: boolean,
        publicCardPacksCount: number,
        created: string,
        updated: string,
        __v: number,
        token: string,
        tokenDeathTime: number,
        avatar: string
    },
    token: string,
    tokenDeathTime: number
}
type LogoutResponseType = {
    info: string
    error: string
}
export type LoginDataType = {
    email: string,
    password: string,
    rememberMe?: boolean,
}