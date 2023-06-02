import {UserEntity} from "../../../Entities/UserEntity";

export interface IEditProps
{
    id: string,
    data: UserEntity,
    onUpdate(): void,
    onCancel(): void
}