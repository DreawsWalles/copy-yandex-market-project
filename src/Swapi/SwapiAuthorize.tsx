import {LoginEntity} from "../Entities/LoginEntity";
import {UserEntity} from "../Entities/UserEntity";
import {convertTo} from "./SwapiAccount";

export function Login(entity: LoginEntity): string | null{
    let user: UserEntity | null  = JSON.parse(localStorage.getItem(entity.login) as string)
    if(user && user.password === entity.password){
        return entity.login;
    }
    return null;
}
export function Register(entity: UserEntity): string | null{
    localStorage.setItem(entity.email, convertTo(entity));
    return entity.email;
}