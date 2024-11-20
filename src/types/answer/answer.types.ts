import {  UserLogged } from "../user.type"

export interface Answer {
    is_accepted: boolean,
    id: number,
    body: string,
    classroom_id: number,
    user:UserLogged
    created_at: string,
    image?: string
}
