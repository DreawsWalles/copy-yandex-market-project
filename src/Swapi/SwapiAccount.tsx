import {UserEntity} from "../Entities/UserEntity";
import {LoginEntity} from "../Entities/LoginEntity";

export function CheckLogin(login: string): boolean{
    let user: UserEntity | null = JSON.parse(localStorage.getItem(login) as string)
    if(!user){
        return false;
    }
    return true;

}
export function convertTo(entity: UserEntity) : string{
    return JSON.stringify({
        name: entity.name,
        surname: entity.surname,
        patronymic: entity.patronymic,
        age: entity.age,
        email: entity.email,
        password: entity.password})
}
export function UpdateLogin(token: string, login: string): UserEntity | null{
    let user: UserEntity | null = JSON.parse(localStorage.getItem(token) as string);
    if(!user){
        return null;
    }
    localStorage.removeItem(user.email);
    user.email = login;
    localStorage.setItem(user.email, convertTo(user));
    return user;
}
export function UpdatePassword(token: string, password: string): UserEntity | null{
    let user: UserEntity | null = JSON.parse(localStorage.getItem(token) as string);
    if(!user){
        return null;
    }
    user.password = password;
    localStorage.setItem(user.email, convertTo(user));
    return user;
}
export function UpdateName(token: string, name: string): UserEntity | null{
    let user: UserEntity | null = JSON.parse(localStorage.getItem(token) as string);
    if(!user){
        return null;
    }
    user.name = name;
    localStorage.setItem(user.email, convertTo(user));
    return user;
}
export function UpdateSurname(token: string, surname: string): UserEntity | null{
    let user: UserEntity | null = JSON.parse(localStorage.getItem(token) as string);
    if(!user){
        return null;
    }
    user.surname = surname;
    localStorage.setItem(user.email, convertTo(user));
    return user;
}
export function UpdatePatronymic(token: string, patronymic: string): UserEntity | null{
    let user: UserEntity | null = JSON.parse(localStorage.getItem(token) as string);
    if(!user){
        return null;
    }
    user.patronymic = patronymic;
    localStorage.setItem(user.email, convertTo(user));
    return user;
}
export function UpdateAge(token: string, age: number): UserEntity | null{
    let user: UserEntity | null = JSON.parse(localStorage.getItem(token) as string);
    if(!user){
        return null;
    }
    user.age = age;
    localStorage.setItem(user.email, convertTo(user));
    return user;
}