import {UserEntity} from "../Entities/UserEntity";

export function GetAll():UserEntity[]{
    let result: Set<UserEntity> = new Set();
    debugger
    for (let key in localStorage) {
        if(key !== "token" && key !== "length") {
            let entity = (JSON.parse(localStorage.getItem(key) as string)) as UserEntity;
            result.add(entity);
        }
    }
    return Array.from(result);
}