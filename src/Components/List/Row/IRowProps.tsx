import {UserEntity} from "../../../Entities/UserEntity";

export interface IRowProps
{
    data: UserEntity,
    onUpdate(): void
}